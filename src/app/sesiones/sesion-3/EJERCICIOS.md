# Sesión 3: Formularios Avanzados y DI - Ejercicios Prácticos

## Objetivo
Dominar formularios fuertemente tipados con Signals y la inyección de dependencias moderna con Standalone APIs.

## Ejercicios

### Ejercicio 1: Typed Forms + Signals
**Archivos:**
- `ejercicio-1-forms-clasico.component.ts` - FormGroup sin tipos fuertes
- `ejercicio-1-forms-moderno.component.ts` - Typed Forms con Signals

**Qué aprenderás:**
- Formularios fuertemente tipados (Typed Forms)
- `FormControl<T>` con tipos explícitos
- Opción `nonNullable: true` para evitar valores null
- Integración de Signals con formularios
- `computed()` para mensajes de error reactivos
- Diferencia entre `form.value` y `form.getRawValue()`

**Tareas (15 TODOs):**
1. Define la interfaz `UsuarioForm` (TODO 1)
2. Crea el tipo `UsuarioFormControls` con mapped types (TODO 2)
3. Implementa el `FormGroup` tipado con todos los campos (TODO 3)
4. Agrega los campos faltantes al template: email, edad, rol (TODOs 4-6)
5. Crea signals para el estado del formulario (TODOs 7-8)
6. Implementa `computed` para mostrar valores (TODO 9)
7. Crea `computed` para errores: nombre, email, edad, rol (TODOs 10-12)
8. Implementa los métodos: `onSubmit()`, `resetForm()`, `fillWithTestData()` (TODOs 13-15)

**Conceptos clave:**
- **Sin tipos (clásico):** `FormControl('')` → tipo `any`
- **Con tipos (moderno):** `FormControl<string>('', { nonNullable: true })` → tipo `string`
- **Autocompletado:** TypeScript conoce los nombres de los campos
- **Errores en compilación:** No en runtime

**Comparación:**
```typescript
// ❌ Clásico - Sin seguridad de tipos
this.form.get('emaill')?.value;  // No hay error (typo)

// ✅ Moderno - Con seguridad de tipos
this.form.controls.emaill;  // ERROR de compilación
```

---

### Ejercicio 2: Validaciones Avanzadas
**Archivos:**
- `ejercicio-2-validaciones-clasico.component.ts` - Validaciones básicas tradicionales
- `ejercicio-2-validaciones-moderno.component.ts` - Validaciones reactivas con Signals

**Qué aprenderás:**
- Validadores síncronos personalizados
- Validadores asíncronos (simular llamadas a API)
- Cross-field validation (comparar dos campos)
- Validadores con parámetros configurables
- Mostrar estado de validación asíncrona con Signals
- `updateOn: 'blur'` para optimizar validaciones asíncronas

**Tareas (19 TODOs):**
1. Implementa el validador `passwordStrengthValidator()` (TODO 1)
2. Implementa el validador `emailDominioValidator()` (TODO 2)
3. Implementa el validador asíncrono `usernameDisponibleValidator()` (TODO 3)
4. Completa el FormGroup con todos los validadores (TODOs 4-7)
5. Crea signals para estado de validación asíncrona (TODOs 8-9)
6. Implementa `computed` para errores de cada campo (TODOs 10-14)
7. Agrega lógica para monitorear cambios de estado (TODO 15)
8. Implementa métodos de utilidad y submit (TODOs 16-19)

**Conceptos clave:**
- **Validador síncrono:** Retorna `ValidationErrors | null` inmediatamente
- **Validador asíncrono:** Retorna `Observable<ValidationErrors | null>`
- **updateOn: 'blur':** Solo valida al perder el foco, no en cada tecla
- **status: 'PENDING':** Validación asíncrona en progreso
- **Cross-field:** Validador a nivel FormGroup para comparar campos

**Ejemplo de validador:**
```typescript
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[!@#$%^&*]/.test(value);

    if (!hasUpperCase || !hasNumber || !hasSymbol) {
      return { passwordWeak: true };
    }

    return null;
  };
}
```

---

### Ejercicio 3: Inyección de Dependencias Moderna
**Archivos:**
- `ejercicio-3-di-clasico.component.ts` - Constructor injection con NgModule
- `ejercicio-3-di-moderno.component.ts` - `inject()` con Standalone

**Qué aprenderás:**
- `inject()` function en lugar de constructor injection
- `InjectionToken<T>` para configuraciones tipadas
- Modificadores: `@Optional`, `@Self`, `@SkipSelf`
- Jerarquía de inyectores (component → parent → root)
- `providedIn: 'root'` vs providers locales

