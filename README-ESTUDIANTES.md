# 📚 Curso Angular 20 Avanzado - Ejercicios Prácticos

## 🎯 Estructura del Proyecto

Este proyecto contiene ejercicios prácticos organizados por sesiones. Cada ejercicio muestra la **versión clásica** (legacy) vs la **versión moderna** (Angular 20 con Signals).

```
src/app/sesiones/
├── sesion-1/          # Fundamentos de Signals
│   ├── ejercicio-1-signals-basicos-clasico.component.ts
│   ├── ejercicio-1-signals-basicos-moderno.component.ts
│   ├── ejercicio-2-computed-clasico.component.ts
│   ├── ejercicio-2-computed-moderno.component.ts
│   ├── ejercicio-3-effect-moderno.component.ts
│   └── README.md
├── sesion-2/          # (Próximamente)
└── ...
```

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar el proyecto
```bash
npm start
```

### 3. Abrir en el navegador
```
http://localhost:4200
```

### 4. Abrir la consola del navegador
- **Windows/Linux**: F12 o Ctrl+Shift+I
- **Mac**: Cmd+Option+I
- O: Click derecho > Inspeccionar > Consola

---

## 📖 Cómo Trabajar con los Ejercicios

### Filosofía del Curso
- **Compara**: Código clásico vs moderno lado a lado
- **Experimenta**: Modifica el código y observa los cambios
- **Aprende**: Lee los comentarios y logs en consola

### Cada Ejercicio Incluye:
1. **Versión Clásica** - Código tradicional (para entender el problema)
2. **Versión Moderna** - Código con Signals (la solución)
3. **Comentarios** - Explicaciones en el código
4. **Logs** - Output en consola para debugging

---

## 📂 Sesión 1: Fundamentos de Signals

### Ejercicio 1: Signals Básicos
**Archivos:**
- `ejercicio-1-signals-basicos-clasico.component.ts`
- `ejercicio-1-signals-basicos-moderno.component.ts`

**Aprenderás:**
- Crear signals con `signal()`
- Modificar valores con `.set()` y `.update()`
- Leer valores con `()`

### Ejercicio 2: Computed Signals
**Archivos:**
- `ejercicio-2-computed-clasico.component.ts`
- `ejercicio-2-computed-moderno.component.ts`

**Aprenderás:**
- Crear valores derivados con `computed()`
- Diferencia entre getters y computed
- Optimización automática

### Ejercicio 3: Effects
**Archivos:**
- `ejercicio-3-effect-moderno.component.ts`

**Aprenderás:**
- Crear side effects con `effect()`
- Reactividad automática
- Uso para logging, localStorage, etc.

---

## 💡 Tips para Estudiantes

### Antes de Empezar
1. Lee el README de la sesión
2. Abre el proyecto en tu editor favorito
3. Ten la consola del navegador abierta

### Durante el Ejercicio
1. Compara ambas versiones del código
2. Ejecuta los botones y observa los logs
3. Modifica el código y experimenta
4. Haz preguntas si algo no está claro

### Después del Ejercicio
1. Asegúrate de entender las diferencias
2. Practica creando tus propios ejemplos
3. Revisa los conceptos clave

---

## 🔑 Conceptos Clave

### Signals (Moderno)
```typescript
// Crear signal
contador = signal(0);

// Leer valor
console.log(this.contador());

// Modificar
this.contador.set(10);           // Establecer valor
this.contador.update(v => v + 1); // Actualizar basado en anterior
```

### Computed (Moderno)
```typescript
// Valor derivado
total = computed(() => this.precio() * this.cantidad());

// Se recalcula SOLO cuando precio o cantidad cambian
```

### Effect (Moderno)
```typescript
constructor() {
  effect(() => {
    console.log('Valor actual:', this.signal());
    // Se ejecuta automáticamente cuando signal() cambia
  });
}
```

---

## ❓ Preguntas Frecuentes

### ¿Por qué algunos componentes son standalone y otros no?
- **Clásicos (`standalone: false`)**: Necesitan `NgModule`, estilo tradicional
- **Modernos (`standalone: true`)**: No necesitan módulo, estilo Angular 20

### ¿Por qué veo logs múltiples veces en la versión clásica?
- Los getters se ejecutan en cada detección de cambios de Angular
- Los computed solo se ejecutan cuando cambian sus dependencias

### ¿Cuándo usar signals vs variables normales?
- **Signals**: Para estado reactivo que cambia frecuentemente
- **Variables normales**: Para valores estáticos o que cambian poco

---

## 📚 Recursos Adicionales

- [Documentación oficial de Angular Signals](https://angular.dev/guide/signals)
- README de cada sesión en `src/app/sesiones/sesionX/README.md`
- Comentarios en el código fuente

---

## 🛠️ Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm start

# Compilar para producción
npm run build

# Ejecutar tests (si existen)
npm test

# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 🎓 Progreso del Curso

- [x] Sesión 1: Fundamentos de Signals
- [ ] Sesión 2: (Próximamente)
- [ ] Sesión 3: (Próximamente)

---

¡Buena suerte con el aprendizaje! 🚀

Si tienes preguntas, consulta con tu instructor.
