# Sesión 1: Angular Signals - Ejercicios Prácticos

## Objetivo
Aprender los fundamentos de Angular Signals comparando código clásico vs moderno.

## Ejercicios

### Ejercicio 1: Signals Básicos
**Archivos:**
- `ejercicio-1-signals-basicos-clasico.component.ts` - Variables normales
- `ejercicio-1-signals-basicos-moderno.component.ts` - Signals

**Qué aprenderás:**
- `signal()` - Crear estado reactivo
- `.set()` - Establecer un valor
- `.update()` - Modificar basado en valor anterior
- Leer signals con `()`

**Tareas:**
1. Compara ambos componentes
2. Observa los logs en consola
3. Nota cómo se accede a los valores: `contador` vs `contador()`

---

### Ejercicio 2: Computed Signals
**Archivos:**
- `ejercicio-2-computed-clasico.component.ts` - Getters
- `ejercicio-2-computed-moderno.component.ts` - Computed

**Qué aprenderás:**
- `computed()` - Crear valores derivados
- Eficiencia: computed solo se recalcula cuando cambian dependencias
- Diferencia con getters que se ejecutan en cada detección de cambios

**Tareas:**
1. Interactúa con los botones
2. Observa cuántas veces se ejecutan los logs
3. Clásico: getters se ejecutan múltiples veces
4. Moderno: computed solo cuando cambia precio o cantidad

---

### Ejercicio 3: Effects
**Archivos:**
- `ejercicio-3-effect-moderno.component.ts` - Solo moderno (no existe en clásico)

**Qué aprenderás:**
- `effect()` - Side effects reactivos
- Uso para logging, localStorage, analytics
- Se ejecuta automáticamente cuando cambian las signals que lee

**Tareas:**
1. Escribe en el input
2. Observa los logs en consola
3. Verifica localStorage en DevTools
4. Nota cómo effects reaccionan automáticamente

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

## Conceptos Clave

### Clásico (Zone.js)
```typescript
// Variable normal
contador: number = 0;

// Getter (se ejecuta en cada detección de cambios)
get total() {
  return this.precio * this.cantidad;
}

// Modificar valor
this.contador++;
```

### Moderno (Signals)
```typescript
// Signal
contador = signal(0);

// Computed (solo se recalcula cuando cambian dependencias)
total = computed(() => this.precio() * this.cantidad());

// Modificar valor
this.contador.set(10);        // Establecer
this.contador.update(v => v + 1);  // Actualizar

// Leer valor
console.log(this.contador());
```

---

## Ventajas de Signals

✅ **Rendimiento**: Solo se recalcula lo necesario
✅ **Predicibilidad**: Saber exactamente qué se ejecuta y cuándo
✅ **Simplicidad**: Menos código boilerplate
✅ **Type-safety**: TypeScript completo
✅ **Debugging**: Fácil de rastrear en consola

---

## Siguiente Paso

Cuando domines estos ejercicios, practica:
1. Crear tus propios signals
2. Combinar múltiples computed
3. Experimentar con effects

¡Buena suerte! 🚀
