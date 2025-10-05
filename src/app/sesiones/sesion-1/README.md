# Sesión 1: Fundamentos de Angular Signals

## 📖 Contenido Teórico

### Introducción

Angular Signals es el nuevo sistema de **reactividad granular** introducido en Angular 16 y estabilizado en Angular 20. Representa un cambio fundamental en cómo Angular maneja el estado y detecta cambios.

**¿Por qué Signals?**
- **Rendimiento**: Actualiza solo lo que cambia, no todo el árbol de componentes
- **Predictibilidad**: Sabes exactamente qué se ejecuta y cuándo
- **Simplicidad**: Menos código boilerplate que RxJS para casos simples
- **Zoneless**: Permite Angular sin Zone.js (más ligero y rápido)

---

## Parte 1: ¿Qué es un Signal?

Un **Signal** es un contenedor reactivo que notifica automáticamente a Angular cuando su valor cambia.

### Definición Técnica

> "A signal is a wrapper around a value that notifies interested consumers when that value changes."
> — Documentación oficial de Angular

### Conceptos Clave

- **Reactive primitive**: Los signals son los bloques de construcción de la reactividad
- **Change notification**: Notifican automáticamente cuando cambian
- **Lazy evaluation**: Se calculan solo cuando se leen
- **Memoization**: Cachean resultados automáticamente

---

## Parte 2: Tipos de Signals

Angular proporciona tres tipos principales de signals:

### 1. Writable Signals (Signals Escribibles)

Signals que puedes crear y modificar directamente.

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contador',
  standalone: true,
  template: `
    <div>
      <h2>Contador: {{ count() }}</h2>
      <button (click)="increment()">+1</button>
      <button (click)="decrement()">-1</button>
      <button (click)="reset()">Reset</button>
    </div>
  `
})
export class ContadorComponent {
  // Signal escribible con valor inicial 0
  count = signal(0);

  increment() {
    // Método 1: update() - basado en valor actual
    this.count.update(value => value + 1);
  }

  decrement() {
    // También puedes usar update()
    this.count.update(value => value - 1);
  }

  reset() {
    // Método 2: set() - establecer valor directamente
    this.count.set(0);
  }
}
```

#### Métodos de Writable Signals

| Método | Descripción | Ejemplo |
|--------|-------------|---------|
| `set(value)` | Establece un nuevo valor | `count.set(10)` |
| `update(fn)` | Actualiza basándose en el valor actual | `count.update(v => v + 1)` |
| `()` | Lee el valor actual | `const valor = count()` |

#### Ejemplos con Diferentes Tipos

```typescript
import { signal } from '@angular/core';

// Primitivos
const nombre = signal('Angular');
const edad = signal(20);
const activo = signal(true);

// Objetos
const usuario = signal({
  id: 1,
  nombre: 'Juan',
  email: 'juan@example.com'
});

// Arrays
const tareas = signal([
  { id: 1, texto: 'Aprender Signals', completada: false },
  { id: 2, texto: 'Practicar Computed', completada: false }
]);

// Modificar objetos (IMPORTANTE: siempre de forma inmutable)
usuario.update(u => ({
  ...u,
  nombre: 'María'  // Solo cambia el nombre, mantiene el resto
}));

// Modificar arrays (IMPORTANTE: siempre de forma inmutable)
tareas.update(t => [
  ...t,
  { id: 3, texto: 'Dominar Effects', completada: false }
]);

// ❌ MAL: Mutación directa (NO funciona con signals)
usuario().nombre = 'Pedro';  // Esto NO notificará cambios

