import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * EJERCICIO 1 - VERSIÓN MODERNA: Typed Forms + Signals
 *
 * 🎯 TU OBJETIVO:
 * Migrar el formulario clásico a Typed Forms con Signals para obtener:
 * - Seguridad de tipos en compilación
 * - Autocompletado completo del IDE
 * - Estado reactivo con Signals
 * - Mensajes de error con computed signals
 *
 * 📝 PASOS A SEGUIR:
 * 1. Define la interfaz UsuarioForm (TODO 1)
 * 2. Define el tipo UsuarioFormControls (TODO 2)
 * 3. Crea el FormGroup tipado (TODO 3)
 * 4. Implementa el template con @if (TODO 4-6)
 * 5. Crea signals para el estado (TODO 7-8)
 * 6. Crea computed signals para errores (TODO 9-12)
 * 7. Implementa los métodos (TODO 13-15)
 */

// TODO 1: Define la interfaz del formulario
// Debe tener: nombre (string), email (string), edad (number), rol (string)
// interface UsuarioForm {
//   nombre: string;
//   email: string;
//   edad: number;
//   rol: string;
// }

// TODO 2: Define el tipo para los controles del formulario
// Usa un mapped type para convertir cada propiedad de UsuarioForm en un FormControl
// type UsuarioFormControls = {
//   [K in keyof UsuarioForm]: FormControl<UsuarioForm[K]>;
// };

