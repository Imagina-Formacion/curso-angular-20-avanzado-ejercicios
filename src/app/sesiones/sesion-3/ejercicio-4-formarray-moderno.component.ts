import { Component, computed, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * EJERCICIO 4 - VERSIÓN MODERNA: FormArray Tipado + Signals
 *
 * 🎯 TU OBJETIVO:
 * Implementar FormArray tipado combinado con Signals para gestión
 * reactiva de arrays dinámicos de formularios.
 *
 * 📝 TAREAS:
 * 1. Definir interfaces y tipos (TODO 1-2)
 * 2. Crear FormGroup tipado con FormArray (TODO 3)
 * 3. Implementar signals para estado reactivo (TODO 4-6)
 * 4. Completar template con @for (TODO 7-9)
 * 5. Implementar métodos del componente (TODO 10-14)
 */

// TODO 1: Define la interfaz para un estudiante
// interface Estudiante {
//   nombre: string;
//   email: string;
//   nota: number;
// }

// TODO 2: Define la interfaz del formulario completo
// interface CursoForm {
//   nombreCurso: string;
//   estudiantes: Estudiante[];
// }

@Component({
  selector: 'app-ejercicio4-formarray-moderno',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="ejercicio-card">
      <h2>✨ Ejercicio 4: FormArray - Versión Moderna</h2>
      <p class="subtitle">FormArray Tipado + Signals - ¡Completa los TODOs!</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <!-- Nombre del curso -->
        <div class="form-group">
          <label for="nombreCurso">Nombre del Curso:</label>
          <input
            id="nombreCurso"
            type="text"
            formControlName="nombreCurso"
            placeholder="Angular Avanzado"
          />
          @if (nombreCursoError()) {
            <div class="error">{{ nombreCursoError() }}</div>
          }
        </div>

        <!-- TODO 7: Implementa la sección de estudiantes usando @for
          - Usa formArrayName="estudiantes"
          - Itera sobre estudiantesArray().controls con @for
          - Usa [formGroupName]="i" para cada estudiante
          - Muestra campos: nombre, email, nota
          - Botón para eliminar cada estudiante
          - Usa @empty para mostrar estado vacío
        -->
        <div class="array-section">
          <h3>
            Estudiantes ({{ totalEstudiantes() }})
            <button type="button" class="btn-add" (click)="agregarEstudiante()">
              + Agregar Estudiante
            </button>
          </h3>

          <!-- TODO: Implementar FormArray aquí -->
          <div class="empty-state">
            TODO: Implementar lista de estudiantes con &#64;for
          </div>
        </div>

        <!-- Botones -->
        <div class="button-group">
          <button type="submit" [disabled]="!isFormValid()">
            Guardar Curso
          </button>
          <button type="button" (click)="resetForm()">
            Resetear
          </button>
          <button type="button" (click)="fillWithTestData()">
            Datos de Prueba
          </button>
        </div>
      </form>

      <!-- TODO 8: Agrega sección de resumen con signals
        Muestra: isFormValid(), totalEstudiantes(), estudiantesValidos()
      -->

      <!-- TODO 9: Agrega sección que muestre los valores actuales del formulario
        Usa formValues() signal
      -->
    </div>
  `,
  styles: [`
    .ejercicio-card {
      background: #f0f8ff;
      border-radius: 8px;
      padding: 20px;
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
      flex: 1;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
      color: #333;
      font-size: 14px;
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

    .array-section {
      margin: 20px 0;
      padding: 15px;
      background: #f0f8ff;
      border-radius: 8px;
    }

    .array-section h3 {
      margin-top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .btn-add {
      padding: 8px 16px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
    }

    .btn-add:hover {
      background: #1565c0;
    }

    .array-item {
      background: white;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 8px;
      border: 2px solid #1976d2;
    }

    .array-item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }

    .array-item-header span {
      font-weight: 600;
      color: #333;
    }

    .btn-remove {
      padding: 6px 12px;
      background: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }

    .btn-remove:hover {
      background: #da190b;
    }

    .form-row {
      display: grid;
      grid-template-columns: 2fr 2fr 1fr;
      gap: 15px;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #999;
      font-style: italic;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    button[type="submit"] {
      padding: 10px 20px;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      flex: 1;
    }

    button[type="submit"]:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    button[type="button"] {
      padding: 10px 20px;
      background: #00bcd4;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }

    .summary {
      background: white;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
    }

    .summary h3 {
      margin-top: 0;
    }

    .summary ul {
      list-style: none;
      padding: 0;
      margin: 10px 0 0 0;
    }
  `]
})
export class Ejercicio4FormArrayModerno {
  // TODO 3: Crea el FormGroup tipado
  // Debe incluir:
  // - nombreCurso: FormControl<string> con validators required
  // - estudiantes: FormArray<FormGroup> tipado
  // Pista: Usa new FormArray<FormGroup<...>>([])
  form = new FormGroup({
    nombreCurso: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    // TODO: Agregar FormArray de estudiantes aquí
  });

  // TODO 4: Crea signal para el estado del formulario
  // private formState = signal({
  //   valid: this.form.valid,
  //   estudiantesCount: 0
  // });

  // TODO 5: Crea computed signals para acceso al FormArray y estado
  // estudiantesArray = computed(() => this.form.get('estudiantes') as FormArray);
  // totalEstudiantes = computed(() => this.formState().estudiantesCount);
  // isFormValid = computed(() => this.formState().valid);

  // Placeholders temporales
  totalEstudiantes = signal(0);
  isFormValid = () => this.form.valid;

  estudiantesArray = () => this.form.get('estudiantes') as unknown as FormArray<any>;

  // TODO 6: Crea computed signals para validaciones y valores
  // nombreCursoError = computed(() => { ... })
  // estudiantesValidos = computed(() => { ... cuenta cuántos estudiantes son válidos ... })
  // formValues = computed(() => this.form.getRawValue())
  nombreCursoError = computed(() => '');
  estudiantesValidos = computed(() => 0);

  constructor() {
    console.log('✅ [MODERNO] Ejercicio 4 - FormArray Tipado + Signals inicializado');

    // TODO: Suscríbete a valueChanges y statusChanges para actualizar formState signal
  }

  // TODO 10: Implementa agregarEstudiante()
  // - Crea un nuevo FormGroup con campos tipados (nombre, email, nota)
  // - Agrega al FormArray con this.estudiantesArray().push(...)
  // - Actualiza formState signal
  agregarEstudiante() {
    console.log('TODO: Implementar agregarEstudiante');
  }

  // TODO 11: Implementa eliminarEstudiante(index: number)
  // - Elimina del FormArray con removeAt()
  // - Actualiza formState signal
  eliminarEstudiante(index: number) {
    console.log('TODO: Implementar eliminarEstudiante', index);
  }

  // TODO 12: Implementa onSubmit()
  // - Verifica que el formulario sea válido
  // - Obtén los valores con getRawValue()
  // - Muestra console.log y alert
  onSubmit() {
    console.log('TODO: Implementar onSubmit');
  }

  // TODO 13: Implementa resetForm()
  // - Reset del formulario
  // - Clear del FormArray
  // - Actualiza formState signal
  resetForm() {
    console.log('TODO: Implementar resetForm');
  }

  // TODO 14: Implementa fillWithTestData()
  // - Establece nombreCurso
  // - Clear del FormArray
  // - Agrega 3 estudiantes de prueba
  // - Actualiza formState signal
  fillWithTestData() {
    console.log('TODO: Implementar fillWithTestData');
  }
}