// ✅ BIEN: Actualización inmutable
usuario.update(u => ({ ...u, nombre: 'Pedro' }));
```

---

### 2. Computed Signals (Signals Computados)

Signals **read-only** que derivan su valor de otros signals. Se recalculan automáticamente cuando cambian sus dependencias.

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-carrito',
  standalone: true,
  template: `
    <div>
      <h3>Carrito de Compras</h3>

      <p>Precio unitario: ${{ precioUnitario() }}</p>
      <p>Cantidad: {{ cantidad() }}</p>

      <!-- Computed se actualiza automáticamente -->
      <p><strong>Subtotal: ${{ subtotal() }}</strong></p>
      <p><strong>IVA (21%): ${{ iva() }}</strong></p>
      <p><strong>Total: ${{ total() }}</strong></p>

      <button (click)="incrementarCantidad()">+1</button>
      <button (click)="decrementarCantidad()">-1</button>
    </div>
  `
})
export class CarritoComponent {
  // Signals base
  precioUnitario = signal(100);
  cantidad = signal(1);

  // Computed: subtotal = precio * cantidad
  subtotal = computed(() => {
    console.log('✅ Calculando subtotal...');
    return this.precioUnitario() * this.cantidad();
  });

  // Computed: iva = subtotal * 0.21
  iva = computed(() => {
    console.log('✅ Calculando IVA...');
    return this.subtotal() * 0.21;
  });

  // Computed: total = subtotal + iva
  total = computed(() => {
    console.log('✅ Calculando total...');
    return this.subtotal() + this.iva();
  });

  incrementarCantidad() {
    this.cantidad.update(c => c + 1);
    // Los 3 computed se recalculan automáticamente
  }

  decrementarCantidad() {
    if (this.cantidad() > 1) {
      this.cantidad.update(c => c - 1);
    }
  }
}
```

#### Características de `computed()`

- **Lazy evaluation**: Solo se calcula cuando se lee
- **Memoization**: Cachea el resultado hasta que cambian las dependencias
- **Read-only**: No se puede modificar directamente
- **Automatic dependency tracking**: Detecta automáticamente qué signals usa

#### Comparación: Getters vs Computed

```typescript
// ❌ PROBLEMA: Getter (enfoque clásico)
@Component({
  template: `<p>Total: {{ getTotal() }}</p>`
})
export class ClasicComponent {
  precio = 100;
  cantidad = 5;

  // Se ejecuta en CADA change detection (muchas veces por segundo)
  get getTotal() {
    console.log('🔴 Getter ejecutado');
    return this.precio * this.cantidad;
  }
}

// ✅ SOLUCIÓN: Computed (enfoque moderno)
@Component({
  template: `<p>Total: {{ total() }}</p>`
})
export class ModernoComponent {
  precio = signal(100);
  cantidad = signal(5);

  // Se ejecuta SOLO cuando cambian precio() o cantidad()
  total = computed(() => {
    console.log('✅ Computed ejecutado');
    return this.precio() * this.cantidad();
  });
}
```

**Resultado**:
- Getter: Se ejecuta 100+ veces por segundo
- Computed: Se ejecuta solo 1 vez cuando cambias precio o cantidad

---

### 3. Effects (Efectos)

Effects son operaciones que se ejecutan **automáticamente** cuando cambian los signals que leen.

```typescript
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-buscador',
  standalone: true,
  template: `
    <div>
      <h3>Buscador Reactivo</h3>
      <input
        type="text"
        [value]="searchTerm()"
        (input)="searchTerm.set($any($event.target).value)"
        placeholder="Buscar..."
      />
      <p>Resultados: {{ resultados() }}</p>
    </div>
  `
})
export class BuscadorComponent {
  searchTerm = signal('');
  resultados = signal(0);

  constructor() {
    // Effect 1: Log cada vez que cambia searchTerm
    effect(() => {
      const term = this.searchTerm();
      console.log('🔍 Búsqueda:', term);
    });

    // Effect 2: Guardar en localStorage
    effect(() => {
      const term = this.searchTerm();
      localStorage.setItem('lastSearch', term);
      console.log('💾 Guardado en localStorage');
    });

    // Effect 3: Simular búsqueda en API
    effect(() => {
      const term = this.searchTerm();

      if (term.length > 2) {
        console.log('🌐 Buscando en API:', term);
        // Aquí harías una petición HTTP real
        setTimeout(() => {
          this.resultados.set(Math.floor(Math.random() * 100));
        }, 500);
      } else {
        this.resultados.set(0);
      }
    });
  }
}
```

#### Casos de Uso de Effects

✅ **USAR effects para:**
- Logging / debugging
- Sincronizar con localStorage / sessionStorage
- Analytics y tracking
- Efectos secundarios del DOM (focus, scroll, etc.)
- Sincronizar con APIs externas

