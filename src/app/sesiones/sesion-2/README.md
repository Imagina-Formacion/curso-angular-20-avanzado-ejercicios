# Sesión 2: Change Detection Optimizado y Directivas Reactivas

## 📖 Contenido Teórico

### Introducción

En esta sesión aprenderás a dominar dos aspectos fundamentales de Angular moderno:

1. **Change Detection optimizado** con Signals y estrategias OnPush
2. **Directivas reactivas** utilizando signal inputs y efectos

Estos conceptos son esenciales para construir aplicaciones Angular escalables y performantes.

---

## Parte 1: Change Detection en Angular

### ¿Qué es el Change Detection?

El Change Detection (CD) es el mecanismo que Angular utiliza para detectar cuándo cambia el estado de la aplicación y actualizar el DOM en consecuencia.

#### Estrategias de Change Detection

Angular ofrece dos estrategias principales:

##### 1. **ChangeDetectionStrategy.Default** (Clásica)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  template: `
    <div>
      <h3>Productos: {{ products.length }}</h3>
      <p>Total: {{ getTotalPrice() }}</p>
    </div>
  `
})
export class ProductListComponent {
  products = [
    { name: 'Laptop', price: 1000 },
    { name: 'Mouse', price: 25 }
  ];

  // ❌ PROBLEMA: Este getter se ejecuta en CADA change detection
  get getTotalPrice() {
    console.log('🔴 Calculando total...');
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }
}
```

**Problema**: Con la estrategia `Default`, Angular ejecuta el change detection:
- En cada evento del navegador (click, mousemove, keypress, etc.)
- En cada timer/interval
- En cada petición HTTP que completa
- En cada callback asíncrono

Esto significa que `getTotalPrice()` se ejecutará constantemente, incluso cuando los productos no hayan cambiado.

##### 2. **ChangeDetectionStrategy.OnPush** (Optimizada)

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-list',
  changeDetection: ChangeDetectionStrategy.OnPush,  // ✅ Optimizado
  template: `
    <div>
      <h3>Productos: {{ products.length }}</h3>
      <p>Total: {{ getTotalPrice() }}</p>
    </div>
  `
})
export class ProductListComponent {
  products = [
    { name: 'Laptop', price: 1000 },
    { name: 'Mouse', price: 25 }
  ];

  get getTotalPrice() {
    console.log('🟢 Calculando total...');
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }
}
```

**Ventaja**: Con `OnPush`, Angular solo ejecuta change detection cuando:
- Los `@Input()` cambian (por referencia)
- Se dispara un evento en el componente o sus hijos
- Se ejecuta `markForCheck()` manualmente
- Un Observable emite un valor (con async pipe)

---

### Signals: La Solución Moderna

Los **Signals** son el nuevo sistema de reactividad de Angular 20 que reemplaza la necesidad de change detection manual.

#### ¿Qué es un Signal?

Un Signal es un **contenedor reactivo** que notifica automáticamente a Angular cuando su valor cambia.

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div>
      <p>Contador: {{ count() }}</p>
      <p>Doble: {{ doubleCount() }}</p>
      <button (click)="increment()">+1</button>
    </div>
  `
})
export class CounterComponent {
  // Signal escribible
  count = signal(0);

  // Signal computado (derivado)
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.set(this.count() + 1);
    // También puedes usar: this.count.update(value => value + 1);
  }
}
```

#### Tipos de Signals

##### 1. **Writable Signals** (Signals Escribibles)

```typescript
import { signal } from '@angular/core';

// Primitivos
const count = signal(0);
const name = signal('Angular');
const isActive = signal(true);

// Objetos
const user = signal({ name: 'Juan', age: 30 });

// Arrays
const products = signal([
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mouse' }
]);

// Actualizar valores
count.set(5);                           // Reemplaza el valor
count.update(value => value + 1);       // Actualiza basándose en el valor anterior

// Con objetos (inmutabilidad)
user.update(u => ({ ...u, age: u.age + 1 }));

// Con arrays
products.update(p => [...p, { id: 3, name: 'Teclado' }]);
```

##### 2. **Computed Signals** (Signals Computados)

```typescript
import { signal, computed } from '@angular/core';

const firstName = signal('Juan');
const lastName = signal('Pérez');

// Signal computado - se recalcula automáticamente cuando cambian sus dependencias
const fullName = computed(() => `${firstName()} ${lastName()}`);

console.log(fullName()); // "Juan Pérez"

