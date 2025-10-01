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
