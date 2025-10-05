import { Component, computed, signal, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay, catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

/**
 * EJERCICIO 2 - VERSIÓN MODERNA: Validaciones Reactivas + RxJS Integration
 *
 * 🎯 TU OBJETIVO:
 * Implementar validaciones complejas usando Typed Forms + Signals + RxJS
 * para obtener mensajes de error reactivos, auto-guardado y formularios dependientes.
 *
 * 📝 TAREAS:
 * 1. Completar la interfaz y tipos del formulario (TODO 1-2)
 * 2. Implementar validadores personalizados (TODO 3-6)
 * 3. Crear FormGroup con validaciones (TODO 7)
 * 4. Crear signals para estado del formulario (TODO 8-9)
 * 5. Implementar computed signals para errores (TODO 10-13)
 * 6. Implementar auto-guardado con RxJS (TODO 14-15)
 * 7. Implementar formulario dependiente país/ciudad (TODO 16-18)
 * 8. Completar el template (TODO 19-22)
 * 9. Implementar métodos del componente (TODO 23-24)
 */

// TODO 1: Define la interfaz del formulario de registro
// Campos: email (string), username (string), password (string), confirmPassword (string)
// interface RegistroForm {
//   ...
// }

// TODO 2: Define el tipo para los controles
// type RegistroFormControls = {
//   [K in keyof RegistroForm]: FormControl<RegistroForm[K]>;
// };

@Component({
  selector: 'app-ejercicio2-validaciones-moderno',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="ejercicio-card">
      <h2>✨ Ejercicio 2: Validaciones - Versión Moderna</h2>
      <p class="subtitle">Validaciones reactivas con Signals - ¡Completa los TODOs!</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <!-- Email -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            placeholder="tu@empresa.com"
          />
          @if (emailError()) {
            <div class="error">{{ emailError() }}</div>
          }
          @if (isEmailValidating()) {
            <div class="validating">Verificando disponibilidad...</div>
          }
        </div>

        <!-- Username -->
        <div class="form-group">
          <label>Username:</label>
          <input formControlName="username" placeholder="usuario123" />
          @if (usernameError()) {
            <div class="error">{{ usernameError() }}</div>
          }
          @if (isUsernameValidating()) {
            <div class="validating">Verificando disponibilidad...</div>
          }
        </div>

        <!-- Password -->
        <div class="form-group">
          <label>Password:</label>
          <input type="password" formControlName="password" placeholder="********" />
          @if (passwordError()) {
            <div class="error">{{ passwordError() }}</div>
          }
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <label>Confirmar Password:</label>
          <input type="password" formControlName="confirmPassword" placeholder="********" />
          @if (confirmPasswordError()) {
            <div class="error">{{ confirmPasswordError() }}</div>
          }
        </div>

        <!-- Botones -->
        <div class="button-group">
          <button type="submit" [disabled]="!isFormValid() || isFormPending()">
            {{ isFormPending() ? 'Validando...' : 'Registrar Usuario' }}
          </button>
          <button type="button" (click)="resetForm()">
            Resetear
          </button>
        </div>
      </form>

      <!-- Estado del formulario -->
      <div class="form-state">
        <h3>Estado (Signals):</h3>
        <ul>
          <li><strong>Válido:</strong> {{ isFormValid() ? '✅' : '❌' }}</li>
          <li><strong>Pending:</strong> {{ isFormPending() ? '⏳' : '✅' }}</li>
          <!-- TODO 19: Mostrar estado de auto-guardado -->
          <!-- @if (estadoGuardado()) {
            <li><strong>Auto-guardado:</strong> {{ estadoGuardado() }}</li>
          } -->
        </ul>
      </div>

      <!-- TODO 20: Agregar sección de formulario dependiente país/ciudad -->
      <!-- <div class="ubicacion-section">
        <h3>🌍 Ubicación (Formulario Dependiente):</h3>
        <form [formGroup]="ubicacionForm">
          <div class="form-group">
            <label>País:</label>
            <select formControlName="pais">
              <option value="">Selecciona un país</option>
              <option value="España">España</option>
              <option value="México">México</option>
              <option value="Argentina">Argentina</option>
            </select>
          </div>

          <div class="form-group">
            <label>Ciudad:</label>
            <select formControlName="ciudad">
              <option value="">Selecciona una ciudad</option>
              @for (ciudad of ciudadesDisponibles(); track ciudad) {
                <option [value]="ciudad">{{ ciudad }}</option>
              }
            </select>
            @if (ubicacionForm.get('ciudad')?.disabled) {
              <div class="hint">Primero selecciona un país</div>
            }
          </div>
        </form>
      </div> -->

      <!-- TODO 21: Agregar indicador visual de auto-guardado
        @if (estadoGuardado() === 'guardando') {
          <div class="saving-indicator">💾 Guardando...</div>
        }
        @if (estadoGuardado() === 'guardado') {
          <div class="saved-indicator">✅ Guardado automáticamente</div>
        }
      -->

      <!-- TODO 22: Mostrar valores del formulario con formValues() signal
        <div class="form-values">
          <h3>Valores Actuales:</h3>
          <pre>{{ formValues() | json }}</pre>
        </div>
      -->
    </div>
  `,
  styles: [`
    .ejercicio-card {
      background: #f0f8ff;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }

    h2 {
      color: #1976d2;
      margin-bottom: 5px;
    }

    .subtitle {
      color: #666;
      font-style: italic;
      margin-bottom: 20px;
    }

    form {
      background: white;
      padding: 20px;
      border-radius: 8px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
      color: #333;
    }

    input {
      width: 100%;
      padding: 8px 12px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #1976d2;
    }

    .error {
      color: #f44336;
      font-size: 12px;
      margin-top: 5px;
    }

    .validating {
      color: #ff9800;
      font-size: 12px;
      margin-top: 5px;
      font-style: italic;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }

    button[type="submit"] {
      background: #1976d2;
      color: white;
      flex: 1;
    }

    button[type="submit"]:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    button[type="button"] {
      background: #00bcd4;
      color: white;
    }

    .form-state {
      background: white;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
    }

    .form-state ul {
      list-style: none;
      padding: 0;
      margin: 10px 0 0 0;
    }

    .ubicacion-section {
      background: white;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
    }

    select {
      width: 100%;
      padding: 8px 12px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }

    select:disabled {
      background: #f5f5f5;
      cursor: not-allowed;
    }

    .hint {
      color: #666;
      font-size: 12px;
      margin-top: 5px;
      font-style: italic;
    }

    .saving-indicator {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff9800;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .saved-indicator {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4caf50;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      animation: fadeOut 3s forwards;
    }

    @keyframes fadeOut {
      0%, 80% { opacity: 1; }
      100% { opacity: 0; }
    }

    .form-values {
      background: white;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
    }

    .form-values pre {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
    }
  `]
})
export class Ejercicio2ValidacionesModerno {
  // TODO 3: Implementa emailDominioValidator
  // Debe verificar que el email termine con @{dominio}
  // Retorna: null si es válido, { emailDominio: { requiredDomain: dominio } } si no
  emailDominioValidator(dominio: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // TODO: Implementar lógica
      console.log('TODO: Implementar emailDominioValidator');
      return null;
    };
  }

  // TODO 4: Implementa passwordStrengthValidator
  // Debe verificar que la contraseña tenga:
  // - Al menos 8 caracteres
  // - Una mayúscula
  // - Una minúscula
  // - Un número
  // - Un símbolo especial
  // Retorna: null si es válido, { passwordStrength: true } si no
  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // TODO: Implementar lógica
      console.log('TODO: Implementar passwordStrengthValidator');
      return null;
    };
  }

  // TODO 5: Implementa emailExistsValidator (AsyncValidator)
  // Simula verificar si el email ya existe con delay de 1 segundo
  // Emails existentes: 'test@empresa.com', 'admin@empresa.com'
  // Retorna: Observable<{ emailTaken: true } | null>
  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      // TODO: Implementar validación asíncrona
      console.log('TODO: Implementar emailExistsValidator');
      return of(null);
    };
  }

  // TODO 6: Implementa usernameExistsValidator (AsyncValidator)
  // Simula verificar si el username ya existe con delay de 800ms
  // Usernames existentes: 'admin', 'test', 'user123'
  // Retorna: Observable<{ usernameTaken: true } | null>
  usernameExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      // TODO: Implementar validación asíncrona
      console.log('TODO: Implementar usernameExistsValidator');
      return of(null);
    };
  }

  // Validador a nivel de formulario para verificar que las contraseñas coincidan
  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;

      if (!password || !confirmPassword) return null;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  // TODO 7: Crea el FormGroup tipado con todos los campos y validaciones
  // email: required, email, emailDominioValidator('empresa.com'), emailExistsValidator() (async)
  // username: required, minLength(4), usernameExistsValidator() (async)
  // password: required, passwordStrengthValidator()
  // confirmPassword: required
  // A nivel de formulario: passwordMatchValidator()
  // Usa updateOn: 'blur' para las validaciones asíncronas
  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
      // TODO: Agregar validador de dominio
      // TODO: Agregar validador asíncrono
      updateOn: 'blur'
    }),
    // TODO: Agregar username
    // TODO: Agregar password
    // TODO: Agregar confirmPassword
  }); // TODO: Agregar passwordMatchValidator a nivel de formulario

  // TODO 8: Crea signals para el estado del formulario
  // private formState = signal({
  //   valid: this.form.valid,
  //   pending: this.form.pending
  // });

  // TODO 9: Crea computed signals para el estado
  // isFormValid = computed(() => this.formState().valid);
  // isFormPending = computed(() => this.formState().pending);

  // Placeholders temporales
  isFormValid = () => this.form.valid;
  isFormPending = () => this.form.pending;

  // TODO 10: Crea computed signal para errores de email
  // Debe manejar: required, email, emailDominio, emailTaken
  emailError = computed(() => {
    // TODO: Implementar
    return '';
  });

  // TODO 11: Crea computed para verificar si email está validando
  isEmailValidating = computed(() => {
    // TODO: Implementar
    return false;
  });

  // TODO 12: Crea computed signals para errores de username, password y confirmPassword
  // usernameError, isUsernameValidating, passwordError, confirmPasswordError
  usernameError = computed(() => '');
  isUsernameValidating = computed(() => false);
  passwordError = computed(() => '');
  confirmPasswordError = computed(() => {
    // Incluye validación de passwordMismatch a nivel de formulario
    return '';
  });

  // TODO 13: Crea computed signal para los valores del formulario
  // formValues = computed(() => this.form.getRawValue());

  // ========== PARTE 2: INTEGRACIÓN RxJS AVANZADA ==========

  // TODO 14: Implementa auto-guardado con RxJS
  // En el constructor, suscríbete a this.form.valueChanges con:
  // - debounceTime(2000) - esperar 2 segundos después del último cambio
  // - distinctUntilChanged() - solo si el valor cambió
  // - tap(() => this.estadoGuardado.set('guardando'))
  // - switchMap(() => this.simularGuardado()) - llamar método de guardado
  // - Actualizar this.estadoGuardado a 'guardado' o 'error'

  // Signal para estado de auto-guardado
  estadoGuardado = signal<'guardando' | 'guardado' | 'error' | null>(null);

  // TODO 15: Implementa el método simularGuardado
  // Retorna Observable que simula guardado en servidor (delay 500ms)
  // private simularGuardado(): Observable<void> {
  //   return of(undefined).pipe(delay(500));
  // }

  // ========== PARTE 3: FORMULARIOS DEPENDIENTES ==========

  // TODO 16: Crea FormGroup para país y ciudad
  // ubicacionForm = new FormGroup({
  //   pais: new FormControl<string>('', { nonNullable: true }),
  //   ciudad: new FormControl<string>({ value: '', disabled: true }, { nonNullable: true })
  // });

  // Signal con ciudades disponibles
  ciudadesDisponibles = signal<string[]>([]);

  // TODO 17: En el constructor, suscríbete a pais.valueChanges con:
  // - tap(() => resetear ciudad y deshabilitar)
  // - filter(pais => !!pais)
  // - switchMap(pais => this.obtenerCiudades(pais))
  // - Actualizar ciudadesDisponibles signal
  // - Habilitar control de ciudad

  // TODO 18: Implementa el método obtenerCiudades
  // Simula llamada a API que retorna ciudades según el país (delay 300ms)
  // España: ['Madrid', 'Barcelona', 'Valencia']
  // México: ['CDMX', 'Guadalajara', 'Monterrey']
  // Argentina: ['Buenos Aires', 'Córdoba', 'Rosario']
  // private obtenerCiudades(pais: string): Observable<string[]> {
  //   const ciudades: Record<string, string[]> = { ... };
  //   return of(ciudades[pais] || []).pipe(delay(300));
  // }

  constructor() {
    console.log('✅ [MODERNO] Ejercicio 2 - Validaciones con Signals + RxJS inicializado');

    // TODO: Suscríbete a valueChanges y statusChanges para actualizar formState

    // TODO 14: Implementar auto-guardado aquí

    // TODO 17: Implementar sincronización país→ciudad aquí
  }

  // TODO 23: Implementa onSubmit
  // - Verifica que el formulario sea válido
  // - Excluye confirmPassword de los datos a enviar
  // - Muestra console.log y alert
  onSubmit() {
    console.log('TODO: Implementar onSubmit');
  }

  // TODO 24: Implementa resetForm
  // - Resetea form
  // - Resetea ubicacionForm
  // - Resetea estadoGuardado
  // - Resetea ciudadesDisponibles
  resetForm() {
    console.log('TODO: Implementar resetForm');
  }
}

/**
 * RESUMEN DE TODOs - EJERCICIO 2 MEJORADO:
 *
 * Total: 24 TODOs
 *
 * Parte 1: Validaciones Básicas (TODO 1-13)
 * - Interfaces y tipos
 * - Validadores síncronos y asíncronos
 * - FormGroup tipado
 * - Signals para errores
 *
 * Parte 2: Integración RxJS (TODO 14-15)
 * - Auto-guardado con debounce
 * - Simulación de API
 *
 * Parte 3: Formularios Dependientes (TODO 16-18)
 * - FormGroup país/ciudad
 * - Sincronización reactiva
 * - Obtener datos dinámicamente
 *
 * Parte 4: Template (TODO 19-22)
 * - Indicadores de auto-guardado
 * - Formulario dependiente UI
 * - Visualización de valores
 *
 * Parte 5: Métodos (TODO 23-24)
 * - Submit y reset
 */
