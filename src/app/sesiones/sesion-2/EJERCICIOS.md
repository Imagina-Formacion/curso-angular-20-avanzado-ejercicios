# Sesión 2: Change Detection y Control Flow - Ejercicios Prácticos

## Objetivo
Dominar el Change Detection optimizado con OnPush, el nuevo Control Flow de Angular 17+ y directivas reactivas con Signals.

## Ejercicios

### Ejercicio 1: Change Detection Avanzado
**Archivos:**
- `ejercicio-1-change-detection-clasico.component.ts` - Default strategy con Zone.js
- `ejercicio-1-change-detection-moderno.component.ts` - OnPush con Signals

**Qué aprenderás:**
- `ChangeDetectionStrategy.Default` vs `OnPush`
- Cómo Signals optimizan automáticamente el Change Detection
- Diferencia entre getters (se ejecutan siempre) y computed (solo cuando cambian dependencias)
- Inmutabilidad vs mutación de objetos

**Tareas:**
1. Compara ambos componentes en la consola
2. Observa cuántas veces se ejecuta `getTotalPrice()` en clásico
3. Observa cuántas veces se ejecuta `totalPrice()` computed en moderno
4. Clásico: Se ejecuta constantemente
5. Moderno: Solo cuando cambian los productos

**Conceptos clave:**
- **Default:** Zone.js ejecuta change detection en cada evento
- **OnPush:** Solo cuando cambian @Input o eventos del componente
- **Signals + OnPush:** Combinación perfecta, reactivo y eficiente

---

### Ejercicio 2: Control Flow Moderno
**Archivos:**
- `ejercicio-2-control-flow-clasico.component.ts` - *ngIf, *ngFor, *ngSwitch
- `ejercicio-2-control-flow-moderno.component.ts` - @if, @for, @switch

**Qué aprenderás:**
- Nuevo control flow de Angular 17+ sin directivas estructurales
- `@if` / `@else` - Más legible que *ngIf
- `@for` con `track` obligatorio - Mejor performance
- `@switch` / `@case` - Más claro que ngSwitch
- `@empty` - Manejo integrado de listas vacías

**Tareas:**
1. Compara la sintaxis entre clásico y moderno
2. Observa que @for requiere track obligatorio (mejor performance)
3. Nota que @if/@else es más legible sin ng-template
4. El @empty maneja automáticamente listas vacías

**Ventajas del nuevo Control Flow:**
- ✅ Sintaxis más limpia y legible
- ✅ Sin directivas estructurales (*)
- ✅ Sin ng-template necesario
- ✅ Track obligatorio en @for
- ✅ @empty integrado
- ✅ Mejor rendimiento del compilador

---

### Ejercicio 3: Directivas Reactivas
**Archivos:**
- `ejercicio-3-directivas-clasico.component.ts` - Directivas con @Input
- `ejercicio-3-directivas-moderno.component.ts` - Directivas con signal inputs

**Qué aprenderás:**
- Signal inputs en directivas: `input<T>()`
- Effects en directivas para reactividad
- Cómo las directivas pueden usar signals
- Class y style bindings reactivos

**Tareas:**
1. Usa la directiva highlight en ambas versiones
2. Observa los logs cuando cambias el color dinámico
3. Clásico: @Input tradicional
4. Moderno: signal input con effect que reacciona al cambio
5. Cambia el color dinámico y observa la reactividad

**Conceptos clave:**
- **@Input clásico:** Valor estático o binding one-way
- **signal input():** Entrada reactiva que puede usarse en computed/effect
- **Effects en directivas:** Reaccionan automáticamente a cambios

---

### Ejercicio 4: Change Detection Manual
**Archivos:**
- `ejercicio-4-cd-manual-clasico.component.ts` - ChangeDetectorRef methods
- `ejercicio-4-cd-manual-moderno.component.ts` - Signals auto-CD

**Qué aprenderás:**
- ChangeDetectorRef: `markForCheck()`, `detach()`, `reattach()`, `detectChanges()`
- Control manual de Change Detection
- Optimización de componentes con muchas actualizaciones
- Cómo Signals eliminan la necesidad de CD manual

**Tareas:**
1. Agrega notificaciones con CD conectado
2. Observa los logs de markForCheck()
3. Desconecta el CD con detach()
4. Intenta agregar notificaciones - no se mostrarán
5. Usa detectChanges() para forzar actualización manual
6. Compara con la versión moderna donde no necesitas nada de esto

**Conceptos clave:**
- **markForCheck():** Marca componente para próximo ciclo CD
- **detach():** Desconecta del árbol de Change Detection
- **reattach():** Reconecta al árbol de CD
- **detectChanges():** Fuerza detección inmediata
- **Signals:** Eliminan necesidad de control manual de CD

