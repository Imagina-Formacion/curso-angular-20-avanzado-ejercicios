import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * EJERCICIO 4 - VERSIÓN CLÁSICA: FormArray Dinámico
 *
 * Esta es la implementación COMPLETA del enfoque clásico.
 * Muestra cómo manejar arrays dinámicos de controles.
 *
 * Características:
 * - FormArray para lista dinámica de items
 * - Agregar y eliminar controles dinámicamente
 * - Validaciones en cada item del array
 */

@Component({
  selector: 'app-ejercicio4-formarray-clasico',
  standalone: false,
  template: `
    <div class="ejercicio-card">
      <h2>📝 Ejercicio 4: FormArray - Versión Clásica</h2>
      <p class="subtitle">Arrays dinámicos de formularios</p>

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
          <div class="error" *ngIf="form.get('nombreCurso')?.invalid && form.get('nombreCurso')?.touched">
            El nombre del curso es requerido
          </div>
        </div>

        <!-- Lista de Estudiantes (FormArray) -->
        <div class="array-section">
          <h3>
            Estudiantes ({{ estudiantes.length }})
            <button type="button" class="btn-add" (click)="agregarEstudiante()">
              + Agregar Estudiante
            </button>
          </h3>

          <div formArrayName="estudiantes">
            <div *ngFor="let estudiante of estudiantes.controls; let i = index"
                 [formGroupName]="i"
                 class="array-item">
              <div class="array-item-header">
                <span>Estudiante #{{ i + 1 }}</span>
                <button type="button" class="btn-remove" (click)="eliminarEstudiante(i)">
                  ✕ Eliminar
                </button>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    formControlName="nombre"
                    placeholder="Nombre completo"
                  />
                  <div class="error" *ngIf="estudiante.get('nombre')?.invalid && estudiante.get('nombre')?.touched">
                    Requerido
                  </div>
                </div>

                <div class="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    formControlName="email"
                    placeholder="email@ejemplo.com"
                  />
                  <div class="error" *ngIf="estudiante.get('email')?.invalid && estudiante.get('email')?.touched">
                    Email inválido
                  </div>
                </div>

                <div class="form-group">
                  <label>Nota:</label>
                  <input
                    type="number"
                    formControlName="nota"
                    placeholder="0-10"
                    min="0"
                    max="10"
                  />
                  <div class="error" *ngIf="estudiante.get('nota')?.invalid && estudiante.get('nota')?.touched">
                    0-10
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="estudiantes.length === 0" class="empty-state">
              No hay estudiantes. Haz clic en "+ Agregar Estudiante" para comenzar.
            </div>
          </div>
        </div>

        <!-- Botones -->
        <div class="button-group">
          <button type="submit" [disabled]="form.invalid">
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

      <!-- Resumen -->
      <div class="summary">
        <h3>Resumen:</h3>
        <ul>
          <li><strong>Válido:</strong> {{ form.valid ? '✅' : '❌' }}</li>
          <li><strong>Total estudiantes:</strong> {{ estudiantes.length }}</li>
          <li><strong>Estudiantes válidos:</strong> {{ estudiantesValidos }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .ejercicio-card {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 20px;
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
      border-color: #4CAF50;
    }

    .error {
      color: #f44336;
      font-size: 12px;
      margin-top: 5px;
    }

    .array-section {
      margin: 20px 0;
      padding: 15px;
      background: #f9f9f9;
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
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
    }

    .btn-add:hover {
      background: #45a049;
    }

    .array-item {
      background: white;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 8px;
      border: 2px solid #ddd;
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
      background: #4CAF50;
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
      background: #2196F3;
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
export class Ejercicio4FormArrayClasico {
  form = new FormGroup({
    nombreCurso: new FormControl('', Validators.required),
    estudiantes: new FormArray<FormGroup>([])
  });

  get estudiantes(): FormArray {
    return this.form.get('estudiantes') as FormArray;
  }

  get estudiantesValidos(): number {
    return this.estudiantes.controls.filter(c => c.valid).length;
  }

  constructor() {
    console.log('🔴 [CLÁSICO] Ejercicio 4 - FormArray inicializado');
  }

  agregarEstudiante() {
    const estudianteGroup = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      nota: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(10)])
    });

    this.estudiantes.push(estudianteGroup);
    console.log('➕ Estudiante agregado. Total:', this.estudiantes.length);
  }

  eliminarEstudiante(index: number) {
    this.estudiantes.removeAt(index);
    console.log('➖ Estudiante eliminado. Total:', this.estudiantes.length);
  }

  onSubmit() {
    if (this.form.valid) {
      const data = this.form.value;
      console.log('✅ [CLÁSICO] Curso guardado:', data);
      alert(`Curso "${data.nombreCurso}" guardado con ${data.estudiantes?.length} estudiantes`);
    }
  }

  resetForm() {
    this.form.reset();
    this.estudiantes.clear();
    console.log('🔄 [CLÁSICO] Formulario reseteado');
  }

  fillWithTestData() {
    this.form.patchValue({
      nombreCurso: 'Angular 20 Avanzado'
    });

    // Limpiar estudiantes existentes
    this.estudiantes.clear();

    // Agregar 3 estudiantes de prueba
    const estudiantesPrueba = [
      { nombre: 'Juan Pérez', email: 'juan@example.com', nota: 8.5 },
      { nombre: 'María García', email: 'maria@example.com', nota: 9.0 },
      { nombre: 'Carlos López', email: 'carlos@example.com', nota: 7.5 }
    ];

    estudiantesPrueba.forEach(est => {
      const group = new FormGroup({
        nombre: new FormControl(est.nombre, Validators.required),
        email: new FormControl(est.email, [Validators.required, Validators.email]),
        nota: new FormControl(est.nota, [Validators.required, Validators.min(0), Validators.max(10)])
      });
      this.estudiantes.push(group);
    });

    console.log('📋 [CLÁSICO] Formulario rellenado con datos de prueba');
  }
}
