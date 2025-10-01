// ejercicio-3-directivas-clasico.component.ts
// VERSIÓN CLÁSICA: Directivas tradicionales con @Input y eventos

import { Component, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

// Directiva clásica de highlight
@Directive({
  selector: '[appHighlightClassic]',
  standalone: false
})
export class HighlightClassicDirective {
  @Input() highlightColor = 'yellow';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.highlightColor);
    console.log('Clásico: Highlight activado');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '');
    console.log('Clásico: Highlight desactivado');
  }
}

@Component({
  selector: 'app-ejercicio-3-dir-clasico',
  standalone: false,
  template: `
    <div>
      <h3>Ejercicio 3: Directivas - Versión Clásica</h3>

      <p>Contador de clicks: {{ clickCount }}</p>

      <hr>

      <h4>1. Directiva Highlight</h4>
      <p appHighlightClassic>
        Pasa el mouse sobre este párrafo (amarillo por defecto)
      </p>

      <p appHighlightClassic [highlightColor]="'lightblue'">
        Este se resalta en azul
      </p>

      <p appHighlightClassic [highlightColor]="'lightgreen'">
        Este se resalta en verde
      </p>

      <hr>

      <h4>2. Event Binding Manual</h4>
      <button (click)="handleClick()">Click Manual</button>
      <button (click)="reset()">Reset</button>

      <hr>

      <h4>3. ngClass y ngStyle</h4>
      <div
        [ngClass]="{'active': isActive, 'disabled': !isActive}"
        [ngStyle]="{'padding': '15px', 'backgroundColor': isActive ? '#d4edda' : '#f8d7da'}"
      >
        Estado: {{ isActive ? 'Activo' : 'Inactivo' }}
      </div>

      <button (click)="toggleActive()">Toggle Estado</button>

      <p>💡 Clásico: Directivas con @Directive, @Input, @HostListener</p>
    </div>
  `,
  styles: [`
    button { margin: 5px; padding: 8px 15px; }
    .active { border: 2px solid green; }
    .disabled { border: 2px solid red; }
    p[appHighlightClassic] { padding: 10px; border: 1px solid #ddd; margin: 5px 0; cursor: pointer; }
  `]
})
export class Ejercicio3DirClasicoComponent {
  clickCount = 0;
  isActive = true;

  handleClick() {
    this.clickCount++;
    console.log('Clásico: Click count =', this.clickCount);
  }

  reset() {
    this.clickCount = 0;
    console.log('Clásico: Reseteado');
  }

  toggleActive() {
    this.isActive = !this.isActive;
    console.log('Clásico: isActive =', this.isActive);
  }
}