---

### Ejercicio 5: Host Directives
**Archivos:**
- `ejercicio-5-host-directives-clasico.component.ts` - Sin host directives
- `ejercicio-5-host-directives-moderno.component.ts` - Con host directives

**Qué aprenderás:**
- Host Directives (Angular 15+): Composición de directivas
- Problema: Repetir múltiples directivas en cada elemento
- Solución: Una directiva host que aplica todas automáticamente
- Principio DRY (Don't Repeat Yourself)

**Tareas:**
1. Observa el código clásico: cada botón necesita 3 directivas
2. Si quieres agregar funcionalidad, debes modificar TODOS los botones
3. Observa el código moderno: solo usa `smartButton`
4. SmartButton aplica automáticamente: tooltip, loading, trackClick
5. Haz click en los botones y observa los logs de analytics

**Conceptos clave:**
- **Sin Host Directives:** Código repetitivo y difícil de mantener
- **Con Host Directives:** Una directiva = múltiples funcionalidades
- **hostDirectives: []:** Composición de directivas
- **DRY:** Cambios en un solo lugar afectan todos los usos

---

### Ejercicio 6: Profiling y Optimización de Performance
**Archivos:**
- `ejercicio-6-profiling-clasico.component.ts` - Getters (problema de performance)
- `ejercicio-6-profiling-moderno.component.ts` - Computed (optimizado)

**Qué aprenderás:**
- Identificación de operaciones costosas con performance.now()
- Diferencia crítica entre getters y computed signals
- Métricas de performance en tiempo real
- Uso de Angular DevTools Profiler
- Estrategias para minimizar recomputaciones

**Tareas:**
1. Observa en la consola cuántas veces se ejecutan los getters en el clásico
2. Agrega 100 productos y observa el impacto en performance
3. Compara con la versión moderna usando computed
4. Nota las métricas: tiempo de ejecución, cantidad de ejecuciones
5. Usa el botón "Cambiar Categoría" y observa la diferencia

**Conceptos clave:**
- **Getters:** Se ejecutan en CADA change detection (problema)
- **Computed:** Solo cuando cambian dependencias (solución)
- **Memoización:** Computed cachea resultados automáticamente
- **Profiling:** performance.now() para medir tiempos de ejecución
- **Angular DevTools:** Herramienta para profiling visual

**Problema común:**
```typescript
// ❌ MALO: Se ejecuta constantemente
get filteredProducts() {
  return this.products.filter(...);
}
```

**Solución:**
```typescript
// ✅ BUENO: Solo cuando cambia products() o category()
filteredProducts = computed(() =>
  this.products().filter(p => p.category === this.currentCategory())
);
```

---

### Ejercicio 7: Directivas Estructurales Personalizadas
**Archivo:**
- `ejercicio-7-directivas-estructurales.component.ts` - Directivas estructurales custom

**Qué aprenderás:**
- Creación de directivas estructurales personalizadas
- Uso de TemplateRef y ViewContainerRef
- Manipulación del DOM de forma reactiva
- Context en directivas estructurales
- Variables locales de template

**Tareas:**
1. Explora las 4 directivas estructurales incluidas:
   - `*repeat` - Repite un template N veces
   - `*hasRole` - Renderizado condicional por permisos
   - `*defer` - Carga diferida de contenido
   - `*loading` - Muestra/oculta según estado de carga
2. Interactúa con los controles para ver cada directiva en acción
3. Observa cómo se pasan variables de contexto ($implicit, index, etc.)
4. Revisa el código de cada directiva para entender su funcionamiento

**Conceptos clave:**
- **TemplateRef:** Referencia al template marcado con *
- **ViewContainerRef:** Contenedor donde se insertan las vistas
- **createEmbeddedView():** Crea instancia del template
- **Context:** Objeto con variables disponibles en el template
- **$implicit:** Variable por defecto (let item de *repeat)

**Ejemplo de directiva estructural:**
```typescript
@Directive({ selector: '[repeat]' })
export class RepeatDirective {
  @Input() set repeat(times: number) {
    this.viewContainer.clear();
    for (let i = 0; i < times; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: i,
        index: i
      });
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
```

---

### Ejercicio 8: Testing de Directivas
**Archivo:**
- `ejercicio-8-testing-directivas.component.ts` - Guía de testing

**Qué aprenderás:**
- Estrategias de testing para directivas
- TestBed y configuración de tests
- By.directive() para seleccionar elementos
- Testing de directivas de atributo
- Testing de directivas estructurales
- Testing de directivas con signals
- Testing de host directives
- Patrón AAA (Arrange-Act-Assert)

**Tareas:**
1. Lee los ejemplos de código de testing mostrados
2. Comprende el patrón AAA en cada test
3. Observa cómo se testean diferentes tipos de directivas:
   - Atributo (highlight)
   - Estructural (*repeat)
   - Con signals (reactivity)
   - Host directives (composition)
4. Revisa las herramientas y comandos útiles
5. Estudia las mejores prácticas de testing

**Conceptos clave:**
- **TestBed:** Configuración del entorno de testing
- **By.directive():** Selector para encontrar elementos con directiva
- **DebugElement:** Wrapper de elementos del DOM
- **nativeElement:** Acceso al elemento DOM real
- **detectChanges():** Trigger manual de change detection

**Ejemplo de test:**
```typescript
describe('HighlightDirective', () => {
  it('should color background yellow', () => {
    // Arrange
    const fixture = TestBed.createComponent(TestComponent);

    // Act
    fixture.detectChanges();
    const des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    // Assert
    expect(des[0].nativeElement.style.backgroundColor).toBe('yellow');
  });
});
```

---

## Instrucciones

### Ejecutar el proyecto:
```bash
npm start
```

### Abrir navegador:
```
http://localhost:4200
```

### Abrir consola:
F12 o Click derecho > Inspeccionar > Consola

---

## Comparativa: Clásico vs Moderno

### Change Detection

**Clásico (Default):**
```typescript
// Se ejecuta en CADA change detection
get totalPrice() {
  console.log('Ejecutado');
  return this.products.reduce((sum, p) => sum + p.price, 0);
}
```

**Moderno (OnPush + Signals):**
```typescript
// Solo se ejecuta cuando cambia products()
totalPrice = computed(() => {
  console.log('Ejecutado');
  return this.products().reduce((sum, p) => sum + p.price, 0);
});
```

### Control Flow

**Clásico:**
```html
<div *ngIf="isLoading; else notLoading">
  Cargando...
</div>
<ng-template #notLoading>
  <div *ngIf="users.length === 0">Sin datos</div>
</ng-template>

<div *ngFor="let user of users; trackBy: trackByFn">
  {{ user.name }}
</div>
```

**Moderno:**
```html
@if (isLoading()) {
  Cargando...
} @else if (users().length === 0) {
  Sin datos
} @else {
  @for (user of users(); track user.id) {
    {{ user.name }}
  } @empty {
    Lista vacía
  }
}
```

### Directivas

**Clásico:**
```typescript
@Directive({ selector: '[highlight]' })
export class HighlightDirective {
  @Input() color = 'yellow';
}
```

**Moderno:**
```typescript
@Directive({ selector: '[highlight]', standalone: true })
export class HighlightDirective {
  color = input<string>('yellow');

  constructor() {
    effect(() => {
      console.log('Color changed:', this.color());
    });
  }
}
```

---

## Conceptos Clave de la Sesión

### 1. Zoneless Angular
Con Signals, Angular puede funcionar sin Zone.js:
- Signals notifican cambios automáticamente
- No necesita polling ni detección global
- Mejor performance y control

### 2. OnPush + Signals = Perfecto
La mejor combinación para performance:
- OnPush: Solo detecta cuando es necesario
- Signals: Notifican cambios granulares
- Resultado: Mínimas detecciones, máxima eficiencia

### 3. Nuevo Control Flow
Ventajas sobre directivas estructurales:
- Más legible y natural
- Sin * ni ng-template
- Track obligatorio en @for
- @empty integrado
- Mejor optimización del compilador

### 4. Signal Inputs
Las directivas ahora pueden tener entradas reactivas:
- `input<T>()` en lugar de `@Input`
- Pueden usarse en computed y effects
- Mejor composición reactiva

---

## Rendimiento

### Mediciones típicas:

**Clásico (Default + Zone.js):**
- Change detection: ~100 checks/segundo
- Getters: Ejecutados constantemente
- Mutaciones: Pueden no detectarse

**Moderno (OnPush + Signals):**
- Change detection: Solo cuando cambia estado
- Computed: Solo cuando cambian dependencias
- Inmutabilidad: Garantizada con signals

---

## Ventajas de la Sesión 2

✅ **Performance optimizada:** OnPush + Signals
✅ **Código más limpio:** Nuevo control flow
✅ **Mejor DX:** Sintaxis moderna y clara
✅ **Type-safety:** TypeScript completo
✅ **Debugging:** Fácil seguimiento en consola
✅ **Escalabilidad:** Preparado para apps grandes

---

## Siguiente Paso

Cuando domines estos ejercicios, practica:
1. Combinar OnPush con Signals en componentes complejos
2. Migrar código con *ngIf/*ngFor al nuevo control flow
3. Crear directivas reactivas personalizadas
4. Medir performance con Chrome DevTools

¡Buena suerte! 🚀
