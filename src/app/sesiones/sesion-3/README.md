# Sesión 3: Formularios Avanzados y Arquitectura de DI

## 📖 Contenido Teórico

### Introducción

En esta sesión aprenderás dos pilares fundamentales de aplicaciones Angular enterprise:

1. **Formularios Avanzados** con tipos fuertes y Signals para validaciones reactivas
2. **Inyección de Dependencias Moderna** con Standalone APIs y providers funcionales

Estos conceptos son esenciales para construir aplicaciones escalables, mantenibles y type-safe.

---

## Parte 1: Formularios Avanzados en Angular

### El Problema de los Formularios Sin Tipos

Antes de Angular 14, los formularios carecían de seguridad de tipos:

```typescript
// ❌ PROBLEMA: Sin tipos - Errores solo en runtime
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="form">
      <input formControlName="email" />
      <input formControlName="edad" />
    </form>
  `
})
export class UserFormComponent {
  form = new FormGroup({
    email: new FormControl(''),
    edad: new FormControl(0)
  });

  onSubmit() {
    // ❌ TypeScript NO detecta este error:
    const email = this.form.get('emaill')?.value;  // Typo en 'email'

    // ❌ TypeScript NO sabe el tipo:
    const edad = this.form.value.edad;  // tipo: any

    // ❌ Compilador no ayuda:
    this.form.value.nombre;  // Campo que no existe - no hay error
  }
}
```

**Problemas principales:**
- ❌ Errores solo se descubren en runtime
- ❌ Sin autocompletado del IDE
- ❌ Refactorización riesgosa
- ❌ Difícil mantenimiento en proyectos grandes

---

### Typed Forms: La Solución Moderna

Angular 14+ introdujo **formularios fuertemente tipados** que proporcionan seguridad en tiempo de compilación:

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// ✅ PASO 1: Define la interfaz del formulario
interface UserForm {
  email: string;
  edad: number;
  nombre: string;
}

// ✅ PASO 2: Define el tipo para los controles
type UserFormControls = {
  [K in keyof UserForm]: FormControl<UserForm[K]>;
};

@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="email" />
      <input formControlName="edad" type="number" />
      <input formControlName="nombre" />
      <button type="submit">Enviar</button>
    </form>
  `
})
export class UserFormComponent {
  // ✅ PASO 3: Crea el FormGroup tipado
  form = new FormGroup<UserFormControls>({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    edad: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(18)]
    }),
    nombre: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  onSubmit() {
    // ✅ TypeScript detecta errores:
    // const email = this.form.get('emaill')?.value;  // ERROR de compilación

    // ✅ TypeScript conoce los tipos:
    const edad: number = this.form.value.edad!;  // tipo: number

    // ✅ Autocompletado funciona:
    const datos = this.form.getRawValue();
    // datos.email ✅
    // datos.edad ✅
    // datos.nombre ✅
    // datos.apellido ❌ Error: no existe
  }
}
```

**Ventajas de Typed Forms:**
- ✅ Errores detectados en **tiempo de compilación**
- ✅ Autocompletado completo del IDE
- ✅ Refactorización segura
- ✅ Documentación automática del código
- ✅ Menos bugs en producción

---

### La Opción `nonNullable`

Controla si un control puede tener valores `null` o `undefined`:

```typescript
// Sin nonNullable (valor puede ser null)
const control1 = new FormControl<string>('');
// Tipo: FormControl<string | null>

// Con nonNullable: true (valor nunca es null)
const control2 = new FormControl<string>('', { nonNullable: true });
// Tipo: FormControl<string>

// Con valor inicial null
const control3 = new FormControl<string | null>(null);
// Tipo: FormControl<string | null>
```

**💡 Buena práctica:** Usa `nonNullable: true` por defecto para evitar checks de null innecesarios.

---

### Formularios con Signals: Estado Reactivo

Aunque Angular 20 aún no tiene una API oficial de formularios con Signals, podemos integrarlos manualmente:

```typescript
import { Component, signal, computed } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface LoginForm {
  email: string;
  password: string;
}

