// ejercicio-3-directivas-moderno.component.ts
// VERSIÓN MODERNA: Directivas con signals y signal inputs

import { Component, Directive, ElementRef, HostListener, input, Renderer2, signal, effect } from '@angular/core';

// Directiva moderna con signal inputs
@Directive({
  selector: '[appHighlightModern]',
  standalone: true
})
export class HighlightModernDirective {
  // 💡 SIGNAL INPUT: Entrada reactiva
  highlightColor = input<string>('yellow');

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // 💡 EFFECT: Reacciona cuando cambia el input
    effect(() => {
      console.log('Moderno: Color de highlight cambiado a', this.highlightColor());
    });
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.highlightColor());
    console.log('Moderno: Highlight activado');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '');
    console.log('Moderno: Highlight desactivado');
  }
}

@Component({
  selector: 'app-ejercicio-3-dir-moderno',
  standalone: true,
  imports: [HighlightModernDirective],
  template: `
    <div>
      <h3>Ejercicio 3: Directivas - Versión Moderna (Signals)</h3>

      <p>Contador de clicks: {{ clickCount() }}</p>

      <hr>

      <h4>1. Directiva Highlight con Signal Inputs</h4>
      <p appHighlightModern>
        Pasa el mouse sobre este párrafo (amarillo por defecto)
      </p>

      <p appHighlightModern [highlightColor]="'lightblue'">
        Este se resalta en azul
      </p>

      <p appHighlightModern [highlightColor]="currentColor()">
        Este usa un signal: {{ currentColor() }}
      </p>

      <button (click)="changeColor()">Cambiar Color Dinámico</button>

      <hr>

      <h4>2. Event Binding con Signals</h4>
      <button (click)="handleClick()">Click Reactivo</button>
      <button (click)="reset()">Reset</button>

      <hr>

      <h4>3. Class y Style Bindings Reactivos</h4>
      <div
        [class.active]="isActive()"
        [class.disabled]="!isActive()"
        [style.padding]="'15px'"
        [style.backgroundColor]="isActive() ? '#d4edda' : '#f8d7da'"
      >
        Estado: {{ isActive() ? 'Activo' : 'Inactivo' }}
      </div>

      <button (click)="toggleActive()">Toggle Estado</button>

      <p>💡 Moderno: Directivas con signal inputs y effects para reactividad</p>
    </div>
  `,
  styles: [`
    button { margin: 5px; padding: 8px 15px; }
    .active { border: 2px solid green; }
    .disabled { border: 2px solid red; }
    p[appHighlightModern] { padding: 10px; border: 1px solid #ddd; margin: 5px 0; cursor: pointer; }
  `]
})
export class Ejercicio3DirModernoComponent {
  // 💡 SIGNALS: Estado reactivo
  clickCount = signal(0);
  isActive = signal(true);
  currentColor = signal('lightcoral');

  private colors = ['lightcoral', 'lightgreen', 'lightblue', 'lightyellow'];
  private colorIndex = 0;

  handleClick() {
    this.clickCount.update(c => c + 1);
    console.log('Moderno: Click count =', this.clickCount());
  }

  reset() {
    this.clickCount.set(0);
    console.log('Moderno: Reseteado');
  }

  toggleActive() {
    this.isActive.update(v => !v);
    console.log('Moderno: isActive =', this.isActive());
  }

  changeColor() {
    this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    this.currentColor.set(this.colors[this.colorIndex]);
    console.log('Moderno: Color cambiado a', this.currentColor());
  }
}
