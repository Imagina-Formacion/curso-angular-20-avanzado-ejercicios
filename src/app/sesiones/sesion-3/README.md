# Sesión 3: Formularios Avanzados y Arquitectura de DI

## 🎯 Objetivos de Aprendizaje

Al finalizar esta sesión, serás capaz de:
- Implementar formularios fuertemente tipados (Typed Forms)
- Migrar formularios a la nueva API basada en Signals
- Crear validaciones síncronas y asíncronas reactivas
- Dominar la inyección de dependencias funcional
- Configurar providers con Standalone APIs
- Usar InjectionToken para configuraciones complejas

---

## 📚 Tema 5: Formularios Avanzados en Angular 20

### Conceptos Clave

#### 1. Typed Forms (Formularios Tipados)
Angular 14+ introdujo formularios fuertemente tipados que proporcionan seguridad de tipos en tiempo de compilación.

```typescript
// Clásico - Sin tipos fuertes
form = new FormGroup({
  nombre: new FormControl(''),
  email: new FormControl('')
});

// Moderno - Con tipos fuertes
interface UsuarioForm {
  nombre: string;
  email: string;
  edad: number;
}

form = new FormGroup<{[K in keyof UsuarioForm]: FormControl<UsuarioForm[K]>}>({
  nombre: new FormControl('', { nonNullable: true }),
  email: new FormControl('', { nonNullable: true }),
  edad: new FormControl(0, { nonNullable: true })
});
```

#### 2. Formularios con Signals (Preview en Angular 20)

Angular 20 introduce experimentalmente la integración de Signals en formularios:

```typescript
import { signal, computed } from '@angular/core';

// Estado del formulario como signal
formData = signal({
  nombre: '',
  email: '',
  edad: 0
});

// Validación reactiva con computed
isValid = computed(() => {
  const data = this.formData();
  return data.nombre.length > 0 &&
         data.email.includes('@') &&
         data.edad >= 18;
});

// Actualizar formulario
updateField(field: keyof typeof formData, value: any) {
  this.formData.update(current => ({
    ...current,
    [field]: value
  }));
}
```

#### 3. Validaciones Reactivas

**Validaciones Síncronas:**
```typescript
// Validator personalizado
function emailDominioValidator(dominio: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const email = control.value as string;
    return email.endsWith(`@${dominio}`)
      ? null
      : { emailDominio: { requiredDomain: dominio } };
  };
}

// Uso
emailControl = new FormControl('', [
  Validators.required,
  Validators.email,
  emailDominioValidator('empresa.com')
]);
```

**Validaciones Asíncronas:**
```typescript
// Validator asíncrono - verifica si email existe
emailExistsValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);

    return this.userService.checkEmailExists(control.value).pipe(
      map(exists => exists ? { emailTaken: true } : null),
      catchError(() => of(null))
    );
  };
}

// Uso
emailControl = new FormControl('', {
  validators: [Validators.required, Validators.email],
  asyncValidators: [this.emailExistsValidator()],
  updateOn: 'blur' // Solo valida al perder foco
});
```

#### 4. Mensajes de Error Reactivos

**Con Signals:**
```typescript
// Signal para errores
formErrors = computed(() => {
  const controls = this.form.controls;
  const errors: Record<string, string> = {};

  Object.keys(controls).forEach(key => {
    const control = controls[key];
    if (control.invalid && control.touched) {
      errors[key] = this.getErrorMessage(key, control.errors);
    }
  });

  return errors;
});

getErrorMessage(field: string, errors: ValidationErrors | null): string {
  if (!errors) return '';

  if (errors['required']) return `${field} es requerido`;
  if (errors['email']) return 'Email inválido';
  if (errors['minlength']) {
    return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
  }

  return 'Error de validación';
}
```

---

## 📚 Tema 6: Inyección de Dependencias y Standalone APIs

### Conceptos Clave

#### 1. Providers Funcionales vs Clásicos

**Clásico (NgModules):**
```typescript
@NgModule({
  providers: [
    UserService,
    { provide: API_URL, useValue: 'https://api.example.com' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppModule {}
```

**Moderno (Funcional):**
```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    { provide: API_URL, useValue: 'https://api.example.com' },
    UserService
  ]
};

// main.ts
bootstrapApplication(AppComponent, appConfig);
```

#### 2. InjectionToken para Configuraciones

```typescript
// tokens.ts
export interface AppConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
  factory: () => ({
    apiUrl: 'https://api.example.com',
    timeout: 30000,
    retries: 3
  })
});

// Uso en servicio
@Injectable()
export class ApiService {
  private config = inject(APP_CONFIG);

  constructor() {
    console.log('API URL:', this.config.apiUrl);
  }
}
```

#### 3. Modificadores de Inyección

**@Optional** - El servicio puede no existir:
```typescript
constructor(@Optional() private logger?: LoggerService) {
  this.logger?.log('Servicio inicializado');
}
```

**@Self** - Solo busca en el inyector del componente actual:
```typescript
constructor(@Self() private localService: LocalService) {}
```

**@SkipSelf** - Salta el inyector actual y busca en el padre:
```typescript
constructor(@SkipSelf() private parentService: ParentService) {}
```

**Con inject():**
```typescript
private logger = inject(LoggerService, { optional: true });
private localService = inject(LocalService, { self: true });
private parentService = inject(ParentService, { skipSelf: true });
```