type LoginFormControls = {
  [K in keyof LoginForm]: FormControl<LoginForm[K]>;
};

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <!-- Email -->
      <div>
        <input formControlName="email" placeholder="Email" />
        @if (emailError()) {
          <span class="error">{{ emailError() }}</span>
        }
      </div>

      <!-- Password -->
      <div>
        <input formControlName="password" type="password" placeholder="Contraseña" />
        @if (passwordError()) {
          <span class="error">{{ passwordError() }}</span>
        }
      </div>

      <!-- Estado reactivo con Signals -->
      <div>
        <p>Formulario válido: {{ isFormValid() ? '✅' : '❌' }}</p>
        <p>Intentos: {{ loginAttempts() }}</p>
      </div>

      <!-- Botón con validación reactiva -->
      <button type="submit" [disabled]="!canSubmit()">
        Iniciar Sesión
      </button>
    </form>
  `
})
export class LoginComponent {
  // 1. FormGroup tipado (para validaciones robustas)
  form = new FormGroup<LoginFormControls>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)]
    })
  });

  // 2. Signals para estado de UI
  loginAttempts = signal(0);
  maxAttempts = 3;

  // 3. Computed para lógica derivada
  isFormValid = computed(() => this.form.valid);

  canSubmit = computed(() => {
    return this.isFormValid() && this.loginAttempts() < this.maxAttempts;
  });

  // 4. Computed signals para mensajes de error reactivos
  emailError = computed(() => {
    const control = this.form.controls.email;
    if (!control.touched || control.valid) return '';

    if (control.hasError('required')) return 'Email requerido';
    if (control.hasError('email')) return 'Email inválido';
    return '';
  });

  passwordError = computed(() => {
    const control = this.form.controls.password;
    if (!control.touched || control.valid) return '';

    if (control.hasError('required')) return 'Contraseña requerida';
    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    return '';
  });

  onSubmit() {
    if (!this.canSubmit()) {
      alert('Formulario inválido o demasiados intentos');
      return;
    }

    // Obtener valores tipados
    const { email, password } = this.form.getRawValue();
    console.log('Login:', { email, password });

    // Actualizar contador de intentos
    this.loginAttempts.update(n => n + 1);
  }
}
```

**Ventajas de combinar Forms + Signals:**
- ✅ Validaciones robustas de Angular Forms
- ✅ Estado UI reactivo con Signals
- ✅ Mensajes de error actualizados automáticamente
- ✅ Lógica de negocio con `computed()`

---

## Validaciones Personalizadas

### Validaciones Síncronas

Las validaciones síncronas se ejecutan inmediatamente y retornan un objeto de error o `null`:

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador simple: verifica que no haya números
export function sinNumerosValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const tieneNumeros = /\d/.test(control.value);
    return tieneNumeros
      ? { sinNumeros: { valor: control.value } }
      : null;
  };
}

// Uso:
const nombreControl = new FormControl('', [
  Validators.required,
  sinNumerosValidator()  // ✅ Validador personalizado
]);
```

**Validador con parámetros:**

```typescript
// Validador configurable: verifica dominio de email
export function emailDominioValidator(dominioPermitido: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const email = control.value as string;
    const dominio = email.split('@')[1];

    if (dominio !== dominioPermitido) {
      return {
        emailDominio: {
          dominioActual: dominio,
          dominioRequerido: dominioPermitido
        }
      };
    }

    return null;
  };
}

// Uso:
const emailControl = new FormControl('', [
  Validators.required,
  Validators.email,
  emailDominioValidator('empresa.com')  // Solo @empresa.com
]);
```

**Validador cross-field (comparar campos):**

```typescript
// Validador que compara dos campos del formulario
export function passwordsMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (!password || !confirmPassword) return null;

    return password === confirmPassword
      ? null
      : { passwordsNoCoinciden: true };
  };
}

