// ejercicio-5-host-directives-clasico.component.ts
// VERSIÓN CLÁSICA: Sin Host Directives - código repetitivo

import { Component, Directive, HostListener, HostBinding, Input } from '@angular/core';

// Directiva para tooltip
@Directive({
  selector: '[tooltip]',
  standalone: false
})
export class TooltipDirective {
  @Input() tooltip = '';
  @HostBinding('attr.title') get title() { return this.tooltip; }
  @HostBinding('style.cursor') cursor = 'help';
}

// Directiva para loading
@Directive({
  selector: '[loading]',
  standalone: false
})
export class LoadingDirective {
  @Input() loading = false;
  @HostBinding('style.opacity') get opacity() { return this.loading ? '0.5' : '1'; }
  @HostBinding('style.pointerEvents') get events() { return this.loading ? 'none' : 'auto'; }
}

// Directiva para tracking de clicks
@Directive({
  selector: '[trackClick]',
  standalone: false
})
export class TrackClickDirective {
  @Input() trackClick = '';

  @HostListener('click')
  onClick() {
    console.log(`🔴 [CLÁSICO] Click tracked: ${this.trackClick}`);
  }
}

@Component({
  selector: 'app-ejercicio-5-host-clasico',
  standalone: false,
  template: `
    <div class="exercise-container">
      <h3>🔴 Ejercicio 5: Host Directives - Clásico</h3>

      <div class="info-box">
        <p><strong>Problema en código clásico:</strong></p>
        <ul>
          <li>Necesitas aplicar TODAS las directivas manualmente</li>
          <li>Código repetitivo en cada botón/elemento</li>
          <li>Difícil de mantener cuando hay muchas directivas</li>
        </ul>
      </div>

      <div class="demo-section">
        <h4>Botones con múltiples directivas:</h4>

        <!-- ❌ Repetitivo: Aplicar 3 directivas a cada botón -->
        <button
          class="btn"
          tooltip="Botón para guardar datos"
          [loading]="isLoading"
          trackClick="save-button">
          💾 Guardar
        </button>

        <button
          class="btn"
          tooltip="Botón para eliminar datos"
          [loading]="isLoading"
          trackClick="delete-button">
          🗑️ Eliminar
        </button>

        <button
          class="btn"
          tooltip="Botón para enviar formulario"
          [loading]="isLoading"
          trackClick="submit-button">
          📤 Enviar
        </button>

        <button (click)="toggleLoading()" class="btn-control">
          {{ isLoading ? 'Detener' : 'Simular' }} Loading
        </button>
      </div>

      <div class="warning-box">
        <p>⚠️ <strong>Problemas:</strong></p>
        <ul>
          <li>Cada botón necesita las 3 directivas: <code>tooltip</code>, <code>loading</code>, <code>trackClick</code></li>
          <li>Si quieres agregar otra directiva, debes modificar TODOS los botones</li>
          <li>Código difícil de escalar y mantener</li>
        </ul>
      </div>

      <div class="code-box">
        <pre>&lt;button
  tooltip="..."
  [loading]="isLoading"
  trackClick="..."&gt;
  Botón
&lt;/button&gt;</pre>
        <p>❌ Repetir esto en cada botón = código duplicado</p>
      </div>
    </div>
  `,
  styles: [`
    .exercise-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .info-box {
      background: #e7f3ff;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .demo-section {
      margin: 20px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .btn {
      margin: 8px;
      padding: 12px 20px;
      border: none;
      border-radius: 5px;
      background: #0d6efd;
      color: white;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.3s;
    }
    .btn:hover:not([disabled]) {
      background: #0b5ed7;
    }
    .btn-control {
      margin: 8px;
      padding: 12px 20px;
      border: 2px solid #6c757d;
      border-radius: 5px;
      background: white;
      color: #6c757d;
      cursor: pointer;
    }
    .warning-box {
      background: #fff3cd;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .code-box {
      background: #2d2d2d;
      color: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .code-box pre {
      margin: 0;
      color: #7ec699;
    }
    .code-box p {
      margin: 10px 0 0 0;
      color: #ffc107;
    }
    code {
      background: #fff;
      padding: 2px 6px;
      border-radius: 3px;
      color: #d63384;
    }
  `]
})
export class Ejercicio5HostClasicoComponent {
  isLoading = false;

  constructor() {
    console.log('🔴 [CLÁSICO] Ejercicio 5 - Sin Host Directives inicializado');
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
    console.log('🔴 Loading:', this.isLoading);
  }
}
