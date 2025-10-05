// ejercicio-5-host-directives-moderno.component.ts
// VERSIÓN MODERNA: Con Host Directives - DRY y reutilizable

import { Component, Directive, HostListener, HostBinding, input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Directiva para tooltip
@Directive({
  selector: '[tooltip]',
  standalone: true
})
export class TooltipModernDirective {
  tooltip = input<string>('');

  @HostBinding('attr.title')
  get title() {
    return this.tooltip();
  }

  @HostBinding('style.cursor')
  cursor = 'help';
}

// Directiva para loading state
@Directive({
  selector: '[loading]',
  standalone: true
})
export class LoadingModernDirective {
  loading = input<boolean>(false);

  @HostBinding('style.opacity')
  get opacity() {
    return this.loading() ? '0.5' : '1';
  }

  @HostBinding('style.pointerEvents')
  get events() {
    return this.loading() ? 'none' : 'auto';
  }
}

// Directiva para tracking analytics
@Directive({
  selector: '[trackClick]',
  standalone: true
})
export class TrackClickModernDirective {
  trackClick = input<string>('');

  @HostListener('click')
  onClick() {
    console.log(`✅ [MODERNO] Analytics tracked: ${this.trackClick()}`);
  }
}

// 🎯 HOST DIRECTIVE: Combina múltiples directivas en una sola
@Directive({
  selector: '[smartButton]',
  standalone: true,
  hostDirectives: [
    {
      directive: TooltipModernDirective,
      inputs: ['tooltip']
    },
    {
      directive: LoadingModernDirective,
      inputs: ['loading']
    },
    {
      directive: TrackClickModernDirective,
      inputs: ['trackClick']
    }
  ]
})
export class SmartButtonDirective {
  // Esta directiva automáticamente aplica las 3 directivas host
  // No necesita código adicional, solo la configuración
}

@Component({
  selector: 'app-ejercicio-5-host-moderno',
  standalone: true,
  imports: [CommonModule, SmartButtonDirective],
  template: `
    <div class="exercise-container">
      <h3>✅ Ejercicio 5: Host Directives - Moderno</h3>

      <div class="info-box success">
        <p><strong>🎯 Solución con Host Directives:</strong></p>
        <ul>
          <li>✅ UNA sola directiva <code>smartButton</code> aplica las 3 automáticamente</li>
          <li>✅ Código DRY (Don't Repeat Yourself)</li>
          <li>✅ Fácil de mantener y escalar</li>
          <li>✅ Reutilización y composición de lógica</li>
        </ul>
      </div>

      <div class="demo-section">
        <h4>Botones con Host Directive:</h4>

        <!-- ✅ Una sola directiva = todas las funcionalidades -->
        <button
          class="btn"
          smartButton
          tooltip="Botón para guardar datos"
          [loading]="isLoading"
          trackClick="save-button">
          💾 Guardar
        </button>

        <button
          class="btn"
          smartButton
          tooltip="Botón para eliminar datos"
          [loading]="isLoading"
          trackClick="delete-button">
          🗑️ Eliminar
        </button>

        <button
          class="btn"
          smartButton
          tooltip="Botón para enviar formulario"
          [loading]="isLoading"
          trackClick="submit-button">
          📤 Enviar
        </button>

        <button (click)="toggleLoading()" class="btn-control">
          {{ isLoading ? 'Detener' : 'Simular' }} Loading
        </button>
      </div>

      <div class="success-box">
        <p>✅ <strong>Ventajas:</strong></p>
        <ul>
          <li><code>smartButton</code> encapsula: tooltip + loading + tracking</li>
          <li>Si necesitas agregar funcionalidad, modifica solo la directiva host</li>
          <li>Todos los botones se actualizan automáticamente</li>
          <li>Código limpio, mantenible y escalable</li>
        </ul>
      </div>

      <div class="code-box">
        <p><strong>💡 Configuración de Host Directive:</strong></p>
        <pre>
@Directive(&#123;
  selector: '[smartButton]',
  hostDirectives: [
    TooltipModernDirective,
    LoadingModernDirective,
    TrackClickModernDirective
  ]
&#125;)
        </pre>
        <p style="margin-top: 10px;">✅ Una configuración = reutilización infinita</p>
      </div>

      <div class="architecture-box">
        <h4>🏗️ Arquitectura Host Directives:</h4>
        <pre>
SmartButtonDirective (host)
├── TooltipDirective      → Proporciona tooltip
├── LoadingDirective      → Maneja estado loading
└── TrackClickDirective   → Analytics tracking
        </pre>
        <p>💡 El componente solo usa <code>smartButton</code>, pero obtiene las 3 funcionalidades</p>
      </div>
    </div>
  `,
  styles: [`
    .exercise-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .info-box {
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .info-box.success {
      background: #d1e7dd;
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
      background: #198754;
      color: white;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.3s;
    }
    .btn:hover:not([disabled]) {
      background: #157347;
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
    .success-box {
      background: #d1e7dd;
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
      font-size: 13px;
      overflow-x: auto;
    }
    .code-box p {
      margin: 10px 0 0 0;
      color: #7ec699;
    }
    .architecture-box {
      background: #e7f3ff;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .architecture-box pre {
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      font-size: 13px;
      color: #2d2d2d;
    }
    code {
      background: #fff;
      padding: 2px 6px;
      border-radius: 3px;
      color: #d63384;
    }
  `]
})
export class Ejercicio5HostModernoComponent {
  isLoading = false;

  constructor() {
    console.log('✅ [MODERNO] Ejercicio 5 - Host Directives inicializado');
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
    console.log('✅ Loading state:', this.isLoading);
  }
}