// Uso en FormGroup:
const form = new FormGroup({
  password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  confirmPassword: new FormControl('', Validators.required)
}, {
  validators: passwordsMatchValidator()  // ✅ Validador a nivel de grupo
});
```

---

### Validaciones Asíncronas

Las validaciones asíncronas retornan un `Observable` o `Promise` y se usan para verificaciones que requieren consultas a un servidor:

```typescript
import { AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

// Simula verificación de disponibilidad de username
export function usernameDisponibleValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    // Simulamos delay de API (500ms)
    return of(control.value).pipe(
      delay(500),
      map(username => {
        // Simulamos usernames ya tomados
        const usuariosExistentes = ['admin', 'user', 'test', 'root'];
        const existe = usuariosExistentes.includes(username.toLowerCase());

        return existe
          ? { usernameNoDisponible: { username } }
          : null;
      })
    );
  };
}

// Uso:
const usernameControl = new FormControl('', {
  validators: [Validators.required, Validators.minLength(3)],
  asyncValidators: [usernameDisponibleValidator()],
  updateOn: 'blur'  // ✅ Solo valida al perder foco (no en cada tecla)
});
```

**Integración con Signals para mostrar estado:**

```typescript
@Component({
  selector: 'app-registro',
  template: `
    <div>
      <input [formControl]="usernameControl" placeholder="Username" />

      <!-- Mostrar estados con Signals -->
      @if (validandoUsername()) {
        <span class="validando">⏳ Verificando disponibilidad...</span>
      }

      @if (usernameDisponible() === true) {
        <span class="success">✅ Username disponible</span>
      }

      @if (usernameDisponible() === false) {
        <span class="error">❌ Username ya está en uso</span>
      }
    </div>
  `
})
export class RegistroComponent {
  usernameControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    asyncValidators: [usernameDisponibleValidator()],
    updateOn: 'blur'
  });

  // Signals para tracking del estado
  validandoUsername = signal(false);
  usernameDisponible = signal<boolean | null>(null);

  constructor() {
    // Monitorear cambios de estado
    this.usernameControl.statusChanges.subscribe(status => {
      this.validandoUsername.set(status === 'PENDING');

      if (status === 'VALID') {
        this.usernameDisponible.set(true);
      } else if (this.usernameControl.hasError('usernameNoDisponible')) {
        this.usernameDisponible.set(false);
      } else {
        this.usernameDisponible.set(null);
      }
    });
  }
}
```

---

## Parte 2: Inyección de Dependencias Moderna

### Evolución de la DI en Angular

Angular ha evolucionado su sistema de inyección de dependencias en tres eras:

#### Era 1: NgModules (Angular 2-14)

```typescript
// app.module.ts
@NgModule({
  declarations: [AppComponent, UserComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    UserService,
    { provide: API_URL, useValue: 'https://api.example.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// user.component.ts
@Component({
  selector: 'app-user',
  template: `...`
})
export class UserComponent {
  // ❌ Constructor injection (verboso)
  constructor(private userService: UserService) {}
}
```

**Problemas:**
- ❌ Módulos grandes y difíciles de mantener
- ❌ Tree-shaking limitado
- ❌ Boilerplate excesivo
- ❌ Difícil entender dependencias

---

#### Era 2: Standalone Components (Angular 14+)

```typescript
// user.component.ts
@Component({
  selector: 'app-user',
  standalone: true,  // ✅ Sin necesidad de NgModule
  imports: [CommonModule],
  providers: [UserService],  // ✅ Providers locales
  template: `...`
})
export class UserComponent {
  constructor(private userService: UserService) {}
}
```

**Mejoras:**
- ✅ Componentes autocontenidos
- ✅ Mejor tree-shaking
- ✅ Más fácil de entender
- ✅ No necesita NgModule

---

#### Era 3: inject() Function (Angular 14+, mejorado en 20)

```typescript
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  template: `...`
})
export class UserComponent {
  // ✅ Función inject() - más conciso y funcional
  private userService = inject(UserService);
  private http = inject(HttpClient);
  private router = inject(Router);

  // Código más limpio, sin constructor
}
```

**Ventajas de `inject()`:**
- ✅ Código más limpio y funcional
- ✅ Inyección condicional más fácil
- ✅ Mejor para composición
- ✅ Funciona fuera del constructor (en factories, providers, etc.)

---

### InjectionToken: Configuraciones Type-Safe

Los `InjectionToken` permiten inyectar valores primitivos de forma segura:

#### Problema: Valores Primitivos No Son Inyectables

```typescript
// ❌ NO FUNCIONA
@Component({
  providers: [
    { provide: string, useValue: 'https://api.example.com' }  // ERROR
  ]
})

// ❌ Solución antigua: Strings mágicos (sin type-safety)
const API_URL = 'API_URL';  // Solo un string
```

#### Solución: InjectionToken Tipado

```typescript
// tokens.ts
import { InjectionToken } from '@angular/core';

// ✅ Token tipado con valor por defecto
export const API_URL = new InjectionToken<string>('api.url', {
  providedIn: 'root',
  factory: () => 'https://api.default.com'  // Valor por defecto
});

// Uso en servicio
@Injectable()
export class ApiService {
  private apiUrl = inject(API_URL);  // ✅ Type-safe: string

  fetchData() {
    return fetch(`${this.apiUrl}/data`);
  }
}

// Override en configuración
@Component({
  providers: [
    { provide: API_URL, useValue: 'https://api.prod.com' }
  ]
})
export class AppComponent {}
```

#### InjectionToken para Configuraciones Complejas

```typescript
// config.ts
export interface AppConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
  enableLogging: boolean;
  features: {
    darkMode: boolean;
    analytics: boolean;
  };
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
  factory: () => ({
    apiUrl: 'https://api.dev.com',
    timeout: 30000,
    retries: 3,
    enableLogging: true,
    features: {
      darkMode: false,
      analytics: false
    }
  })
});

