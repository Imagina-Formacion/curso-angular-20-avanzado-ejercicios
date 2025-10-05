import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * EJERCICIO 1 - VERSIÓN CLÁSICA: FormGroup sin Tipos Fuertes
 *
 * Esta es la implementación COMPLETA del enfoque clásico.
 * Úsalo como REFERENCIA para entender cómo se hacía antes.
 *
 * Observa las limitaciones:
 * - No hay seguridad de tipos en compilación
 * - form.value puede tener valores undefined
 * - Acceso verboso con form.get('campo')?.value
 * - Sin autocompletado del IDE
 */

@Component({
  selector: 'app-ejercicio1-forms-clasico',
  standalone: false,
  template: `
    <div class="ejercicio-card">
      <h2>📋 Ejercicio 1: Formularios - Versión Clásica</h2>
      <p class="subtitle">FormGroup sin tipos fuertes</p>

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
          <div class="error" *ngIf="form.get('nombre')?.invalid && form.get('nombre')?.touched">
            El nombre es requerido (mínimo 3 caracteres)
          </div>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            placeholder="tu@email.com"
          />
          <div class="error" *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
            Email inválido
          </div>
        </div>

        <!-- Edad -->
        <div class="form-group">
          <label for="edad">Edad:</label>
          <input
            id="edad"
            type="number"
            formControlName="edad"
            placeholder="18"
          />
          <div class="error" *ngIf="form.get('edad')?.invalid && form.get('edad')?.touched">
            La edad debe ser mayor a 18
          </div>
        </div>

        <!-- Rol -->
        <div class="form-group">
          <label for="rol">Rol:</label>
          <select id="rol" formControlName="rol">
            <option value="">Selecciona un rol</option>
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
            <option value="admin">Administrador</option>
          </select>
          <div class="error" *ngIf="form.get('rol')?.invalid && form.get('rol')?.touched">
            El rol es requerido
          </div>
        </div>

        <!-- Botones -->
        <div class="button-group">
          <button type="submit" [disabled]="form.invalid">
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
        <h3>Estado del Formulario:</h3>
        <ul>
          <li><strong>Válido:</strong> {{ form.valid ? '✅' : '❌' }}</li>
          <li><strong>Tocado:</strong> {{ form.touched ? '✅' : '❌' }}</li>
          <li><strong>Sucio:</strong> {{ form.dirty ? '✅' : '❌' }}</li>
        </ul>
      </div>

      <!-- Valores del formulario -->
      <div class="form-values">
        <h3>Valores Actuales:</h3>
        <pre>{{ formValueDisplay }}</pre>
      </div>

      <!-- Problemáticas de esta aproximación -->
      <div class="info-box">
        <h3>⚠️ Limitaciones del FormGroup sin tipos:</h3>
        <ul>
          <li>No hay seguridad de tipos en compilación</li>
          <li>form.value puede tener valores undefined</li>
          <li>Acceso verboso: form.get('campo')?.value</li>
          <li>No hay autocompletado del IDE</li>
          <li>Errores solo en runtime, no en desarrollo</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .ejercicio-card {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
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
      border-color: #4CAF50;
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
      background: #4CAF50;
      color: white;
    }

    button[type="submit"]:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    button[type="button"] {
      background: #2196F3;
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

    .info-box {
      background: #fff3cd;
      padding: 15px;
      border-radius: 4px;
    }

    .info-box h3 {
      margin-top: 0;
      color: #856404;
    }

    .info-box ul {
      margin: 10px 0 0 0;
      padding-left: 20px;
      color: #856404;
    }
  `]
})
export class Ejercicio1FormsClasico {
  // FormGroup sin tipos - forma clásica
  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    edad: new FormControl('', [Validators.required, Validators.min(18)]),
    rol: new FormControl('', Validators.required)
  });

  get formValueDisplay(): string {
    return JSON.stringify(this.form.value, null, 2);
  }

  constructor() {
    console.log('🔴 [CLÁSICO] Ejercicio 1 - FormGroup inicializado');

    // Observa los cambios del formulario
    this.form.valueChanges.subscribe(values => {
      console.log('📝 [CLÁSICO] Valores:', values);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('✅ [CLÁSICO] Formulario enviado:', formData);
      alert(`Usuario registrado:\n${JSON.stringify(formData, null, 2)}`);
    }
  }

  resetForm() {
    this.form.reset();
    console.log('🔄 [CLÁSICO] Formulario reseteado');
  }

  fillWithTestData() {
    this.form.setValue({
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      edad: '25',
      rol: 'estudiante'
    });
    console.log('📋 [CLÁSICO] Formulario rellenado con datos de prueba');
  }
}
