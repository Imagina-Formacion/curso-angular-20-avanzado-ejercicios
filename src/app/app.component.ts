import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Ejercicios Angular Signals - Sesión 1';
  ejercicioActual = 1;
  totalEjercicios = 3;

  siguiente() {
    if (this.ejercicioActual < this.totalEjercicios) {
      this.ejercicioActual++;
    }
  }

  anterior() {
    if (this.ejercicioActual > 1) {
      this.ejercicioActual--;
    }
  }

  irAEjercicio(numero: number) {
    this.ejercicioActual = numero;
  }
}