firstName.set('María');
console.log(fullName()); // "María Pérez" ✅ Actualizado automáticamente
```

**Características de `computed()`:**
- **Lazy evaluation**: Solo se calcula cuando se lee
- **Memoización**: Cachea el resultado hasta que cambien las dependencias
- **Read-only**: No se puede modificar directamente
- **Tracking automático**: Detecta automáticamente las dependencias

##### 3. **Effects** (Efectos)

Los efectos se ejecutan cuando cambian los signals que leen:

```typescript
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-logger',
  standalone: true,
  template: `
    <input [value]="search()" (input)="search.set($any($event.target).value)" />
  `
})
export class LoggerComponent {
  search = signal('');

  constructor() {
    // Effect: se ejecuta cuando search() cambia
    effect(() => {
      console.log('🔍 Buscando:', this.search());

      // Aquí podrías hacer una petición HTTP, guardar en localStorage, etc.
      localStorage.setItem('lastSearch', this.search());
    });
  }
}
```

**⚠️ Importante**: Los effects se ejecutan al menos una vez al crearse el componente.

---

### Signals + OnPush: La Combinación Perfecta

```typescript
import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,  // ✅ OnPush
  template: `
    <div>
      <h3>Productos ({{ products().length }})</h3>

      <!-- ✅ computed() solo se recalcula cuando products() cambia -->
      <p>Total: ${{ totalPrice() }}</p>

      <button (click)="addProduct()">Agregar Producto</button>

      @for (product of filteredProducts(); track product.id) {
        <div>{{ product.name }} - ${{ product.price }}</div>
      }
    </div>
  `
})
export class ProductListComponent {
  // Signal con array de productos
  products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Mouse', price: 25 }
  ]);

  category = signal('all');

  // ✅ Computed: solo se recalcula cuando products() cambia
  totalPrice = computed(() => {
    console.log('💚 Calculando total (solo cuando cambia products)');
    return this.products().reduce((sum, p) => sum + p.price, 0);
  });

  // ✅ Computed con múltiples dependencias
  filteredProducts = computed(() => {
    const category = this.category();
    const products = this.products();

    if (category === 'all') return products;
    return products.filter(p => p.category === category);
  });

  addProduct() {
    const newProduct: Product = {
      id: Date.now(),
      name: 'Nuevo Producto',
      price: 100
    };

    // ✅ Actualización inmutable
    this.products.update(products => [...products, newProduct]);
  }
}
```

**Ventajas de esta combinación:**
1. **Performance óptimo**: OnPush evita change detection innecesario
2. **Reactividad granular**: Signals actualizan solo lo que cambia
3. **Código más limpio**: No necesitas `markForCheck()`, `detectChanges()`, etc.
4. **Type-safety**: TypeScript infiere los tipos automáticamente

---

### Control Manual de Change Detection

A veces necesitas control manual del change detection (aunque con Signals esto es cada vez menos común).

#### ChangeDetectorRef Methods

```typescript
import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-manual-cd',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">+1</button>
      <button (click)="toggleDetach()">{{ isDetached ? 'Reattach' : 'Detach' }} CD</button>
    </div>
  `
})
export class ManualCDComponent {
  count = 0;
  isDetached = false;

  constructor(private cdr: ChangeDetectorRef) {}

  increment() {
    this.count++;

    if (!this.isDetached) {
      // Marca este componente para change detection en el próximo ciclo
      this.cdr.markForCheck();
    } else {
      // Fuerza change detection inmediato (solo este componente y sus hijos)
      this.cdr.detectChanges();
    }
  }

  toggleDetach() {
    if (this.isDetached) {
      // Reconecta el componente al árbol de change detection
      this.cdr.reattach();
      this.isDetached = false;
    } else {
      // Desconecta el componente del árbol de change detection
      this.cdr.detach();
      this.isDetached = true;
    }
  }
}
```

**Métodos de ChangeDetectorRef:**
- **`markForCheck()`**: Marca el componente para ser verificado en el próximo ciclo de CD
- **`detectChanges()`**: Fuerza verificación inmediata (solo este componente y sus hijos)
- **`detach()`**: Desconecta el componente del árbol de CD
- **`reattach()`**: Reconecta el componente al árbol de CD

⚠️ **Con Signals, raramente necesitas estos métodos.**

---

## Parte 2: Directivas en Angular

### ¿Qué son las Directivas?

Las directivas son clases que **añaden comportamiento a elementos del DOM**. Angular tiene tres tipos:

1. **Componentes**: Directivas con template
2. **Directivas de Atributo**: Cambian apariencia o comportamiento de un elemento
3. **Directivas Estructurales**: Cambian la estructura del DOM (agregan/quitan elementos)

---

### Directivas de Atributo con Signal Inputs

#### Ejemplo Clásico (sin Signals)

