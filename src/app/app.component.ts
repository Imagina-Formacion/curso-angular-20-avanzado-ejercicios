import { Component } from '@angular/core';

/**
 * AppComponent - Contenedor principal de la aplicación
 *
 * Nota pedagógica:
 * Este componente usa NgModule (no standalone) para demostrar la arquitectura híbrida.
 * Sin embargo, el TEMPLATE usa sintaxis moderna de Angular 20:
 * - @if/@else en lugar de *ngIf
 * - @for en lugar de *ngFor
 * - Estilos en archivo CSS separado
 *
 * Esto muestra cómo en proyectos reales puedes tener:
 * - Módulos legacy (AppModule)
 * - Templates modernos (control flow)
 * - Componentes standalone (los ejercicios)
 */
@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // IMPORTANTE: Cambiar este valor según la sesión de la rama actual
  // sesion-1-inicio / sesion-1-final: sesionActual = 1
  // sesion-2-inicio / sesion-2-final: sesionActual = 2
  // sesion-3-inicio / sesion-3-final: sesionActual = 3
  sesionActual: 1 | 2 | 3 = 3; // ← Sesión 3 por defecto

  cambiarSesion(sesion: 1 | 2 | 3) {
    this.sesionActual = sesion;
  }
}
