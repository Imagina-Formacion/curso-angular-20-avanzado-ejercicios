import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

// Sesión 1 - Ejercicios Clásicos
import { Ejercicio1ClasicoComponent } from './sesiones/sesion-1/ejercicio-1-signals-basicos-clasico.component';
import { Ejercicio2ClasicoComponent } from './sesiones/sesion-1/ejercicio-2-computed-clasico.component';

// Sesión 1 - Ejercicios Modernos (Standalone)
import { Ejercicio1ModernoComponent } from './sesiones/sesion-1/ejercicio-1-signals-basicos-moderno.component';
import { Ejercicio2ModernoComponent } from './sesiones/sesion-1/ejercicio-2-computed-moderno.component';
import { Ejercicio3ModernoComponent } from './sesiones/sesion-1/ejercicio-3-effect-moderno.component';

// Sesión 2 - Ejercicios Clásicos
import { Ejercicio1CdClasicoComponent } from './sesiones/sesion-2/ejercicio-1-change-detection-clasico.component';
import { Ejercicio2CfClasicoComponent } from './sesiones/sesion-2/ejercicio-2-control-flow-clasico.component';
import { Ejercicio3DirClasicoComponent, HighlightClassicDirective } from './sesiones/sesion-2/ejercicio-3-directivas-clasico.component';

// Sesión 2 - Ejercicios Modernos (Standalone)
import { Ejercicio1CdModernoComponent } from './sesiones/sesion-2/ejercicio-1-change-detection-moderno.component';
import { Ejercicio2CfModernoComponent } from './sesiones/sesion-2/ejercicio-2-control-flow-moderno.component';
import { Ejercicio3DirModernoComponent } from './sesiones/sesion-2/ejercicio-3-directivas-moderno.component';

@NgModule({
  declarations: [
    AppComponent,
    // Sesión 1 - Componentes clásicos
    Ejercicio1ClasicoComponent,
    Ejercicio2ClasicoComponent,
    // Sesión 2 - Componentes clásicos
    Ejercicio1CdClasicoComponent,
    Ejercicio2CfClasicoComponent,
    Ejercicio3DirClasicoComponent,
    HighlightClassicDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    // Sesión 1 - Componentes modernos standalone
    Ejercicio1ModernoComponent,
    Ejercicio2ModernoComponent,
    Ejercicio3ModernoComponent,
    // Sesión 2 - Componentes modernos standalone
    Ejercicio1CdModernoComponent,
    Ejercicio2CfModernoComponent,
    Ejercicio3DirModernoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