**Tareas (10 TODOs):**
1. Inyecta servicios usando `inject()` (TODOs 1-2)
2. Usa `inject()` con modificador `optional` (TODO 3)
3. Crea e inyecta un `InjectionToken` para configuración (TODOs 4-5)
4. Experimenta con `@Self` para buscar solo en componente actual (TODO 6)
5. Experimenta con `@SkipSelf` para buscar en padre (TODO 7)
6. Implementa métodos que usan los servicios inyectados (TODOs 8-10)

**Conceptos clave:**
- **Constructor injection (clásico):** `constructor(private service: Service) {}`
- **inject() (moderno):** `private service = inject(Service);`
- **@Optional:** Permite que el servicio sea `null` si no existe
- **@Self:** Solo busca en el inyector del componente actual
- **@SkipSelf:** Salta el inyector actual, busca en padres

**Comparación:**
```typescript
// ❌ Clásico - Verboso
constructor(
  private logger: LoggerService,
  private config: ConfigService,
  private notif: NotificationService
) {}

// ✅ Moderno - Conciso y funcional
private logger = inject(LoggerService);
private config = inject(ConfigService);
private notif = inject(NotificationService);
```

---

### Ejercicio 4: FormArray Tipado
**Archivos:**
- `ejercicio-4-formarray-clasico.component.ts` - FormArray sin tipos
- `ejercicio-4-formarray-moderno.component.ts` - FormArray tipado con Signals

**Qué aprenderás:**
- `FormArray` con tipos fuertes
- Crear controles dinámicamente
- Validaciones en arrays completos
- `computed()` para validación reactiva de arrays
- Agregar/eliminar elementos del array de forma tipada
- `getRawValue()` con arrays tipados

**Tareas (14 TODOs):**
1. Define interfaces para el formulario con array (TODO 1)
2. Crea tipos para los controles incluyendo FormArray (TODO 2)
3. Implementa el FormGroup con FormArray tipado (TODO 3)
4. Completa el template con @for para mostrar tareas (TODOs 4-5)
5. Crea `computed` para contadores (TODOs 6-8)
6. Implementa métodos para agregar tareas (TODOs 9-10)
7. Implementa método para eliminar tareas (TODO 11)
8. Implementa validaciones y submit (TODOs 12-14)

**Conceptos clave:**
- **FormArray:** Array dinámico de FormControls
- **Tipo del array:** `FormArray<FormControl<string>>`
- **Agregar control:** `formArray.push(new FormControl(...))`
- **Eliminar control:** `formArray.removeAt(index)`
- **Iterar en template:** `@for (control of formArray.controls; track $index)`

**Ejemplo:**
```typescript
interface TodoForm {
  titulo: string;
  tareas: string[];  // Array de strings
}

type TodoFormControls = {
  titulo: FormControl<string>;
  tareas: FormArray<FormControl<string>>;  // ✅ Tipado
};

form = new FormGroup<TodoFormControls>({
  titulo: new FormControl('', { nonNullable: true }),
  tareas: new FormArray<FormControl<string>>([])
});
```

---

### Ejercicio 5: Functional Providers
**Archivos:**
- `ejercicio-5-providers-clasico.component.ts` - NgModule providers
- `ejercicio-5-providers-moderno.component.ts` - Functional providers

**Qué aprenderás:**
- Functional providers: `provideFeature()`
- Providers condicionales basados en configuración
- `InjectionToken` avanzados con factory functions
- Composición de providers
- Providers reutilizables y configurables

**Tareas (10 TODOs):**
1. Define la interfaz de configuración (TODO 1)
2. Crea el `InjectionToken` para la configuración (TODO 2)
3. Implementa la función `provideFeature()` (TODO 3)
4. Agrega providers condicionales (TODOs 4-5)
5. Registra los providers en el componente (TODO 6)
6. Inyecta la configuración en el componente (TODO 7)
7. Implementa lógica condicional basada en config (TODOs 8-10)

**Conceptos clave:**
- **Functional provider:** Función que retorna array de `Provider[]`
- **Providers condicionales:** Solo agregar si cumple condición
- **Composición:** Combinar múltiples `provideFeature()` functions
- **Reutilización:** Mismo provider en diferentes contextos con distinta config

**Ejemplo:**
```typescript
export interface FeatureConfig {
  enableCache: boolean;
  enableAnalytics: boolean;
  apiUrl?: string;
}

export const FEATURE_CONFIG = new InjectionToken<FeatureConfig>('feature.config');

export function provideFeature(config: FeatureConfig): Provider[] {
  const providers: Provider[] = [
    { provide: FEATURE_CONFIG, useValue: config }
  ];

  // ✅ Providers condicionales
  if (config.enableCache) {
    providers.push(CacheService);
  }

  if (config.enableAnalytics) {
    providers.push(AnalyticsService);
  }

  return providers;
}

// Uso
@Component({
  providers: [
    ...provideFeature({
      enableCache: true,
      enableAnalytics: false
    })
  ]
})
```

---

