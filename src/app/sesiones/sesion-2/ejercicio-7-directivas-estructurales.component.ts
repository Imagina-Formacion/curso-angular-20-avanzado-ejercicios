// ejercicio-7-directivas-estructurales.component.ts
// Directivas estructurales personalizadas: *repeat, *hasRole, *defer

import { Component, Directive, Input, TemplateRef, ViewContainerRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// ===========================================
// DIRECTIVA 1: *repeat - Repetir N veces
// ===========================================
@Directive({
  selector: '[repeat]',
  standalone: true
})
export class RepeatDirective {
  @Input() set repeat(times: number) {
    // Limpiar vistas previas
    this.viewContainer.clear();

    // Crear N vistas
    for (let i = 0; i < times; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: i,          // Valor por defecto (let item)
        index: i,              // let i = index
        count: times,          // let total = count
        first: i === 0,        // let isFirst = first
        last: i === times - 1, // let isLast = last
        even: i % 2 === 0,     // let isEven = even
        odd: i % 2 !== 0       // let isOdd = odd
      });
    }

    console.log(`✅ [repeat] Creadas ${times} vistas`);
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}

// ===========================================
// DIRECTIVA 2: *hasRole - Control de permisos
// ===========================================
@Directive({
  selector: '[hasRole]',
  standalone: true
})
export class HasRoleDirective {
  private hasView = false;