```typescript
import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {
  @Input() color = 'yellow';

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor = this.color;
  }
}
```

```html
<!-- Uso -->
<p highlight color="lightblue">Texto resaltado</p>
```

#### Ejemplo Moderno (con Signal Inputs)

```typescript
import { Directive, input, effect, ElementRef } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {
  // ✅ Signal input: reactivo automáticamente
  color = input<string>('yellow');

  constructor(private el: ElementRef) {
    // ✅ Effect: se ejecuta cuando color() cambia
    effect(() => {
      console.log('🎨 Color changed to:', this.color());
      this.el.nativeElement.style.backgroundColor = this.color();
    });
  }
}
```

```html
<!-- Uso (igual que antes, pero ahora es reactivo) -->
<p highlight [color]="myColor()">Texto resaltado</p>
```

**Ventajas de `input<T>()`:**
- Reactivo por defecto
- Se puede usar en `computed()` y `effect()`
- No necesita lifecycle hooks (`ngOnChanges`)
- Type-safe

---

### Directivas Estructurales Personalizadas

Las directivas estructurales modifican la estructura del DOM añadiendo o quitando elementos.

#### Anatomía de una Directiva Estructural

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[repeat]',
  standalone: true
})
export class RepeatDirective {
  @Input() set repeat(times: number) {
    // Limpia vistas previas
    this.viewContainer.clear();

    // Crea N copias del template
    for (let i = 0; i < times; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        // Contexto: variables disponibles en el template
        $implicit: i,      // Variable por defecto (let item de *repeat)
        index: i,
        count: times,
        first: i === 0,
        last: i === times - 1,
        even: i % 2 === 0,
        odd: i % 2 !== 0
      });
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
```

```html
<!-- Uso -->
<div *repeat="5; let i; let isFirst = first">
  Item #{{ i }} {{ isFirst ? '(primero)' : '' }}
</div>

<!-- Resultado:
Item #0 (primero)
Item #1
Item #2
Item #3
Item #4
-->
```

#### Conceptos Clave

- **`TemplateRef`**: Referencia al template (el `<ng-template>` implícito)
- **`ViewContainerRef`**: Contenedor donde se insertan las vistas
- **`createEmbeddedView()`**: Crea una instancia del template
- **`clear()`**: Elimina todas las vistas del contenedor
- **Contexto**: Objeto con variables disponibles en el template

#### Ejemplo: Directiva de Permisos

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[hasRole]',
  standalone: true
})
export class HasRoleDirective {
  private hasView = false;

  @Input() set hasRole(role: string) {
    const currentUserRole = this.getCurrentUserRole();
    const hasPermission = currentUserRole === role;

    if (hasPermission && !this.hasView) {
      // Usuario tiene permiso: mostrar contenido
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasPermission && this.hasView) {
      // Usuario no tiene permiso: ocultar contenido
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  private getCurrentUserRole(): string {
    // En producción, esto vendría de un servicio de autenticación
    return 'admin';
  }
}
```

```html
<!-- Solo se muestra si el usuario es admin -->
<div *hasRole="'admin'">
  <button>Eliminar Usuario</button>
</div>

<!-- Solo se muestra si el usuario es editor -->
<div *hasRole="'editor'">
  <button>Editar Artículo</button>
</div>
```

---

### Host Directives (Composición de Directivas)

Angular 15+ permite **componer directivas** usando `hostDirectives`. Esto evita repetir múltiples directivas en cada elemento.

#### Problema (sin Host Directives)

```typescript
// Necesitamos aplicar 3 directivas a cada botón
@Component({
  template: `
    <button
      tooltip="Guardar datos"
      [loading]="isLoading"
      trackClick="save-button">
      Guardar
    </button>

    <button
      tooltip="Eliminar datos"
      [loading]="isLoading"
      trackClick="delete-button">
      Eliminar
    </button>