#### 4. Jerarquía de Providers

```typescript
// Provider a nivel raíz (toda la app)
@Injectable({ providedIn: 'root' })
export class GlobalService {}

// Provider a nivel componente (instancia única por componente)
@Component({
  selector: 'app-user',
  providers: [UserLocalService]
})
export class UserComponent {}

// Provider en standalone component
@Component({
  selector: 'app-product',
  standalone: true,
  providers: [ProductService]
})
export class ProductComponent {}
```

#### 5. Functional Providers Pattern

```typescript
// feature.providers.ts
export function provideFeature(config: FeatureConfig) {
  return [
    { provide: FEATURE_CONFIG, useValue: config },
    FeatureService,
    FeatureGuard
  ];
}

// Uso
export const appConfig: ApplicationConfig = {
  providers: [
    provideFeature({ enabled: true, mode: 'advanced' }),
    provideRouter(routes)
  ]
};
```

---

## 🛠️ Ejercicios Prácticos

### Ejercicio 1: Formularios Tipados
**Objetivo:** Comparar FormGroup tradicional vs Typed Forms

**Archivos:**
- `ejercicio-1-forms-clasico.component.ts` - FormGroup sin tipos fuertes
- `ejercicio-1-forms-moderno.component.ts` - Typed Forms con seguridad de tipos

**Tareas:**
1. Observa cómo TypeScript detecta errores en el moderno
2. Compara el autocompletado en ambas versiones
3. Nota la diferencia en `form.value` vs `form.getRawValue()`

---

### Ejercicio 2: Validaciones Reactivas con Signals
**Objetivo:** Implementar validaciones complejas con reactividad

**Archivos:**
- `ejercicio-2-validaciones-clasico.component.ts` - Validaciones tradicionales
- `ejercicio-2-validaciones-moderno.component.ts` - Validaciones con Signals

**Tareas:**
1. Implementa validaciones síncronas y asíncronas
2. Crea mensajes de error reactivos
3. Observa el rendimiento de computed vs getters

**Validaciones a implementar:**
- Email válido y de dominio específico
- Password con requisitos mínimos (mayúscula, número, símbolo)
- Confirmación de password que coincida
- Username único (validación asíncrona simulada)

---

### Ejercicio 3: Inyección de Dependencias Funcional
**Objetivo:** Migrar de NgModule providers a functional providers

**Archivos:**
- `ejercicio-3-di-clasico.component.ts` - DI con NgModule
- `ejercicio-3-di-moderno.component.ts` - DI funcional con inject()

**Tareas:**
1. Compara constructor injection vs inject()
2. Implementa InjectionToken para configuración
3. Usa modificadores (@Optional, @Self, @SkipSelf)
4. Crea un provider funcional reutilizable

---

## 📊 Comparativa: Clásico vs Moderno

| Aspecto | Clásico | Moderno |
|---------|---------|---------|
| **Tipos** | Opcionales, inferidos | Fuertemente tipados |
| **Validaciones** | Imperativas | Reactivas con Signals |
| **Errores** | Manual con getters | Computed automático |
| **DI** | Constructor injection | inject() function |
| **Providers** | NgModule | Functional providers |
| **Configuración** | Strings mágicos | InjectionToken tipados |

---

## 🎯 Buenas Prácticas

### Formularios
✅ Usa `nonNullable: true` para evitar valores null/undefined
✅ Define interfaces para el tipo del formulario
✅ Usa `updateOn: 'blur'` para validaciones asíncronas
✅ Implementa computed signals para estado derivado
✅ Centraliza mensajes de error en un servicio

### DI
✅ Usa `inject()` en lugar de constructor injection
✅ Crea InjectionToken para configuraciones
✅ Prefiere `providedIn: 'root'` para servicios globales
✅ Usa functional providers para features modulares
✅ Documenta la jerarquía de inyección en casos complejos

---

## 🔍 Conceptos para Investigar

1. **FormArray tipado** - Arrays de controles con tipos
2. **FormRecord** - Formularios con claves dinámicas
3. **ControlValueAccessor** - Componentes de formulario personalizados
4. **Multi-providers** - Múltiples implementaciones de un token
5. **ViewProviders** - Providers solo para la vista
6. **Resolution modifiers** - Comportamiento de búsqueda de providers

---

## 📖 Recursos Adicionales

- [Angular Forms Documentation](https://angular.dev/guide/forms)
- [Typed Forms](https://angular.dev/guide/forms/typed-forms)
- [Dependency Injection](https://angular.dev/guide/di)
- [InjectionToken](https://angular.dev/api/core/InjectionToken)
- [Standalone Components](https://angular.dev/guide/components/importing)

---

## ✅ Checklist de Aprendizaje

Antes de pasar a la siguiente sesión, asegúrate de:

- [ ] Entender la diferencia entre FormGroup y Typed Forms
- [ ] Implementar validaciones síncronas y asíncronas
- [ ] Crear mensajes de error reactivos con computed
- [ ] Usar inject() en lugar de constructor injection
- [ ] Crear y usar InjectionToken
- [ ] Configurar providers funcionales
- [ ] Entender la jerarquía de inyección
- [ ] Aplicar modificadores de inyección correctamente

---

**¡Siguiente paso:** Sesión 4 - Routing Avanzado y Optimización 🚀
