import { Component } from '@angular/core';
import { ProductoListaComponent } from './producto-lista.component';

/**
 * VERSIÓN MODERNA - Componente standalone
 *
 * Ventajas:
 * - No necesita NgModule
 * - Imports explícitos
 * - Más fácil de entender qué usa el componente
 */
@Component({
  selector: 'app-root-moderno',
  standalone: true,
  imports: [ProductoListaComponent],
  template: `
    <div style="border: 3px solid #4CAF50; padding: 20px; margin: 10px;">
      <h1>Tienda Online (Moderno - Standalone)</h1>

      <app-producto-lista></app-producto-lista>

      <p style="color: #2e7d32; margin-top: 20px;">
        💡 Esta app usa Standalone Components. No hay NgModule, los imports
        son directos en cada componente.
      </p>
    </div>
  `
})
export class AppComponentModerno {
  constructor() {
    console.log('🎬 [Moderno] AppComponent standalone inicializado');
  }
}