    <!-- Repetitivo y difícil de mantener -->
  `
})
export class MyComponent {
  isLoading = false;
}
```

#### Solución (con Host Directives)

```typescript
import { Directive, HostListener, HostBinding, Input } from '@angular/core';

// Directiva 1: Tooltip
@Directive({ selector: '[tooltip]', standalone: true })
export class TooltipDirective {
  @Input() tooltip = '';
  @HostBinding('attr.title') get title() { return this.tooltip; }
}

// Directiva 2: Loading
@Directive({ selector: '[loading]', standalone: true })
export class LoadingDirective {
  @Input() loading = false;
  @HostBinding('style.opacity') get opacity() {
    return this.loading ? '0.5' : '1';
  }
}

// Directiva 3: Track Click
@Directive({ selector: '[trackClick]', standalone: true })
export class TrackClickDirective {
  @Input() trackClick = '';

  @HostListener('click')
  onClick() {
    console.log('Click tracked:', this.trackClick);
  }
}

// ✅ SOLUCIÓN: Directiva Host que aplica todas automáticamente
@Directive({
  selector: '[smartButton]',
  standalone: true,
  hostDirectives: [
    { directive: TooltipDirective, inputs: ['tooltip'] },
    { directive: LoadingDirective, inputs: ['loading'] },
    { directive: TrackClickDirective, inputs: ['trackClick'] }
  ]
})
export class SmartButtonDirective {}
```

```html
<!-- Uso: Una sola directiva aplica todas las funcionalidades -->
<button
  smartButton
  tooltip="Guardar datos"
  [loading]="isLoading"
  trackClick="save-button">
  Guardar
</button>

<button
  smartButton
  tooltip="Eliminar datos"
  [loading]="isLoading"
  trackClick="delete-button">
  Eliminar
</button>
```

**Ventajas:**
- **DRY**: No repetir código
- **Mantenibilidad**: Cambios en un solo lugar
- **Composición**: Agregar funcionalidad de forma modular
- **Reusabilidad**: Crear "paquetes" de comportamiento

---

## Parte 3: Performance y Profiling

### Identificación de Problemas de Performance

#### Problema: Getters en Templates

```typescript
@Component({
  template: `
    <div>
      <!-- ❌ MAL: Se ejecuta en CADA change detection -->
      <p>Total: {{ getTotalPrice() }}</p>

      <!-- ❌ MAL: Se filtra en CADA change detection -->
      @for (product of getExpensiveProducts(); track product.id) {
        <div>{{ product.name }}</div>
      }
    </div>
  `
})
export class ProductsComponent {
  products = [/* ... */];

  getTotalPrice() {
    console.log('💰 Calculando total (cada CD)');
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }

  getExpensiveProducts() {
    console.log('💸 Filtrando productos caros (cada CD)');
    return this.products.filter(p => p.price > 100);
  }
}
```

#### Solución: Computed Signals

```typescript
@Component({
  template: `
    <div>
      <!-- ✅ BIEN: Solo se calcula cuando products() cambia -->
      <p>Total: {{ totalPrice() }}</p>

      <!-- ✅ BIEN: Solo se filtra cuando products() cambia -->
      @for (product of expensiveProducts(); track product.id) {
        <div>{{ product.name }}</div>
      }
    </div>
  `
})
export class ProductsComponent {
  products = signal<Product[]>([/* ... */]);

  totalPrice = computed(() => {
    console.log('💚 Calculando total (solo cuando cambia)');
    return this.products().reduce((sum, p) => sum + p.price, 0);
  });

  expensiveProducts = computed(() => {
    console.log('💚 Filtrando productos caros (solo cuando cambia)');
    return this.products().filter(p => p.price > 100);
  });
}
```

### Medición de Performance

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-profiling',
  standalone: true,
  template: `
    <div>
      <p>Productos filtrados: {{ filteredProducts().length }}</p>
      <p>Tiempo de filtrado: {{ filterDuration() }}ms</p>
      <p>Ejecuciones: {{ executions() }}</p>
    </div>
  `
})
export class ProfilingComponent {
  products = signal<Product[]>([/* muchos productos */]);
  category = signal('electronics');

  filterDuration = signal(0);
  executions = signal(0);

  filteredProducts = computed(() => {
    const start = performance.now();

    const result = this.products().filter(
      p => p.category === this.category()
    );

    const duration = performance.now() - start;
    this.filterDuration.set(Number(duration.toFixed(2)));
    this.executions.update(n => n + 1);

    return result;
  });
}
```

### Angular DevTools Profiler

Angular DevTools es una extensión de Chrome que te permite:
1. Ver el árbol de componentes
2. Inspeccionar signals y su estado
3. **Profiler**: Medir tiempos de change detection
4. Identificar componentes lentos

**Cómo usar:**
1. Instala Angular DevTools desde Chrome Web Store
2. Abre DevTools (F12)
3. Ve a la pestaña "Angular"
4. Click en "Profiler"
5. Click "Record" y usa tu app
6. Analiza los tiempos de cada componente

---

## Testing de Directivas

### Testing de Directiva de Atributo

```typescript
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

// Componente de prueba
@Component({
  standalone: true,
  imports: [HighlightDirective],
  template: `
    <p highlight>Primer párrafo</p>
    <p highlight color="red">Segundo párrafo</p>
  `
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should have one highlighted element', () => {
    const des = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    expect(des.length).toBe(2);
  });

  it('should color first <p> background "yellow"', () => {
    const des = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  it('should color second <p> background "red"', () => {
    const des = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    const bgColor = des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('red');
  });
});
```

### Testing de Directiva Estructural

```typescript
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepeatDirective } from './repeat.directive';

