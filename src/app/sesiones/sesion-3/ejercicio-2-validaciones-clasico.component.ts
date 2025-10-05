import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';

/**
 * EJERCICIO 2 - VERSIÓN CLÁSICA: Validaciones Complejas
 *
 * Esta es la implementación COMPLETA del enfoque clásico.
 * Muestra validaciones síncronas y asíncronas tradicionales.
 *
 * Características:
 * - Validadores personalizados síncronos
 * - Validadores asíncronos (simula verificación de email existente)
 * - Validación de contraseña con requisitos complejos
 * - Validación cruzada (password confirmation)
 */

@Component({
  selector: 'app-ejercicio2-validaciones-clasico',
  standalone: false,
  template: `
    <div class="ejercicio-card">
      <h2>🔒 Ejercicio 2: Validaciones - Versión Clásica</h2>
      <p class="subtitle">Validaciones síncronas y asíncronas tradicionales</p>

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
          <div class="error" *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
            <span *ngIf="form.get('email')?.hasError('required')">El email es requerido</span>
            <span *ngIf="form.get('email')?.hasError('email')">Formato de email inválido</span>
            <span *ngIf="form.get('email')?.hasError('emailDominio')">
              Debe ser del dominio @{{ form.get('email')?.getError('emailDominio').requiredDomain }}
            </span>
            <span *ngIf="form.get('email')?.hasError('emailTaken')">
              Este email ya está registrado
            </span>
          </div>
          <div class="validating" *ngIf="form.get('email')?.pending">
            Verificando disponibilidad...
          </div>
        </div>

        <!-- Username -->
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            id="username"
            type="text"
            formControlName="username"
            placeholder="usuario123"
          />
          <div class="error" *ngIf="form.get('username')?.invalid && form.get('username')?.touched">
            <span *ngIf="form.get('username')?.hasError('required')">El username es requerido</span>
            <span *ngIf="form.get('username')?.hasError('minlength')">Mínimo 4 caracteres</span>
            <span *ngIf="form.get('username')?.hasError('usernameTaken')">
              Username no disponible
            </span>
          </div>
          <div class="validating" *ngIf="form.get('username')?.pending">
            Verificando disponibilidad...
          </div>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            placeholder="********"
          />
          <div class="error" *ngIf="form.get('password')?.invalid && form.get('password')?.touched">
            <span *ngIf="form.get('password')?.hasError('required')">La contraseña es requerida</span>
            <span *ngIf="form.get('password')?.hasError('passwordStrength')">
              Debe contener: mayúscula, minúscula, número y símbolo
            </span>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <label for="confirmPassword">Confirmar Password:</label>
          <input
            id="confirmPassword"
            type="password"
            formControlName="confirmPassword"
            placeholder="********"
          />
          <div class="error" *ngIf="form.hasError('passwordMismatch') && form.get('confirmPassword')?.touched">
            Las contraseñas no coinciden
          </div>
        </div>

        <!-- Botones -->
        <div class="button-group">
          <button type="submit" [disabled]="form.invalid || form.pending">
            {{ form.pending ? 'Validando...' : 'Registrar Usuario' }}
          </button>
          <button type="button" (click)="resetForm()">
            Resetear
          </button>
        </div>
      </form>

      <!-- Estado del formulario -->
      <div class="form-state">
        <h3>Estado:</h3>
        <ul>
          <li><strong>Válido:</strong> {{ form.valid ? '✅' : '❌' }}</li>
          <li><strong>Pending:</strong> {{ form.pending ? '⏳' : '✅' }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .ejercicio-card {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }

    h2 {
      color: #333;
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
      border-color: #4CAF50;
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
      background: #4CAF50;
      color: white;
      flex: 1;
    }

    button[type="submit"]:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    button[type="button"] {
      background: #2196F3;
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
  `]
})
export class Ejercicio2ValidacionesClasico {
  // Validador personalizado: email debe ser de un dominio específico
  emailDominioValidator(dominio: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const email = control.value as string;
      return email.endsWith(`@${dominio}`)
        ? null
        : { emailDominio: { requiredDomain: dominio } };
    };
  }

  // Validador personalizado: password debe cumplir requisitos de seguridad
  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const password = control.value as string;

      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      const valid = hasUpperCase && hasLowerCase && hasNumber && hasSymbol && password.length >= 8;

      return valid ? null : { passwordStrength: true };
    };
  }

  // Validador asíncrono: verifica si el email ya existe
  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      const email = control.value as string;

      // Simula llamada a API (delay 1 segundo)
      return of(email).pipe(
        delay(1000),
        map(email => {
          // Simula que estos emails ya existen
          const existingEmails = ['test@empresa.com', 'admin@empresa.com'];
          return existingEmails.includes(email) ? { emailTaken: true } : null;
        }),
        catchError(() => of(null))
      );
    };
  }

  // Validador asíncrono: verifica si el username ya existe
  usernameExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      const username = control.value as string;

      // Simula llamada a API (delay 800ms)
      return of(username).pipe(
        delay(800),
        map(username => {
          // Simula que estos usernames ya existen
          const existingUsernames = ['admin', 'test', 'user123'];
          return existingUsernames.includes(username.toLowerCase())
            ? { usernameTaken: true }
            : null;
        }),
        catchError(() => of(null))
      );
    };
  }

  // Validador a nivel de formulario: verifica que las contraseñas coincidan
  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;

      if (!password || !confirmPassword) return null;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  form = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        this.emailDominioValidator('empresa.com')
      ],
      asyncValidators: [this.emailExistsValidator()],
      updateOn: 'blur' // Solo valida al perder foco
    }),
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(4)
      ],
      asyncValidators: [this.usernameExistsValidator()],
      updateOn: 'blur'
    }),
    password: new FormControl('', [
      Validators.required,
      this.passwordStrengthValidator()
    ]),
    confirmPassword: new FormControl('', Validators.required)
  }, {
    validators: [this.passwordMatchValidator()]
  });

  constructor() {
    console.log('🔴 [CLÁSICO] Ejercicio 2 - Validaciones complejas inicializado');
  }

  onSubmit() {
    if (this.form.valid) {
      const { confirmPassword, ...userData } = this.form.value;
      console.log('✅ [CLÁSICO] Usuario registrado:', userData);
      alert(`Usuario registrado exitosamente:\n${userData.username}`);
    }
  }

  resetForm() {
    this.form.reset();
    console.log('🔄 [CLÁSICO] Formulario reseteado');
  }
}
