import { Component } from '@angular/core';

/**
 * VERSIÓN LEGACY - Componente principal con NgModule
 */
@Component({
  selector: 'app-root-legacy',
  template: `
    <div style="border: 3px solid #333; padding: 20px; margin: 10px;">
      <h1>Tienda Online (Legacy - NgModule)</h1>

      <app-producto-lista></app-producto-lista>

      <p style="color: #666; margin-top: 20px;">
        💡 Esta app usa NgModule tradicional. Todos los componentes deben
        declararse en el módulo.
      </p>
    </div>
  `
})
export class AppComponentLegacy {
  constructor() {
    console.log('🎬 [Legacy] AppComponent inicializado');
  }
}