❌ **NO USAR effects para:**
- Derivar estado (usa `computed()` en su lugar)
- Actualizar otros signals (crea dependencias circulares)
- Lógica de negocio crítica

#### Cleanup en Effects

```typescript
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  template: `
    <p>Timer: {{ seconds() }}</p>
    <button (click)="toggleTimer()">{{ isRunning() ? 'Pausar' : 'Iniciar' }}</button>
  `
})
export class TimerComponent {
  seconds = signal(0);
  isRunning = signal(false);

  constructor() {
    effect((onCleanup) => {
      if (this.isRunning()) {
        console.log('⏱️ Timer iniciado');

        const interval = setInterval(() => {
          this.seconds.update(s => s + 1);
        }, 1000);

        // Cleanup: se ejecuta cuando el effect se destruye o se vuelve a ejecutar
        onCleanup(() => {
          console.log('🛑 Timer detenido');
          clearInterval(interval);
        });
      }
    });
  }

  toggleTimer() {
    this.isRunning.update(r => !r);
  }
}
```

---

## Parte 3: Arquitectura Moderna con Signals

### Standalone Components + Signals

```typescript
import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

// ✅ Componente standalone moderno
@Component({
  selector: 'app-todo-list',
  standalone: true,           // No necesita NgModule
  imports: [CommonModule],    // Importa solo lo que necesita
  template: `
    <div class="todo-app">
      <h2>Lista de Tareas ({{ pendientesCount() }} pendientes)</h2>

      <!-- Input para nueva tarea -->
      <input
        type="text"
        [value]="newTodoText()"
        (input)="newTodoText.set($any($event.target).value)"
        (keyup.enter)="addTodo()"
        placeholder="Nueva tarea..."
      />
      <button (click)="addTodo()">Agregar</button>

      <!-- Lista de tareas -->
      <ul>
        @for (todo of todos(); track todo.id) {
          <li [class.completed]="todo.completed">
            <input
              type="checkbox"
              [checked]="todo.completed"
              (change)="toggleTodo(todo.id)"
            />
            <span>{{ todo.text }}</span>
            <button (click)="deleteTodo(todo.id)">❌</button>
          </li>
        }
      </ul>

      <!-- Estadísticas -->
      <div class="stats">
        <p>Total: {{ todos().length }}</p>
        <p>Pendientes: {{ pendientesCount() }}</p>
        <p>Completadas: {{ completadasCount() }}</p>
      </div>
    </div>
  `,
  styles: [`
    .completed { text-decoration: line-through; opacity: 0.6; }
    .stats { background: #f0f0f0; padding: 10px; }
  `]
})
export class TodoListComponent {
  // Estado
  todos = signal<Array<{id: number; text: string; completed: boolean}>>([]);
  newTodoText = signal('');

  // Computed values
  pendientesCount = computed(() =>
    this.todos().filter(t => !t.completed).length
  );

  completadasCount = computed(() =>
    this.todos().filter(t => t.completed).length
  );

  constructor() {
    // Effect: Guardar en localStorage
    effect(() => {
      const todos = this.todos();
      localStorage.setItem('todos', JSON.stringify(todos));
      console.log('💾 Guardado:', todos.length, 'tareas');
    });

    // Cargar datos al iniciar
    const saved = localStorage.getItem('todos');
    if (saved) {
      this.todos.set(JSON.parse(saved));
    }
  }

  addTodo() {
    const text = this.newTodoText().trim();
    if (text) {
      this.todos.update(todos => [
        ...todos,
        {
          id: Date.now(),
          text,
          completed: false
        }
      ]);
      this.newTodoText.set('');
    }
  }

  toggleTodo(id: number) {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  deleteTodo(id: number) {
    this.todos.update(todos =>
      todos.filter(todo => todo.id !== id)
    );
  }
}
```

---

## Parte 4: Signals con Control Flow Moderno

Angular 17+ introdujo nuevo control flow que funciona perfectamente con Signals:

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  template: `
    <div>
      <!-- @if: Reemplaza *ngIf -->
      @if (isLoading()) {
        <p>Cargando...</p>
      } @else if (error()) {
        <p class="error">Error: {{ error() }}</p>
      } @else {
        <h2>Perfil de {{ user().name }}</h2>
        <p>Email: {{ user().email }}</p>
      }

      <!-- @for: Reemplaza *ngFor con track obligatorio -->
      <h3>Posts ({{ posts().length }})</h3>
      @for (post of posts(); track post.id) {
        <article>
          <h4>{{ post.title }}</h4>
          <p>{{ post.content }}</p>
        </article>
      } @empty {
        <p>No hay posts disponibles</p>
      }

      <!-- @switch: Reemplaza ngSwitch -->
      @switch (user().role) {
        @case ('admin') {
          <button>Panel de Administración</button>
        }
        @case ('editor') {
          <button>Editor de Contenido</button>
        }
        @default {
          <button>Mi Perfil</button>
        }
      }
    </div>
  `
})
export class UserProfileComponent {
  isLoading = signal(false);
  error = signal<string | null>(null);