// Uso en componente
@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `...`
})
export class DashboardComponent {
  private config = inject(APP_CONFIG);

  ngOnInit() {
    console.log('API URL:', this.config.apiUrl);
    console.log('Timeout:', this.config.timeout);

    if (this.config.features.analytics) {
      this.initAnalytics();
    }
  }

  initAnalytics() {
    // Inicializar analytics
  }
}

// Override en producción
export const productionConfig: AppConfig = {
  apiUrl: 'https://api.prod.com',
  timeout: 60000,
  retries: 5,
  enableLogging: false,
  features: {
    darkMode: true,
    analytics: true
  }
};

// main.ts (producción)
bootstrapApplication(AppComponent, {
  providers: [
    { provide: APP_CONFIG, useValue: productionConfig }
  ]
});
```

---

### Modificadores de Inyección

Los modificadores controlan cómo Angular busca las dependencias en la jerarquía de inyectores.

#### @Optional - Dependencia Opcional

Permite que la dependencia sea `null` si no existe:

```typescript
import { Component, inject, Optional } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  template: `...`
})
export class UserComponent {
  // Constructor injection
  constructor(@Optional() private logger?: LoggerService) {
    if (this.logger) {
      this.logger.log('Component initialized');
    } else {
      console.log('Logger no disponible');
    }
  }

  // Con inject()
  private config = inject(ConfigService, { optional: true });

  logSomething() {
    this.config?.log('algo') ?? console.log('No config');
  }
}
```

#### @Self - Solo Inyector Actual

Solo busca en el inyector del componente actual, no en padres:

```typescript
@Component({
  selector: 'app-child',
  standalone: true,
  providers: [LocalService]  // ✅ Debe estar aquí
})
export class ChildComponent {
  // Solo busca en este componente
  private local = inject(LocalService, { self: true });

  // Si LocalService NO está en providers de este componente, lanzará error
}
```

#### @SkipSelf - Saltar Inyector Actual

Salta el inyector del componente y busca en padres:

```typescript
@Component({
  selector: 'app-parent',
  providers: [CounterService]  // Instancia 1
})
export class ParentComponent {
  counter = inject(CounterService);  // Instancia 1
}

@Component({
  selector: 'app-child',
  providers: [CounterService]  // Instancia 2
})
export class ChildComponent {
  // Sin skipSelf: obtiene Instancia 2 (la local)
  localCounter = inject(CounterService);

