// ejercicio-1-signals-basicos-moderno.component.ts
// VERSIÓN MODERNA: Usando Signals

import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-ejercicio-1-moderno',
  standalone: true,
  template: `
    <div>
      <h3>Ejercicio 1: Signals Básicos - Versión Moderna (Signals)</h3>

      <p>Contador: {{ contador() }}</p>
      <p>Nombre: {{ nombre() }}</p>

      <button (click)="incrementar()">Incrementar</button>
      <button (click)="decrementar()">Decrementar</button>
      <button (click)="resetear()">Resetear</button>

      <hr>

      <button (click)="cambiarNombre('Angular')">Cambiar a Angular</button>
      <button (click)="cambiarNombre('Signals')">Cambiar a Signals</button>

      <p>💡 Abre la consola para ver los logs</p>
    </div>
  `
})
export class Ejercicio1ModernoComponent {
  // 💡 SIGNALS: Estado reactivo
  contador = signal(0);
  nombre = signal('Usuario');

  incrementar() {
    // 💡 .update() para modificar basado en el valor anterior
    this.contador.update(valor => valor + 1);
    console.log('Signal: Contador =', this.contador());
  }

  decrementar() {
    this.contador.update(valor => valor - 1);
    console.log('Signal: Contador =', this.contador());
  }

  resetear() {
    // 💡 .set() para establecer un valor específico
    this.contador.set(0);
    console.log('Signal: Contador reseteado');
  }

  cambiarNombre(nuevoNombre: string) {
    this.nombre.set(nuevoNombre);
    console.log('Signal: Nombre =', this.nombre());
  }
}
