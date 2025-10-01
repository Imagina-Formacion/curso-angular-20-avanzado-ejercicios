# 🎓 Angular Signals Demo - Ejercicios Prácticos Sesión 1

Aplicación interactiva para enseñar la migración de Angular Legacy a Angular 20 Moderno con Signals.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
# o
ng serve

# Abrir en el navegador
# http://localhost:4200
```

## 📚 ¿Qué incluye?

Esta aplicación contiene **4 ejercicios prácticos** que muestran la migración paso a paso de código Angular legacy a moderno:

### Ejercicio 1: @Input/@Output → input()/output()
Convierte componentes con decoradores tradicionales a la nueva API de Signals.

**Conceptos:**
- `input()` - Input signals
- `output()` - Output signals
- `model()` - Two-way binding
- Comunicación padre-hijo reactiva

### Ejercicio 2: BehaviorSubject → Signals en Servicios
Migra servicios con RxJS BehaviorSubject a servicios modernos con Signals.

**Conceptos:**
- `signal()` para estado privado
- `computed()` para valores derivados
- `.asReadonly()` para encapsulación
- Eliminación de subscribe/unsubscribe

### Ejercicio 3: Directivas → Control Flow
Reemplaza `*ngIf`, `*ngFor`, `*ngSwitch` con la nueva sintaxis.

**Conceptos:**
- `@if` / `@else` (reemplazo de *ngIf)
- `@for` / `@empty` (reemplazo de *ngFor)
- `@switch` / `@case` / `@default` (reemplazo de *ngSwitch)
- Sintaxis más limpia y legible

### Ejercicio 4: Observable + async pipe → toSignal()
Convierte Observables con async pipe a Signals.

**Conceptos:**
- `toSignal()` - Observable a Signal
- `toObservable()` - Signal a Observable
- Eliminación de async pipe
- Interoperabilidad RxJS-Signals

## 🎯 Cómo usar en clase

### 1. Pantalla inicial
Al abrir la aplicación verás la lista de 4 ejercicios disponibles.

### 2. Seleccionar un ejercicio
Haz click en cualquier tarjeta para abrir el ejercicio.

### 3. Modos de vista
Cada ejercicio tiene 3 modos de visualización:

- **📊 Vista Comparación**: Muestra código Legacy y Moderno lado a lado
- **📜 Solo Legacy**: Muestra únicamente el código tradicional
- **✨ Solo Moderno**: Muestra únicamente el código con Signals

### 4. Flujo recomendado para la clase

```
1. Seleccionar ejercicio
2. Modo "Solo Legacy" → Explicar el problema del código tradicional
3. Modo "Vista Comparación" → Mostrar diferencias lado a lado
4. Modo "Solo Moderno" → Enfocarse en la solución con Signals
5. Interactuar con ambos ejemplos para ver diferencias en vivo
6. Revisar logs en la consola del navegador
7. Volver a la lista y seguir con el siguiente ejercicio
```

## 🔍 Características Pedagógicas

✅ **Comparación visual**: Código legacy vs moderno lado a lado
✅ **Interactivo**: Los estudiantes pueden interactuar con ambos ejemplos
✅ **Logs en consola**: Muestra el comportamiento en tiempo real
✅ **Navegación sencilla**: Entre ejercicios y modos de vista
✅ **Código documentado**: Cada archivo tiene comentarios explicativos
✅ **Ejemplos realistas**: Casos de uso del mundo real

## 📂 Estructura del Proyecto

```
src/app/
├── ejercicios/
│   ├── ejercicio-1/           # @Input/@Output → input()/output()
│   │   ├── legacy/            # Código con decoradores
│   │   ├── moderno/           # Código con signals
│   │   └── README.md
│   ├── ejercicio-2/           # BehaviorSubject → Signals
│   │   ├── legacy/            # Servicio con RxJS
│   │   ├── moderno/           # Servicio con signals
│   │   └── README.md
│   ├── ejercicio-4/           # Directivas → Control Flow
│   │   ├── legacy/            # *ngIf, *ngFor, *ngSwitch
│   │   ├── moderno/           # @if, @for, @switch
│   │   └── README.md
│   ├── ejercicio-5/           # Observables → toSignal()
│   │   ├── legacy/            # async pipe
│   │   ├── moderno/           # toSignal()
│   │   └── README.md
│   ├── selector-ejercicios.component.ts  # Componente principal
│   └── README.md              # Documentación general
├── app.ts                     # App principal
└── app.html                   # Template principal
```

## 💡 Tips para Instructores

### Antes de la clase:
1. Ejecuta `npm start` y verifica que todo funciona
2. Abre la consola del navegador para mostrar logs
3. Revisa cada ejercicio para familiarizarte

### Durante la clase:
1. Comienza con el **Ejercicio 1** (más simple)
2. Usa el modo "Solo Legacy" primero
3. Luego "Vista Comparación" para mostrar diferencias
4. Haz que los estudiantes interactúen con los ejemplos
5. Enfatiza los logs en consola para mostrar reactividad
6. Termina con "Solo Moderno" para reforzar aprendizaje

### Orden recomendado:
1. Ejercicio 1 (Comunicación entre componentes)
2. Ejercicio 2 (Gestión de estado en servicios)
3. Ejercicio 3 (Nueva sintaxis de templates)
4. Ejercicio 4 (Integración con RxJS)

## 🎓 Objetivos de Aprendizaje

Al finalizar estos ejercicios, los estudiantes podrán:

✅ Convertir componentes con @Input/@Output a signals
✅ Migrar servicios de BehaviorSubject a signals
✅ Usar la nueva sintaxis de control flow
✅ Integrar Observables con Signals usando toSignal()
✅ Entender las ventajas de Signals sobre RxJS
✅ Aplicar estos patrones en proyectos reales

---

**¡Buena suerte con la Sesión 1!** 🚀

Para más información, consulta los README.md individuales en cada carpeta de ejercicio en `src/app/ejercicios/`.
