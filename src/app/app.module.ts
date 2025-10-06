import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { Ejercicio4CdClasicoComponent } from './sesiones/sesion-2/ejercicio-4-cd-manual-clasico.component';
import { Ejercicio5HostClasicoComponent, TooltipDirective, LoadingDirective, TrackClickDirective } from './sesiones/sesion-2/ejercicio-5-host-directives-clasico.component';
import { Ejercicio6ProfilingClasicoComponent } from './sesiones/sesion-2/ejercicio-6-profiling-clasico.component';

// Sesión 2 - Ejercicios Modernos (Standalone)
import { Ejercicio1CdModernoComponent } from './sesiones/sesion-2/ejercicio-1-change-detection-moderno.component';
import { Ejercicio2CfModernoComponent } from './sesiones/sesion-2/ejercicio-2-control-flow-moderno.component';
import { Ejercicio3DirModernoComponent } from './sesiones/sesion-2/ejercicio-3-directivas-moderno.component';
import { Ejercicio4CdModernoComponent } from './sesiones/sesion-2/ejercicio-4-cd-manual-moderno.component';
import { Ejercicio5HostModernoComponent } from './sesiones/sesion-2/ejercicio-5-host-directives-moderno.component';
import { Ejercicio6ProfilingModernoComponent } from './sesiones/sesion-2/ejercicio-6-profiling-moderno.component';
import { Ejercicio7DirectivasEstructuralesComponent } from './sesiones/sesion-2/ejercicio-7-directivas-estructurales.component';
import { Ejercicio8TestingDirectivasComponent } from './sesiones/sesion-2/ejercicio-8-testing-directivas.component';

// Sesión 3 - Ejercicios Clásicos
import { Ejercicio1FormsClasico } from './sesiones/sesion-3/ejercicio-1-forms-clasico.component';
import { Ejercicio2ValidacionesClasico } from './sesiones/sesion-3/ejercicio-2-validaciones-clasico.component';
import { Ejercicio3DIClasico } from './sesiones/sesion-3/ejercicio-3-di-clasico.component';
import { Ejercicio4FormArrayClasico } from './sesiones/sesion-3/ejercicio-4-formarray-clasico.component';
import { Ejercicio5ProvidersClasico } from './sesiones/sesion-3/ejercicio-5-providers-clasico.component';

// Sesión 3 - Ejercicios Modernos (Standalone)
import { Ejercicio1FormsModerno } from './sesiones/sesion-3/ejercicio-1-forms-moderno.component';
import { Ejercicio2ValidacionesModerno } from './sesiones/sesion-3/ejercicio-2-validaciones-moderno.component';
import { Ejercicio3DIModerno } from './sesiones/sesion-3/ejercicio-3-di-moderno.component';
import { Ejercicio4FormArrayModerno } from './sesiones/sesion-3/ejercicio-4-formarray-moderno.component';
import { Ejercicio5ProvidersModerno } from './sesiones/sesion-3/ejercicio-5-providers-moderno.component';

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
    HighlightClassicDirective,
    Ejercicio4CdClasicoComponent,
    Ejercicio5HostClasicoComponent,
    TooltipDirective,
    LoadingDirective,
    TrackClickDirective,
    Ejercicio6ProfilingClasicoComponent,
    // Sesión 3 - Componentes clásicos
    Ejercicio1FormsClasico,
    Ejercicio2ValidacionesClasico,
    Ejercicio3DIClasico,
    Ejercicio5ProvidersClasico
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    // Sesión 1 - Componentes modernos standalone
    Ejercicio1ModernoComponent,
    Ejercicio2ModernoComponent,
    Ejercicio3ModernoComponent,
    // Sesión 2 - Componentes modernos standalone
    Ejercicio1CdModernoComponent,
    Ejercicio2CfModernoComponent,
    Ejercicio3DirModernoComponent,
    Ejercicio4CdModernoComponent,
    Ejercicio5HostModernoComponent,
    Ejercicio6ProfilingModernoComponent,
    Ejercicio7DirectivasEstructuralesComponent,
    Ejercicio8TestingDirectivasComponent,
    // Sesión 3 - Componentes modernos standalone
    Ejercicio1FormsModerno,
    Ejercicio2ValidacionesModerno,
    Ejercicio3DIModerno,
    Ejercicio4FormArrayClasico, // Ahora standalone
    Ejercicio4FormArrayModerno,
    Ejercicio5ProvidersModerno
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