@Component({
  selector: 'app-ejercicio1-forms-moderno',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="ejercicio-card">
      <h2>✨ Ejercicio 1: Formularios - Versión Moderna</h2>
      <p class="subtitle">Typed Forms + Signals - ¡Completa los TODOs!</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <!-- Nombre -->
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input
            id="nombre"
            type="text"
            formControlName="nombre"
            placeholder="Introduce tu nombre"
          />
          @if (nombreError()) {
            <div class="error">{{ nombreError() }}</div>
          }
        </div>

        <!-- TODO 4: Implementa el campo Email
          - Copia la estructura del campo nombre
          - Usa formControlName="email"
          - Cambia el @if para usar emailError()
          - Placeholder: "tu@email.com"
        -->

        <!-- TODO 5: Implementa el campo Edad
          - Tipo: number
          - formControlName="edad"
          - Usa edadError() para mostrar errores
          - Placeholder: "18"
        -->

        <!-- TODO 6: Implementa el campo Rol (select)
          - formControlName="rol"
          - Opciones: estudiante, profesor, admin
          - Usa rolError() para errores
        -->

        <!-- Botones -->
        <div class="button-group">
          <button type="submit" [disabled]="!isFormValid()">
            Enviar Formulario
          </button>
          <button type="button" (click)="resetForm()">
            Resetear
          </button>
          <button type="button" (click)="fillWithTestData()">
            Datos de Prueba
          </button>
        </div>
      </form>

      <!-- Estado del formulario -->
      <div class="form-state">
        <h3>Estado del Formulario (Signals):</h3>
        <ul>
          <li><strong>Válido:</strong> {{ isFormValid() ? '✅' : '❌' }}</li>
          <li><strong>Tocado:</strong> {{ isFormTouched() ? '✅' : '❌' }}</li>
          <li><strong>Sucio:</strong> {{ isFormDirty() ? '✅' : '❌' }}</li>
        </ul>
      </div>

      <!-- Valores del formulario -->
      <div class="form-values">
        <h3>Valores Actuales (Typed):</h3>
        <pre>{{ formValueDisplay() }}</pre>
      </div>

      <!-- Ventajas -->
      <div class="success-box">
        <h3>✅ Ventajas que estás aprendiendo:</h3>
        <ul>
          <li>Tipos fuertes: TypeScript valida en compilación</li>
          <li>Autocompletado: El IDE te ayuda</li>
          <li>Signals: Estado reactivo eficiente</li>
          <li>Computed: Solo recalcula cuando cambia</li>
          <li>&#64;if/&#64;else: Nueva sintaxis de control flow</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .ejercicio-card {
      background: #f0f8ff;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
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
      margin-bottom: 20px;
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

    input, select {
      width: 100%;
      padding: 8px 12px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #1976d2;
    }

    .error {
      color: #f44336;
      font-size: 12px;
      margin-top: 5px;
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
    }

    button[type="submit"]:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    button[type="button"] {
      background: #00bcd4;
      color: white;
    }

    .form-state, .form-values {
      background: white;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
    }

    .form-state ul {
      list-style: none;
      padding: 0;
    }

    pre {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }

    .success-box {
      background: #d4edda;
      padding: 15px;
      border-radius: 4px;
    }

    .success-box h3 {
      margin-top: 0;
      color: #155724;
    }

    .success-box ul {
      margin: 10px 0 0 0;
      padding-left: 20px;
      color: #155724;
    }
  `]
})
export class Ejercicio1FormsModerno {
  // TODO 3: Crea el FormGroup tipado
  // Usa: new FormGroup<UsuarioFormControls>({ ... })
  // Cada control debe tener { nonNullable: true, validators: [...] }
  //
  // Ejemplo para nombre:
  // nombre: new FormControl('', {
  //   nonNullable: true,
  //   validators: [Validators.required, Validators.minLength(3)]
  // }),
  //
  // Completa: email, edad, rol
  form = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    // TODO: Agregar email (required, email)
    // TODO: Agregar edad (required, min(18))
    // TODO: Agregar rol (required)
  });

  // TODO 7: Crea un signal para el estado del formulario
  // private formState = signal({
  //   valid: this.form.valid,
  //   touched: this.form.touched,
  //   dirty: this.form.dirty
  // });

  // TODO 8: Crea computed signals para el estado
  // isFormValid = computed(() => this.formState().valid);
  // isFormTouched = computed(() => this.formState().touched);
  // isFormDirty = computed(() => this.formState().dirty);

  // Placeholder temporal para que compile
  isFormValid = () => this.form.valid;
  isFormTouched = () => this.form.touched;
  isFormDirty = () => this.form.dirty;

  // TODO 9: Crea un computed para mostrar los valores
  // formValueDisplay = computed(() => {
  //   const value = this.form.getRawValue();
  //   return JSON.stringify(value, null, 2);
  // });

  // Placeholder temporal
  formValueDisplay = () => JSON.stringify(this.form.value, null, 2);

  // TODO 10: Crea computed signal para errores del nombre
  // nombreError = computed(() => {
  //   const control = this.form.controls.nombre;
  //   if (!control.invalid || !control.touched) return '';
  //   if (control.hasError('required')) return 'El nombre es requerido';
  //   if (control.hasError('minlength')) return 'Mínimo 3 caracteres';
  //   return '';
  // });

  // Placeholder temporal
  nombreError = () => '';

  // TODO 11: Crea emailError computed signal
  // Similar a nombreError pero para email
  // Errores: 'required' y 'email'
  emailError = () => '';

  // TODO 12: Crea edadError y rolError computed signals
  edadError = () => '';
  rolError = () => '';

  constructor() {
    console.log('✅ [MODERNO] Ejercicio 1 - Typed Forms + Signals inicializado');

    // TODO: Suscríbete a valueChanges y statusChanges para actualizar formState signal
  }

  // TODO 13: Implementa onSubmit
  // - Verifica form.valid
  // - Usa getRawValue() para obtener valores tipados
  // - Muestra console.log y alert
  onSubmit() {
    console.log('TODO: Implementar onSubmit con getRawValue()');
  }

  // TODO 14: Implementa resetForm
  resetForm() {
    console.log('TODO: Implementar resetForm');
  }

  // TODO 15: Implementa fillWithTestData
  // Usa setValue() con datos de prueba tipados
  fillWithTestData() {
    console.log('TODO: Implementar fillWithTestData');
  }
}