  // Con skipSelf: salta la local, obtiene Instancia 1 (del padre)
  parentCounter = inject(CounterService, { skipSelf: true });

  increment() {
    this.localCounter.increment();   // Incrementa solo la local
    this.parentCounter.increment();  // Incrementa solo la del padre
  }
}
```

---

### Functional Providers: Configuración Modular

Los functional providers permiten crear configuraciones reutilizables y composables:

```typescript
// feature.providers.ts
import { Provider } from '@angular/core';

export interface FeatureConfig {
  enableCache: boolean;
  enableAnalytics: boolean;
  apiUrl?: string;
}

export const FEATURE_CONFIG = new InjectionToken<FeatureConfig>('feature.config');

// ✅ Función que retorna providers
export function provideFeature(config: FeatureConfig): Provider[] {
  const providers: Provider[] = [
    { provide: FEATURE_CONFIG, useValue: config }
  ];

  // Providers condicionales
  if (config.enableCache) {
    providers.push(CacheService);
  }

  if (config.enableAnalytics) {
    providers.push(AnalyticsService);
  }

  if (config.apiUrl) {
    providers.push({
      provide: API_URL,
      useValue: config.apiUrl
    });
  }

  return providers;
}

// Uso en main.ts
bootstrapApplication(AppComponent, {
  providers: [
    provideFeature({
      enableCache: true,
      enableAnalytics: true,
      apiUrl: 'https://api.prod.com'
    })
  ]
});