## 📊 Resumen de TODOs por Ejercicio

| Ejercicio | TODOs | Dificultad | Tiempo estimado |
|-----------|-------|------------|-----------------|
| 1. Typed Forms + Signals | 15 | Media | 20 min |
| 2. Validaciones Avanzadas | 19 | Alta | 25 min |
| 3. Inyección de Dependencias | 10 | Baja | 15 min |
| 4. FormArray Tipado | 14 | Media | 20 min |
| 5. Functional Providers | 10 | Media | 15 min |
| **TOTAL** | **68** | - | **95 min** |

---

## 💡 Tips para Completar los Ejercicios

### Ejercicio 1 - Typed Forms
1. Lee primero el archivo clásico para entender qué hace el formulario
2. Define la interfaz pensando en los tipos de datos reales
3. Usa `nonNullable: true` en todos los controles
4. Los `computed()` deben acceder a `form.controls.campo`

### Ejercicio 2 - Validaciones
1. Los validadores síncronos son funciones que retornan funciones
2. Los validadores asíncronos retornan Observables
3. Usa `of().pipe(delay())` para simular llamadas a API
4. El estado `PENDING` indica validación en progreso

### Ejercicio 3 - DI
1. `inject()` se usa a nivel de clase, no en métodos
2. Los tokens deben crearse fuera de la clase
3. `optional: true` evita errores si el servicio no existe
4. `self: true` limita la búsqueda al componente actual

### Ejercicio 4 - FormArray
1. `FormArray<FormControl<string>>` tipado completo
2. Usa `.controls` para iterar en el template
3. `track $index` es obligatorio en @for
4. `.push()` agrega, `.removeAt(index)` elimina

### Ejercicio 5 - Providers
1. La función debe retornar `Provider[]`
2. Usa condicionales (`if`) para providers opcionales
3. El spread operator `...` expande el array de providers
4. Inyecta el token para leer la configuración

---

## ✅ Checklist de Completitud

Antes de marcar un ejercicio como completado, verifica:

**General:**
- [ ] El código compila sin errores TypeScript
- [ ] El componente se renderiza correctamente
- [ ] No hay errores en la consola del navegador

**Ejercicio 1:**
- [ ] El formulario tiene todos los campos tipados
- [ ] Los `computed()` muestran errores correctamente
- [ ] `getRawValue()` retorna el tipo correcto
- [ ] Los tres botones funcionan

**Ejercicio 2:**
- [ ] Todos los validadores funcionan
- [ ] La validación asíncrona muestra el spinner
- [ ] Los mensajes de error son descriptivos
- [ ] Cross-field validation funciona (passwords match)

**Ejercicio 3:**
- [ ] Todos los servicios se inyectan correctamente
- [ ] El `InjectionToken` funciona
- [ ] Los modificadores `@Optional`, `@Self`, `@SkipSelf` están implementados
- [ ] No hay errores de inyección

**Ejercicio 4:**
- [ ] Se pueden agregar tareas dinámicamente
- [ ] Se pueden eliminar tareas
- [ ] Los contadores se actualizan automáticamente
- [ ] El `FormArray` está tipado

**Ejercicio 5:**
- [ ] `provideFeature()` retorna providers
- [ ] La configuración se inyecta correctamente
- [ ] Los servicios condicionales funcionan
- [ ] La lógica basada en config se ejecuta

---

## 🎯 Objetivos de Aprendizaje

Al completar estos ejercicios, habrás dominado:

**Formularios:**
- ✅ Typed Forms con seguridad de tipos completa
- ✅ `FormControl<T>`, `FormGroup<T>`, `FormArray<T>`
- ✅ Validadores síncronos y asíncronos personalizados
- ✅ Cross-field validation
- ✅ Integración de Signals con formularios
- ✅ `computed()` para mensajes de error reactivos

**Inyección de Dependencias:**
- ✅ `inject()` function vs constructor injection
- ✅ `InjectionToken<T>` para configuraciones
- ✅ Modificadores: `@Optional`, `@Self`, `@SkipSelf`
- ✅ Functional providers: `provideFeature()`
- ✅ Providers condicionales
- ✅ Jerarquía de inyectores

---

## 📚 Recursos de Apoyo

Si te atascas en algún ejercicio:

1. **Lee el README.md** de la sesión 3 (teoría completa)
2. **Compara con la versión clásica** del mismo ejercicio
3. **Revisa los comentarios** en el código (pistas incluidas)
4. **Consulta la documentación oficial:**
   - [Typed Forms](https://angular.dev/guide/forms/typed-forms)
   - [Validators](https://angular.dev/guide/forms/form-validation)
   - [Dependency Injection](https://angular.dev/guide/di)
   - [InjectionToken](https://angular.dev/api/core/InjectionToken)

---

**¡Éxito completando los ejercicios! 🚀**
