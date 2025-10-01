// ejercicio-1-signals-basicos-clasico.component.ts
// VERSIÓN CLÁSICA: Usando variables normales con Zone.js

import { Component } from '@angular/core';

@Component({
  selector: 'app-ejercicio-1-clasico',
  standalone: false,
  template: `
    <div>
      <h3>Ejercicio 1: Signals Básicos - Versión Clásica (Zone.js)</h3>

      <p>Contador: {{ contador }}</p>
      <p>Nombre: {{ nombre }}</p>

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
export class Ejercicio1ClasicoComponent {
  // Variables normales de clase
  contador: number = 0;
  nombre: string = 'Usuario';

  incrementar() {
    this.contador++;
    console.log('Clásico: Contador =', this.contador);
  }

  decrementar() {
    this.contador--;
    console.log('Clásico: Contador =', this.contador);
  }

  resetear() {
    this.contador = 0;
    console.log('Clásico: Contador reseteado');
  }

  cambiarNombre(nuevoNombre: string) {
    this.nombre = nuevoNombre;
    console.log('Clásico: Nombre =', this.nombre);
  }
}