  user = signal({
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'admin'
  });

  posts = signal([
    { id: 1, title: 'Signals en Angular', content: '...' },
    { id: 2, title: 'Control Flow moderno', content: '...' }
  ]);
}
```

---

## 📝 Resumen de Conceptos Clave

### Signals vs Variables Clásicas

| Aspecto | Variables Clásicas | Signals |
|---------|-------------------|---------|
| **Declaración** | `contador = 0` | `contador = signal(0)` |
| **Lectura** | `this.contador` | `this.contador()` |
| **Modificación** | `this.contador++` | `this.contador.update(v => v + 1)` |
| **Reactividad** | Zone.js (global) | Granular (solo lo que cambia) |
| **Performance** | Todo el árbol | Solo consumidores |
| **Predicibilidad** | Difícil rastrear | Fácil rastrear |

### Los 3 Tipos de Signals

| Tipo | Función | Lectura | Escritura | Uso |
|------|---------|---------|-----------|-----|
| **Writable** | `signal(value)` | Sí | Sí | Estado mutable |
| **Computed** | `computed(() => ...)` | Sí | No | Valores derivados |
| **Effect** | `effect(() => ...)` | No aplica | No aplica | Side effects |

---

## 💡 Mejores Prácticas

### ✅ DO (Hacer)

1. **Usa signals para todo el estado del componente**
   ```typescript
   count = signal(0);  // ✅ Bien
   ```

2. **Usa computed para valores derivados**
   ```typescript
   double = computed(() => this.count() * 2);  // ✅ Bien
   ```

3. **Actualiza signals de forma inmutable**
   ```typescript
   this.users.update(u => [...u, newUser]);  // ✅ Bien
   ```

4. **Usa effects solo para side effects**
   ```typescript
   effect(() => {
     console.log('Count:', this.count());  // ✅ Bien (logging)
   });
   ```

### ❌ DON'T (Evitar)

1. **No mutes signals directamente**
   ```typescript
   this.users()[0].name = 'New';  // ❌ Mal
   ```

2. **No uses effects para derivar estado**
   ```typescript
   effect(() => {
     this.double.set(this.count() * 2);  // ❌ Mal (usa computed)
   });
   ```

3. **No mezcles signals con getters**
   ```typescript
   get total() {  // ❌ Mal con OnPush
     return this.price() * this.quantity();
   }
   ```

---

## 🎯 Ejercicios Prácticos

Dirígete a [EJERCICIOS.md](./EJERCICIOS.md) para practicar con 3 ejercicios progresivos:

1. **Signals Básicos** - Crear y modificar signals
2. **Computed Signals** - Valores derivados eficientes
3. **Effects** - Side effects reactivos

**Cada ejercicio compara versión clásica vs moderna.**

---

## 📚 Referencias

- [Angular Signals - Documentación Oficial](https://angular.dev/guide/signals)
- [Reactivity with Signals - Angular Blog](https://blog.angular.io/angular-v16-is-here-4d7a28ec680d)
- [Control Flow - Angular.dev](https://angular.dev/guide/templates/control-flow)

---

**¡Éxito en tu aprendizaje de Signals! 🚀**
