import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponentLegacy } from './app.component';
import { ProductoListaComponent } from './producto-lista.component';
import { ProductoDetalleComponent } from './producto-detalle.component';

/**
 * VERSIÓN LEGACY - NgModule
 *
 * Problemas:
 * - Mucho boilerplate
 * - Imports no son claros (¿qué componente usa qué?)
 * - Difícil de hacer tree-shaking
 * - Declarations/Imports/Exports confusos
 */
@NgModule({
  declarations: [
    AppComponentLegacy,
    ProductoListaComponent,
    ProductoDetalleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponentLegacy]
})
export class AppModule {
  constructor() {
    console.log('📦 [Legacy] AppModule inicializado');
  }
}