// O en componente standalone
@Component({
  standalone: true,
  providers: [
    ...provideFeature({
      enableCache: true,
      enableAnalytics: false
    })
  ]
})
export class FeatureComponent {}
```

**Ventajas:**
- ✅ Configuración dinámica
- ✅ Providers condicionales
- ✅ Reutilizable entre proyectos
- ✅ Mejor tree-shaking
- ✅ Más testeable

---

## 📊 Comparativa: Clásico vs Moderno

### Formularios

| Aspecto | Clásico | Moderno |
|---------|---------|---------|
| **Tipos** | Sin tipos (`any`) | Fuertemente tipados |
| **Validación** | Manual con getters | Automática con `computed()` |
| **Errores** | Templates verbosos | Signals reactivos |
| **Configuración** | `FormControl('')` | `FormControl<string>('', { nonNullable: true })` |
| **Valores** | `form.value` (puede tener null) | `form.getRawValue()` (typed) |

### Inyección de Dependencias

| Aspecto | Clásico | Moderno |
|---------|---------|---------|
| **Inyección** | Constructor injection | `inject()` function |
| **Providers** | `@NgModule({ providers: [] })` | `provideFeature()` funcional |
| **Configuración** | Strings mágicos | `InjectionToken<T>` tipados |
| **Módulos** | NgModule obligatorio | Standalone components |
| **Tree-shaking** | Limitado | Excelente |

---

## 💡 Mejores Prácticas

### Formularios

✅ **DO (Hacer):**

1. **Usa `nonNullable: true` por defecto**
   ```typescript
   new FormControl<string>('', { nonNullable: true })
   ```

2. **Define interfaces para el formulario**
   ```typescript
   interface UserForm { email: string; edad: number; }
   ```

3. **Usa `updateOn: 'blur'` para validaciones asíncronas**
   ```typescript
   asyncValidators: [emailValidator()],
   updateOn: 'blur'
   ```

4. **Usa `computed()` para mensajes de error**
   ```typescript
   emailError = computed(() => { /* lógica */ });
   ```

❌ **DON'T (Evitar):**

1. **No uses `any` en controles**
   ```typescript
   form: any  // ❌ Mal
   ```

2. **No accedas a controles sin null-check**
   ```typescript
   this.form.get('email').value  // ❌ Puede ser null
   ```

### Inyección de Dependencias

✅ **DO (Hacer):**

1. **Usa `inject()` en lugar de constructor**
   ```typescript
   private service = inject(MyService);  // ✅ Bien
   ```

2. **Crea `InjectionToken` para configuraciones**
   ```typescript
   const CONFIG = new InjectionToken<Config>('config');
   ```

3. **Usa `providedIn: 'root'` para servicios globales**
   ```typescript
   @Injectable({ providedIn: 'root' })
   ```

4. **Usa functional providers para features**
   ```typescript
   export function provideFeature(config) { /* ... */ }
   ```

❌ **DON'T (Evitar):**

1. **No uses strings para tokens**
   ```typescript
   { provide: 'API_URL', useValue: '...' }  // ❌ Sin tipos
   ```

2. **No inyectes servicios en constructores largos**
   ```typescript
   constructor(s1, s2, s3, s4, s5) { }  // ❌ Verboso
   ```

---

## 🎯 Ejercicios Prácticos

Esta sesión incluye **5 ejercicios** progresivos que cubren todos los conceptos:

### Ejercicio 1: Typed Forms + Signals
**Objetivo:** Crear un formulario tipado con validaciones reactivas
**Archivo:** `ejercicio-1-forms-moderno.component.ts`
**TODOs:** 15

**Aprenderás:**
- Definir interfaces para formularios
- Crear `FormGroup` tipado
- Usar `computed()` para mensajes de error
- Integrar Signals con Forms

---

### Ejercicio 2: Validaciones Avanzadas
**Objetivo:** Implementar validaciones síncronas y asíncronas
**Archivo:** `ejercicio-2-validaciones-moderno.component.ts`
**TODOs:** 19

**Aprenderás:**
- Validadores personalizados síncronos
- Validadores asíncronos (simular API)
- Cross-field validation
- Mostrar estado de validación con Signals

---

### Ejercicio 3: Inyección de Dependencias
**Objetivo:** Dominar `inject()` y modificadores
**Archivo:** `ejercicio-3-di-moderno.component.ts`
**TODOs:** 10

**Aprenderás:**
- Usar `inject()` en lugar de constructor
- Modificadores: `@Optional`, `@Self`, `@SkipSelf`
- `InjectionToken` para configuraciones
- Jerarquía de inyectores

---

### Ejercicio 4: FormArray Tipado
**Objetivo:** Trabajar con arrays dinámicos tipados
**Archivo:** `ejercicio-4-formarray-moderno.component.ts`
**TODOs:** 14

**Aprenderás:**
- `FormArray` con tipos fuertes
- Agregar/eliminar controles dinámicamente
- Validar arrays completos
- Integrar con Signals

---

### Ejercicio 5: Functional Providers
**Objetivo:** Configurar servicios con providers funcionales
**Archivo:** `ejercicio-5-providers-moderno.component.ts`
**TODOs:** 10

**Aprenderás:**
- Crear `provideFeature()` functions
- Providers condicionales
- `InjectionToken` avanzados
- Configuración modular y reutilizable

---

## 📚 Referencias

- [Angular Forms - Documentación Oficial](https://angular.dev/guide/forms)
- [Typed Forms](https://angular.dev/guide/forms/typed-forms)
- [Dependency Injection](https://angular.dev/guide/di)
- [InjectionToken](https://angular.dev/api/core/InjectionToken)
- [Standalone Components](https://angular.dev/guide/components/importing)

---

## ✅ Checklist de Aprendizaje

Antes de pasar a la siguiente sesión, asegúrate de:

**Formularios:**
- [ ] Entender la diferencia entre `FormGroup` y Typed Forms
- [ ] Usar `nonNullable` correctamente
- [ ] Implementar validaciones síncronas y asíncronas
- [ ] Crear mensajes de error reactivos con `computed()`
- [ ] Integrar formularios con Signals

**Inyección de Dependencias:**
- [ ] Usar `inject()` en lugar de constructor injection
- [ ] Crear y usar `InjectionToken`
- [ ] Aplicar modificadores (@Optional, @Self, @SkipSelf)
- [ ] Configurar functional providers
- [ ] Entender la jerarquía de inyección

---

**¡Éxito en tu aprendizaje de Formularios y DI en Angular 20! 🚀**