@Component({
  standalone: true,
  imports: [RepeatDirective],
  template: `
    <div *repeat="times" class="item">Item</div>
  `
})
class TestComponent {
  times = 3;
}

describe('RepeatDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestComponent]
    }).createComponent(TestComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create 3 items', () => {
    const items = fixture.nativeElement.querySelectorAll('.item');
    expect(items.length).toBe(3);
  });

  it('should update when times changes', () => {
    component.times = 5;
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.item');
    expect(items.length).toBe(5);
  });
});
```

---

## 📝 Resumen de Conceptos Clave

### Change Detection

| Concepto | Descripción | Cuándo usar |
|----------|-------------|-------------|
| `Default` | CD en cada evento | Apps pequeñas, prototipado rápido |
| `OnPush` | CD solo cuando cambian @Input o eventos | Apps medianas/grandes |
| `OnPush + Signals` | Reactividad granular automática | ✅ **Recomendado para todas las apps nuevas** |
| `ChangeDetectorRef` | Control manual de CD | Casos especiales (cada vez menos necesario) |

### Signals

| Tipo | Creación | Modificación | Uso |
|------|----------|--------------|-----|
| `signal()` | `signal(value)` | `.set()` / `.update()` | Estado mutable reactivo |
| `computed()` | `computed(() => ...)` | Read-only | Valores derivados |
| `effect()` | `effect(() => ...)` | Side-effects | Sincronización, logs, etc. |
| `input<T>()` | `input<Type>()` | Desde template | Inputs reactivos en directivas/componentes |

### Directivas

| Tipo | Símbolo | Propósito | Ejemplo |
|------|---------|-----------|---------|
| Atributo | `[directive]` | Cambia apariencia/comportamiento | `[highlight]`, `[disabled]` |
| Estructural | `*directive` | Cambia estructura DOM | `*ngIf`, `*repeat`, `*hasRole` |
| Host | `hostDirectives: []` | Composición de directivas | `SmartButtonDirective` |

---

## 💡 Mejores Prácticas

### ✅ DO (Hacer)

1. **Usa Signals para todo el estado reactivo**
   ```typescript
   count = signal(0);  // ✅ Bien
   ```

2. **Usa `computed()` para valores derivados**
   ```typescript
   doubleCount = computed(() => this.count() * 2);  // ✅ Bien
   ```

3. **Usa `OnPush` con Signals**
   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush  // ✅ Bien
   })
   ```

4. **Actualiza Signals de forma inmutable**
   ```typescript
   this.products.update(p => [...p, newProduct]);  // ✅ Bien
   ```

5. **Usa `input<T>()` en directivas modernas**
   ```typescript
   color = input<string>('yellow');  // ✅ Bien
   ```

### ❌ DON'T (Evitar)

1. **No uses getters en templates con OnPush**
   ```typescript
   get totalPrice() { /* ... */ }  // ❌ Mal con OnPush
   ```

2. **No modifiques signals directamente**
   ```typescript
   this.products()[0].name = 'New';  // ❌ Mal (mutación directa)
   ```

3. **No uses Effects para propagación de estado**
   ```typescript
   effect(() => {
     this.total.set(this.products().length);  // ❌ Mal (usa computed)
   });
   ```

4. **No mezcles Signals con detectChanges()**
   ```typescript
   this.count.set(5);
   this.cdr.detectChanges();  // ❌ Innecesario con Signals
   ```

---

## 🎯 Ejercicios Prácticos

Ahora que conoces la teoría, dirígete a [EJERCICIOS.md](./EJERCICIOS.md) para practicar todos estos conceptos con 8 ejercicios progresivos que cubren:

1. Change Detection Avanzado
2. Control Flow Moderno
3. Directivas con Signal Inputs
4. Change Detection Manual
5. Host Directives
6. Profiling y Optimización
7. Directivas Estructurales Personalizadas
8. Testing de Directivas

**Cada ejercicio compara la versión clásica vs moderna para que entiendas las diferencias y ventajas.**

---

## 📚 Referencias

- [Angular Signals - Documentación Oficial](https://angular.dev/guide/signals)
- [Change Detection - Angular.dev](https://angular.dev/best-practices/runtime-performance)
- [Directivas - Angular.dev](https://angular.dev/guide/directives)
- [Testing - Angular.dev](https://angular.dev/guide/testing)

---

**¡Éxito en tu aprendizaje! 🚀**
