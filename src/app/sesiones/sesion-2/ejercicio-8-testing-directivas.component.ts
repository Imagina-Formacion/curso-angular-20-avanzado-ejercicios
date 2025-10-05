// ejercicio-8-testing-directivas.component.ts
// Guía interactiva de Testing de Directivas

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ejercicio-8-testing-directivas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="exercise-container">
      <h3>🧪 Ejercicio 8: Testing de Directivas</h3>

      <div class="info-box">
        <p><strong>Por qué testear directivas:</strong></p>
        <ul>
          <li>Las directivas encapsulan lógica reutilizable</li>
          <li>Deben funcionar en múltiples contextos</li>
          <li>Los cambios pueden afectar muchos componentes</li>
          <li>Buena cobertura = confianza en refactoring</li>
        </ul>
      </div>

      <!-- ============================================ -->
      <!-- EJEMPLO 1: Testing Directiva de Atributo -->
      <!-- ============================================ -->
      <div class="test-section">
        <h4>1️⃣ Testing de Directiva de Atributo</h4>

        <div class="scenario">
          <p><strong>Directiva a testear:</strong> <code>HighlightDirective</code></p>
          <p>Cambia el color de fondo de un elemento.</p>
        </div>

        <div class="code-block">
          <div class="code-header">highlight.directive.ts</div>
          <pre>{{ highlightDirectiveCode }}</pre>
        </div>

        <div class="code-block">
          <div class="code-header">highlight.directive.spec.ts</div>
          <pre>{{ highlightTestCode }}</pre>
        </div>

        <div class="explanation">
          <p><strong>🔍 Qué se está testeando:</strong></p>
          <ul>
            <li>✅ La directiva se aplica correctamente al elemento</li>
            <li>✅ El color de fondo cambia según el input</li>
            <li>✅ Los cambios dinámicos se reflejan</li>
            <li>✅ El comportamiento es correcto con valores por defecto</li>
          </ul>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- EJEMPLO 2: Testing Directiva Estructural -->
      <!-- ============================================ -->
      <div class="test-section">
        <h4>2️⃣ Testing de Directiva Estructural</h4>

        <div class="scenario">
          <p><strong>Directiva a testear:</strong> <code>HasPermissionDirective</code></p>
          <p>Muestra/oculta contenido según permisos del usuario.</p>
        </div>

        <div class="code-block">
          <div class="code-header">has-permission.directive.spec.ts</div>
          <pre>{{ hasPermissionTestCode }}</pre>
        </div>

        <div class="explanation">
          <p><strong>🔍 Qué se está testeando:</strong></p>
          <ul>
            <li>✅ El contenido se muestra cuando hay permiso</li>
            <li>✅ El contenido se oculta cuando NO hay permiso</li>
            <li>✅ Los cambios dinámicos de permisos funcionan</li>
            <li>✅ Integración con servicios (mocking)</li>
          </ul>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- EJEMPLO 3: Testing con Signals -->
      <!-- ============================================ -->
      <div class="test-section">
        <h4>3️⃣ Testing de Directiva con Signals</h4>

        <div class="scenario">
          <p><strong>Directiva a testear:</strong> <code>TooltipModernDirective</code></p>
          <p>Directiva con signal inputs y effects.</p>
        </div>

        <div class="code-block">
          <div class="code-header">tooltip-modern.directive.spec.ts</div>
          <pre>{{ tooltipSignalTestCode }}</pre>
        </div>

        <div class="explanation">
          <p><strong>🔍 Aspectos especiales con Signals:</strong></p>
          <ul>
            <li>✅ TestBed.flushEffects() para ejecutar effects pendientes</li>
            <li>✅ fixture.detectChanges() sigue siendo necesario</li>
            <li>✅ Los signal inputs se testean igual que @Input normales</li>
            <li>✅ Effects se ejecutan asíncronamente</li>
          </ul>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- EJEMPLO 4: Testing Host Directives -->
      <!-- ============================================ -->
      <div class="test-section">
        <h4>4️⃣ Testing de Host Directives</h4>

        <div class="scenario">
          <p><strong>Directiva a testear:</strong> <code>SmartButtonDirective</code></p>
          <p>Directiva que compone múltiples directivas.</p>
        </div>

        <div class="code-block">
          <div class="code-header">smart-button.directive.spec.ts</div>
          <pre>{{ hostDirectiveTestCode }}</pre>
        </div>

        <div class="explanation">
          <p><strong>🔍 Testing de composición:</strong></p>
          <ul>
            <li>✅ Verificar que las directivas host se aplican</li>
            <li>✅ Testear inputs de directivas host</li>
            <li>✅ Verificar comportamiento combinado</li>
            <li>✅ Asegurar que no hay conflictos</li>
          </ul>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- HERRAMIENTAS Y UTILIDADES -->
      <!-- ============================================ -->
      <div class="tools-section">
        <h4>🛠️ Herramientas Útiles para Testing</h4>

        <div class="tool-grid">
          <div class="tool-card">
            <h5>By.directive()</h5>
            <p>Encuentra elementos con una directiva específica</p>
            <code>fixture.debugElement.query(By.directive(MyDirective))</code>
          </div>

          <div class="tool-card">
            <h5>By.css()</h5>
            <p>Encuentra elementos por selector CSS</p>
            <code>fixture.debugElement.query(By.css('.my-class'))</code>
          </div>

          <div class="tool-card">
            <h5>DebugElement</h5>
            <p>Wrapper de elementos del DOM para testing</p>
            <code>debugElement.nativeElement</code>
            <code>debugElement.query()</code>
            <code>debugElement.triggerEventHandler()</code>
          </div>

          <div class="tool-card">
            <h5>ComponentFixture</h5>
            <p>Wrapper del componente para testing</p>
            <code>fixture.detectChanges()</code>
            <code>fixture.componentInstance</code>
            <code>fixture.debugElement</code>
          </div>

          <div class="tool-card">
            <h5>jasmine.createSpyObj()</h5>
            <p>Crear mocks de servicios</p>
            <code>jasmine.createSpyObj('ServiceName', ['method1', 'method2'])</code>
          </div>

          <div class="tool-card">
            <h5>TestBed.configureTestingModule()</h5>
            <p>Configurar módulo de testing</p>
            <code>TestBed.configureTestingModule({{ '{' }} imports: [...] {{ '}' }})</code>
          </div>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- BUENAS PRÁCTICAS -->
      <!-- ============================================ -->
      <div class="best-practices">
        <h4>✅ Buenas Prácticas de Testing</h4>

        <div class="practice-grid">
          <div class="practice good">
            <h5>✅ Hacer</h5>
            <ul>
              <li>Testear comportamiento, no implementación</li>
              <li>Usar nombres descriptivos para los tests</li>
              <li>Un assert por test (idealmente)</li>
              <li>Mockear dependencias externas</li>
              <li>Testear casos edge (valores null, vacíos, etc.)</li>
              <li>Mantener tests simples y legibles</li>
            </ul>
          </div>

          <div class="practice bad">
            <h5>❌ Evitar</h5>
            <ul>
              <li>Tests que dependen de otros tests</li>
              <li>Tests con lógica compleja</li>
              <li>Acceso directo al DOM sin TestBed</li>
              <li>Tests que requieren timing específico</li>
              <li>Hard-coded values sin explicación</li>
              <li>Tests que fallan aleatoriamente</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- PATRÓN AAA -->
      <!-- ============================================ -->
      <div class="pattern-section">
        <h4>📐 Patrón AAA (Arrange-Act-Assert)</h4>

        <div class="code-block">
          <pre>{{ aaaPatternCode }}</pre>
        </div>

        <div class="pattern-explanation">
          <div class="pattern-step">
            <h5>1️⃣ Arrange (Preparar)</h5>
            <p>Configurar el entorno del test: crear componente, configurar datos</p>
          </div>

          <div class="pattern-step">
            <h5>2️⃣ Act (Actuar)</h5>
            <p>Ejecutar la acción que queremos testear</p>
          </div>

          <div class="pattern-step">
            <h5>3️⃣ Assert (Verificar)</h5>
            <p>Verificar que el resultado es el esperado</p>
          </div>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- COMANDOS ÚTILES -->
      <!-- ============================================ -->
      <div class="commands-section">
        <h4>⌨️ Comandos Útiles</h4>

        <div class="command-list">
          <div class="command">
            <code>npm test</code>
            <p>Ejecutar todos los tests</p>
          </div>

          <div class="command">
            <code>npm test -- --include='**/highlight.directive.spec.ts'</code>
            <p>Ejecutar un test específico</p>
          </div>

          <div class="command">
            <code>npm test -- --code-coverage</code>
            <p>Ver cobertura de código</p>
          </div>

          <div class="command">
            <code>ng test --watch=false</code>
            <p>Ejecutar tests sin watch mode</p>
          </div>

          <div class="command">
            <code>ng test --browsers=ChromeHeadless</code>
            <p>Ejecutar en modo headless (CI/CD)</p>
          </div>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- MÉTRICAS DE COBERTURA -->
      <!-- ============================================ -->
      <div class="coverage-section">
        <h4>📊 Métricas de Cobertura</h4>

        <table>
          <thead>
            <tr>
              <th>Métrica</th>
              <th>Descripción</th>
              <th>Meta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Statements</strong></td>
              <td>% de líneas de código ejecutadas</td>
              <td>>80%</td>
            </tr>
            <tr>
              <td><strong>Branches</strong></td>
              <td>% de ramas (if/else) cubiertas</td>
              <td>>80%</td>
            </tr>
            <tr>
              <td><strong>Functions</strong></td>
              <td>% de funciones ejecutadas</td>
              <td>>80%</td>
            </tr>
            <tr>
              <td><strong>Lines</strong></td>
              <td>% de líneas cubiertas</td>
              <td>>80%</td>
            </tr>
          </tbody>
        </table>

        <div class="coverage-note">
          <p>💡 <strong>Nota:</strong> 100% de cobertura NO garantiza que no haya bugs.
          Es más importante testear casos de uso reales y edge cases.</p>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- RECURSOS -->
      <!-- ============================================ -->
      <div class="resources-section">
        <h4>📚 Recursos Adicionales</h4>

        <ul>
          <li>
            <a href="https://angular.dev/guide/testing" target="_blank">
              📖 Angular Testing Guide (Oficial)
            </a>
          </li>
          <li>
            <a href="https://testing-library.com/docs/angular-testing-library/intro/" target="_blank">
              🧪 Angular Testing Library
            </a>
          </li>
          <li>
            <a href="https://jasmine.github.io/" target="_blank">
              ☕ Jasmine Documentation
            </a>
          </li>
          <li>
            <a href="https://karma-runner.github.io/" target="_blank">
              🔄 Karma Test Runner
            </a>
          </li>
        </ul>
      </div>

      <div class="final-note">
        <h4>🎯 Conclusión</h4>
        <p>
          El testing de directivas es esencial para mantener código robusto y confiable.
          Aunque requiere tiempo inicial, ahorra horas de debugging y previene regresiones.
        </p>
        <p>
          <strong>Recuerda:</strong> Los tests son documentación viva de cómo deben funcionar tus directivas.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .exercise-container {
      padding: 20px;
      font-family: Arial, sans-serif;
      max-width: 1400px;
      margin: 0 auto;
    }
    .info-box {
      background: #e7f3ff;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .test-section {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border: 1px solid #ddd;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .test-section h4 {
      margin-top: 0;
      color: #198754;
    }
    .scenario {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
      margin: 15px 0;
    }
    .scenario code {
      background: #fff;
      padding: 3px 8px;
      border-radius: 3px;
      color: #d63384;
    }
    .code-block {
      background: #2d2d2d;
      border-radius: 8px;
      margin: 15px 0;
      overflow: hidden;
    }
    .code-header {
      background: #1a1a1a;
      color: #fff;
      padding: 10px 15px;
      font-family: monospace;
      font-size: 12px;
      border-bottom: 1px solid #444;
    }
    .code-block pre {
      color: #f8f9fa;
      padding: 15px;
      margin: 0;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      line-height: 1.6;
      overflow-x: auto;
    }
    .explanation {
      background: #d1e7dd;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .tools-section, .best-practices, .pattern-section, .commands-section, .coverage-section, .resources-section {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .tool-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 15px;
      margin: 15px 0;
    }
    .tool-card {
      background: #fff;
      padding: 15px;
      border-radius: 8px;
    }
    .tool-card h5 {
      margin-top: 0;
      color: #0d6efd;
    }
    .tool-card code {
      display: block;
      background: #f8f9fa;
      padding: 5px 10px;
      border-radius: 4px;
      margin: 5px 0;
      font-size: 11px;
      word-break: break-all;
    }
    .practice-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 15px 0;
    }
    .practice {
      padding: 15px;
      border-radius: 8px;
    }
    .practice.good {
      background: #d1e7dd;
    }
    .practice.bad {
      background: #f8d7da;
    }
    .practice h5 {
      margin-top: 0;
    }
    .practice ul {
      margin-left: 20px;
    }
    .practice li {
      margin: 8px 0;
    }
    .pattern-explanation {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin: 15px 0;
    }
    .pattern-step {
      background: #fff;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }
    .pattern-step h5 {
      color: #0d6efd;
      margin-bottom: 10px;
    }
    .command-list {
      display: grid;
      gap: 15px;
      margin: 15px 0;
    }
    .command {
      background: #fff;
      padding: 15px;
      border-radius: 8px;
    }
    .command code {
      display: block;
      background: #2d2d2d;
      color: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 8px;
      font-family: monospace;
    }
    .command p {
      margin: 0;
      color: #6c757d;
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
    .coverage-note {
      background: #fff3cd;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .resources-section ul {
      list-style: none;
      padding: 0;
    }
    .resources-section li {
      margin: 10px 0;
    }
    .resources-section a {
      color: #0d6efd;
      text-decoration: none;
      display: block;
      padding: 10px;
      background: #fff;
      border-radius: 4px;
    }
    .resources-section a:hover {
      background: #e7f3ff;
    }
    .final-note {
      background: #d1e7dd;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .final-note h4 {
      margin-top: 0;
      color: #198754;
    }
  `]
})
export class Ejercicio8TestingDirectivasComponent {
  highlightDirectiveCode = `@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() highlightColor = 'yellow';

  @HostBinding('style.backgroundColor')
  get backgroundColor() {
    return this.highlightColor;
  }
}`;

  highlightTestCode = `describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));
  });

  it('should have one highlighted element', () => {
    expect(des.length).toBe(1);
  });

  it('should color first <p> background "yellow"', () => {
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  it('should change color when input changes', () => {
    fixture.componentInstance.color = 'red';
    fixture.detectChanges();

    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('red');
  });
});`;

  hasPermissionTestCode = `describe('HasPermissionDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let mockPermissionService: jasmine.SpyObj<PermissionService>;

  beforeEach(() => {
    mockPermissionService = jasmine.createSpyObj('PermissionService',
      ['hasPermission']
    );

    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        { provide: PermissionService, useValue: mockPermissionService }
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should show element when permission is granted', () => {
    mockPermissionService.hasPermission.and.returnValue(true);
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('div');
    expect(element).toBeTruthy();
    expect(element.textContent).toContain('Admin Content');
  });

  it('should hide element when permission is denied', () => {
    mockPermissionService.hasPermission.and.returnValue(false);
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('div');
    expect(element).toBeFalsy();
  });
});`;

  tooltipSignalTestCode = `describe('TooltipModernDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: TooltipModernDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestComponent]
    }).createComponent(TestComponent);

    const directiveEl = fixture.debugElement.query(
      By.directive(TooltipModernDirective)
    );
    directive = directiveEl.injector.get(TooltipModernDirective);
  });

  it('should set tooltip text via signal input', () => {
    fixture.componentInstance.tooltipText = 'New tooltip';
    fixture.detectChanges();
    TestBed.flushEffects(); // ⚠️ Importante para Signals

    expect(directive.tooltip()).toBe('New tooltip');
  });

  it('should trigger effect when tooltip changes', () => {
    spyOn(console, 'log');

    fixture.componentInstance.tooltipText = 'Changed';
    fixture.detectChanges();
    TestBed.flushEffects();

    expect(console.log).toHaveBeenCalledWith(
      'Tooltip changed:', 'Changed'
    );
  });
});`;

  hostDirectiveTestCode = `describe('SmartButtonDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let buttonEl: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestComponent]
    }).createComponent(TestComponent);

    buttonEl = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should apply tooltip from host directive', () => {
    const title = buttonEl.nativeElement.getAttribute('title');
    expect(title).toBe('Click me');
  });

  it('should apply loading state from host directive', () => {
    fixture.componentInstance.isLoading = true;
    fixture.detectChanges();

    const opacity = buttonEl.nativeElement.style.opacity;
    expect(opacity).toBe('0.5');
  });

  it('should track clicks via host directive', () => {
    spyOn(console, 'log');

    buttonEl.nativeElement.click();

    expect(console.log).toHaveBeenCalledWith(
      'Analytics tracked: button-click'
    );
  });
});`;

  aaaPatternCode = `it('should calculate total price correctly', () => {
  // ===== ARRANGE (Preparar) =====
  const component = new ShoppingCartComponent();
  component.items = [
    { id: 1, price: 10, quantity: 2 },
    { id: 2, price: 20, quantity: 1 }
  ];

  // ===== ACT (Actuar) =====
  const total = component.calculateTotal();

  // ===== ASSERT (Verificar) =====
  expect(total).toBe(40); // (10*2) + (20*1) = 40
});`;

  constructor() {
    console.log('🧪 Ejercicio 8 - Testing de Directivas inicializado');
  }
}
