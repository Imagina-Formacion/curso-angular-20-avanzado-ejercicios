import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html'
})
export class AppComponent {
  sesionActual: 1 | 2 = 1;

  cambiarSesion(sesion: 1 | 2) {
    this.sesionActual = sesion;
  }
}