  @Input() set hasRole(role: string) {
    // Simular servicio de auth (en producción sería un servicio inyectado)
    const currentUserRole = this.getCurrentUserRole();

    const hasPermission = currentUserRole === role || currentUserRole === 'admin';

    if (hasPermission && !this.hasView) {
      // Mostrar vista
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
      console.log(`✅ [hasRole] Vista mostrada para rol: ${role}`);
    } else if (!hasPermission && this.hasView) {
      // Ocultar vista
      this.viewContainer.clear();
      this.hasView = false;
      console.log(`❌ [hasRole] Vista ocultada para rol: ${role}`);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  private getCurrentUserRole(): string {
    // Simular usuario actual (en producción vendría de AuthService)
    return 'user'; // Cambiar a 'admin' o 'guest' para probar
  }
}

// ===========================================
// DIRECTIVA 3: *defer - Carga diferida
// ===========================================
@Directive({
  selector: '[defer]',
  standalone: true
})
export class DeferDirective {
  @Input() set defer(delay: number) {
    console.log(`⏳ [defer] Esperando ${delay}ms antes de renderizar...`);

    setTimeout(() => {
      this.viewContainer.createEmbeddedView(this.templateRef);
      console.log(`✅ [defer] Vista renderizada después de ${delay}ms`);
    }, delay);
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}

// ===========================================
// DIRECTIVA 4: *loading - Mostrar mientras carga
// ===========================================
@Directive({
  selector: '[loading]',
  standalone: true
})
export class LoadingDirective {
  private hasView = false;

  @Input() set loading(isLoading: boolean) {
    if (isLoading && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
      console.log('⏳ [loading] Mostrando indicador de carga');
    } else if (!isLoading && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
      console.log('✅ [loading] Ocultando indicador de carga');
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}

// ===========================================
// COMPONENTE PRINCIPAL
// ===========================================
@Component({
  selector: 'app-ejercicio-7-directivas-estructurales',
  standalone: true,
  imports: [CommonModule, RepeatDirective, HasRoleDirective, DeferDirective, LoadingDirective],
  template: `
    <div class="exercise-container">
      <h3>🎯 Ejercicio 7: Directivas Estructurales Personalizadas</h3>

      <div class="info-box">
        <p><strong>Qué son las Directivas Estructurales:</strong></p>
        <ul>
          <li>Modifican la estructura del DOM</li>
          <li>Pueden agregar, quitar o manipular elementos</li>
          <li>Usan TemplateRef y ViewContainerRef</li>
          <li>Se reconocen por el asterisco (*)</li>
        </ul>
      </div>

      <!-- ============================================ -->
      <!-- EJEMPLO 1: *repeat -->
      <!-- ============================================ -->
      <div class="example-section">
        <h4>1️⃣ Directiva *repeat - Repetir N veces</h4>

        <div class="controls">
          <label>
            Repetir:
            <input
              type="number"
              [value]="repeatCount()"
              (input)="repeatCount.set(+$any($event.target).value)"
              min="1"
              max="10"
            />
            veces
          </label>
        </div>

        <div class="demo-output">
          <div *repeat="repeatCount(); let i = index; let total = count; let isFirst = first; let isLast = last">
            <div class="repeat-item"
                 [class.first]="isFirst"
                 [class.last]="isLast">
              🔢 Item {{ i + 1 }} de {{ total }}
              @if (isFirst) { <span class="badge">Primero</span> }
              @if (isLast) { <span class="badge">Último</span> }
            </div>
          </div>
        </div>

        <div class="code-explanation">
          <p><strong>Sintaxis:</strong></p>
          <code>&lt;div *repeat="5; let i = index; let total = count"&gt;</code>
          <p><strong>Variables disponibles:</strong> $implicit, index, count, first, last, even, odd</p>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- EJEMPLO 2: *hasRole -->
      <!-- ============================================ -->
      <div class="example-section">
        <h4>2️⃣ Directiva *hasRole - Control de Permisos</h4>

        <div class="info-text">
          <p><strong>Usuario actual:</strong> <span class="badge">user</span></p>
          <p class="hint">💡 Cambia el rol en getCurrentUserRole() del código para probar</p>
        </div>

        <div class="demo-output">
          <div *hasRole="'admin'" class="permission-box admin">
            <h5>🔐 Panel de Administrador</h5>
            <p>Solo visible para administradores</p>
          </div>

          <div *hasRole="'user'" class="permission-box user">
            <h5>👤 Panel de Usuario</h5>
            <p>Visible para usuarios normales</p>
          </div>

          <div *hasRole="'guest'" class="permission-box guest">
            <h5>👋 Panel de Invitado</h5>
            <p>Solo visible para invitados</p>
          </div>
        </div>

        <div class="code-explanation">
          <p><strong>Sintaxis:</strong></p>
          <code>&lt;div *hasRole="'admin'"&gt;Contenido protegido&lt;/div&gt;</code>
          <p><strong>Uso:</strong> Control de acceso basado en roles (RBAC)</p>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- EJEMPLO 3: *defer -->
      <!-- ============================================ -->
      <div class="example-section">
        <h4>3️⃣ Directiva *defer - Carga Diferida</h4>

        <div class="controls">
          <button (click)="reloadDefer()" class="btn">🔄 Recargar Ejemplos</button>
        </div>

        @if (showDefer()) {
          <div class="demo-output">
            <div *defer="500" class="deferred-item">
              ⏱️ Este contenido aparece después de 500ms
            </div>

            <div *defer="1000" class="deferred-item">
              ⏱️ Este contenido aparece después de 1000ms
            </div>

            <div *defer="1500" class="deferred-item">
              ⏱️ Este contenido aparece después de 1500ms
            </div>
          </div>
        } @else {
          <div class="loading-state">Esperando recarga...</div>
        }

        <div class="code-explanation">
          <p><strong>Sintaxis:</strong></p>
          <code>&lt;div *defer="1000"&gt;Contenido diferido&lt;/div&gt;</code>
          <p><strong>Uso:</strong> Optimización de carga inicial, lazy loading de componentes pesados</p>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- EJEMPLO 4: *loading -->
      <!-- ============================================ -->
      <div class="example-section">
        <h4>4️⃣ Directiva *loading - Indicador de Carga</h4>

        <div class="controls">
          <button (click)="simulateLoading()" class="btn">📥 Simular Carga de Datos</button>
        </div>

        <div class="demo-output">
          <div *loading="isLoading()" class="loading-indicator">
            <div class="spinner"></div>
            <p>Cargando datos...</p>
          </div>

          @if (!isLoading()) {
            <div class="content-loaded">
              <h5>✅ Datos Cargados</h5>
              <p>{{ loadedData() }}</p>
            </div>
          }
        </div>

        <div class="code-explanation">
          <p><strong>Sintaxis:</strong></p>
          <code>&lt;div *loading="isLoading"&gt;Cargando...&lt;/div&gt;</code>
          <p><strong>Uso:</strong> Mostrar indicadores de carga condicionalmente</p>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- COMPARATIVA CON BUILT-IN -->
      <!-- ============================================ -->
      <div class="comparison-section">
        <h4>⚖️ Comparativa: Custom vs Built-in</h4>

        <table>
          <thead>
            <tr>
              <th>Custom Directive</th>
              <th>Built-in Equivalente</th>
              <th>Ventaja Custom</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>*repeat="5"</code></td>
              <td><code>&#64;for (let i of [0,1,2,3,4])</code></td>
              <td>Más simple para casos básicos</td>
            </tr>
            <tr>
              <td><code>*hasRole="'admin'"</code></td>
              <td><code>&#64;if (user.role === 'admin')</code></td>
              <td>Encapsula lógica de permisos</td>
            </tr>
            <tr>
              <td><code>*defer="1000"</code></td>
              <td><code>&#64;defer (on timer(1000ms))</code></td>
              <td>Sintaxis más concisa</td>
            </tr>
            <tr>
              <td><code>*loading="isLoading"</code></td>
              <td><code>&#64;if (isLoading)</code></td>
              <td>Semántica más clara</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ============================================ -->
      <!-- ANATOMÍA DE UNA DIRECTIVA ESTRUCTURAL -->
      <!-- ============================================ -->
      <div class="anatomy-section">
        <h4>🔬 Anatomía de una Directiva Estructural</h4>

        <div class="code-block">
          <pre>@Directive({{ '{' }}
  selector: '[myDirective]',
  standalone: true
{{ '}' }})
export class MyDirective {{ '{' }}
  @Input() set myDirective(condition: boolean) {{ '{' }}
    if (condition) {{ '{' }}
      // Crear vista
      this.viewContainer.createEmbeddedView(this.templateRef);
    {{ '}' }} else {{ '{' }}
      // Eliminar vista
      this.viewContainer.clear();
    {{ '}' }}
  {{ '}' }}

  constructor(
    private templateRef: TemplateRef&lt;any&gt;,
    private viewContainer: ViewContainerRef
  ) {{ '{' }}{{ '}' }}
{{ '}' }}</pre>
        </div>

        <div class="key-concepts">
          <p><strong>Conceptos clave:</strong></p>
          <ul>
            <li><code>TemplateRef</code>: Referencia al template (ng-template)</li>
            <li><code>ViewContainerRef</code>: Contenedor donde se insertan vistas</li>
            <li><code>createEmbeddedView()</code>: Crea una instancia del template</li>
            <li><code>clear()</code>: Elimina todas las vistas del contenedor</li>
          </ul>
        </div>
      </div>

      <div class="tips-section">
        <h4>💡 Tips y Buenas Prácticas</h4>
        <ul>
          <li>✅ Usa directivas estructurales para lógica de UI reutilizable</li>
          <li>✅ Nombra claramente: *hasPermission, *isLoading, *repeat</li>
          <li>✅ Provee contexto útil a las variables del template</li>
          <li>✅ Considera usar &#64;if/&#64;for si no necesitas reutilización</li>
          <li>⚠️ No abuses: muchas directivas estructurales complican el código</li>
          <li>⚠️ Documenta las variables disponibles del contexto</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .exercise-container {
      padding: 20px;
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
    }
    .info-box {
      background: #e7f3ff;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .example-section {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border: 1px solid #ddd;
    }
    .example-section h4 {
      margin-top: 0;
      color: #0d6efd;
    }
    .controls {
      margin: 15px 0;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 4px;
    }
    .controls label {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .controls input[type="number"] {
      padding: 5px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 80px;
    }
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background: #0d6efd;
      color: white;
      cursor: pointer;
      font-size: 14px;
    }
    .btn:hover {
      background: #0b5ed7;
    }
    .demo-output {
      margin: 15px 0;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      min-height: 60px;
    }
    .repeat-item {
      padding: 10px;
      margin: 5px 0;
      background: #fff;
      border: 2px solid #ddd;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .repeat-item.first {
      border-color: #198754;
      background: #d1e7dd;
    }
    .repeat-item.last {
      border-color: #dc3545;
      background: #f8d7da;
    }
    .badge {
      padding: 3px 8px;
      background: #0d6efd;
      color: white;
      border-radius: 3px;
      font-size: 11px;
      font-weight: 600;
    }
    .permission-box {
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
    }
    .permission-box.admin {
      background: #fff3cd;
      border-color: #ffc107;
    }
    .permission-box.user {
      background: #d1e7dd;
      border-color: #198754;
    }
    .permission-box.guest {
      background: #cfe2ff;
      border-color: #0d6efd;
    }
    .deferred-item {
      padding: 15px;
      margin: 10px 0;
      background: #d1e7dd;
      border-radius: 8px;
      animation: fadeIn 0.5s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .loading-state {
      padding: 20px;
      text-align: center;
      color: #6c757d;
    }
    .loading-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 30px;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #0d6efd;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .content-loaded {
      padding: 20px;
      background: #d1e7dd;
      border-radius: 8px;
    }
    .code-explanation {
      margin-top: 15px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 4px;
    }
    .code-explanation code {
      background: #fff;
      padding: 3px 8px;
      border-radius: 3px;
      color: #d63384;
      font-size: 13px;
    }
    .hint {
      font-size: 13px;
      color: #6c757d;
    }
    .info-text {
      background: #cfe2ff;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
    }
    .comparison-section, .anatomy-section {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
      margin: 15px 0;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border: 1px solid #ddd;
    }
    th {
      background: #0d6efd;
      color: white;
      font-weight: 600;
    }
    td code {
      background: #f8f9fa;
      padding: 2px 6px;
      border-radius: 3px;
      color: #d63384;
    }
    .code-block {
      background: #2d2d2d;
      color: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
      overflow-x: auto;
    }
    .code-block pre {
      margin: 0;
      font-family: 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.5;
    }
    .key-concepts {
      background: #fff;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .key-concepts code {
      background: #f8f9fa;
      padding: 2px 6px;
      border-radius: 3px;
      color: #d63384;
    }
    .tips-section {
      background: #d1e7dd;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .tips-section ul {
      margin-left: 20px;
    }
    .tips-section li {
      margin: 8px 0;
    }
  `]
})
export class Ejercicio7DirectivasEstructuralesComponent {
  // Signals para ejemplos interactivos
  repeatCount = signal(3);
  showDefer = signal(true);
  isLoading = signal(false);
  loadedData = signal('');

  constructor() {
    console.log('🎯 Ejercicio 7 - Directivas Estructurales inicializado');
  }

  reloadDefer() {
    this.showDefer.set(false);
    setTimeout(() => {
      this.showDefer.set(true);
      console.log('🔄 Ejemplos de defer recargados');
    }, 100);
  }

  simulateLoading() {
    this.isLoading.set(true);
    this.loadedData.set('');
    console.log('📥 Iniciando carga...');

    setTimeout(() => {
      this.loadedData.set('Lista de usuarios: Juan, María, Pedro, Ana');
      this.isLoading.set(false);
      console.log('✅ Carga completada');
    }, 2000);
  }
}
