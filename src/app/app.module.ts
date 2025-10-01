import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Sesión 1 - Ejercicios Clásicos
import { Ejercicio1ClasicoComponent } from './sesiones/sesion-1/ejercicio-1-signals-basicos-clasico.component';
import { Ejercicio2ClasicoComponent } from './sesiones/sesion-1/ejercicio-2-computed-clasico.component';

// Sesión 1 - Ejercicios Modernos (Standalone)
import { Ejercicio1ModernoComponent } from './sesiones/sesion-1/ejercicio-1-signals-basicos-moderno.component';
import { Ejercicio2ModernoComponent } from './sesiones/sesion-1/ejercicio-2-computed-moderno.component';
import { Ejercicio3ModernoComponent } from './sesiones/sesion-1/ejercicio-3-effect-moderno.component';

@NgModule({
  declarations: [
    AppComponent,
    // Componentes clásicos (necesitan declarations)
    Ejercicio1ClasicoComponent,
    Ejercicio2ClasicoComponent
  ],
  imports: [
    BrowserModule,
    // Componentes modernos standalone
    Ejercicio1ModernoComponent,
    Ejercicio2ModernoComponent,
    Ejercicio3ModernoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
