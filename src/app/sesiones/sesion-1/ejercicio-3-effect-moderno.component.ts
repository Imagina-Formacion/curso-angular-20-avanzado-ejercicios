// ejercicio-3-effect-moderno.component.ts
// CONCEPTO NUEVO: Effects - No existe equivalente directo en clásico

import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-ejercicio-3-moderno',
  standalone: true,
  template: `
    <div>
      <h3>Ejercicio 3: Effects - Versión Moderna (Solo con Signals)</h3>

      <p>Búsqueda: {{ busqueda() }}</p>
      <p>Contador de búsquedas: {{ contadorBusquedas() }}</p>

      <input
        type="text"
        [value]="busqueda()"
        (input)="actualizarBusqueda($any($event.target).value)"
        placeholder="Escribe algo..."
      />

      <button (click)="limpiar()">Limpiar</button>

      <p>💡 Abre la consola para ver cómo el effect se ejecuta automáticamente</p>
      <p>💡 Los effects son para side effects (logging, analytics, localStorage, etc.)</p>
    </div>
  `
})
export class Ejercicio3ModernoComponent {
  busqueda = signal('');
  contadorBusquedas = signal(0);

  constructor() {
    // 💡 EFFECT: Se ejecuta automáticamente cuando busqueda() cambia
    effect(() => {
      const termino = this.busqueda();
      console.log('Effect ejecutado: Búsqueda =', termino);

      // Side effect: guardar en localStorage
      if (termino) {
        localStorage.setItem('ultimaBusqueda', termino);
        console.log('Guardado en localStorage:', termino);
      }
    });

    // 💡 EFFECT: Contador de búsquedas
    effect(() => {
      const termino = this.busqueda();
      if (termino.length > 0) {
        this.contadorBusquedas.update(valor => valor + 1);
        console.log('Búsquedas realizadas:', this.contadorBusquedas());
      }
    });
  }

  actualizarBusqueda(valor: string) {
    this.busqueda.set(valor);
  }

  limpiar() {
    this.busqueda.set('');
    this.contadorBusquedas.set(0);
    localStorage.removeItem('ultimaBusqueda');
    console.log('Búsqueda limpiada');
  }
}
