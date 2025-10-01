// ejercicio-1-signals-basicos-moderno.component.ts
// VERSIÓN MODERNA: Usando Signals
//
// 🎯 OBJETIVO: Migrar el componente clásico a Signals
//
// 📝 TAREAS:
// 1. Importar 'signal' desde '@angular/core'
// 2. Convertir las variables 'contador' y 'nombre' a signals
// 3. Implementar los métodos usando .set() y .update()
// 4. Actualizar el template para leer los signals con ()
//
// 💡 PISTAS:
// - Para crear un signal: signal(valorInicial)
// - Para leer un signal: nombreSignal()
// - Para actualizar: nombreSignal.set(nuevoValor)
// - Para actualizar basado en valor anterior: nombreSignal.update(valor => nuevoValor)

import { Component } from '@angular/core';

@Component({
  selector: 'app-ejercicio-1-moderno',
  standalone: true,
  template: `
    <div>
      <h3>Ejercicio 1: Signals Básicos - Versión Moderna (Signals)</h3>

      <!-- TODO: Actualizar para usar signals con () -->
      <p>Contador: </p>
      <p>Nombre: </p>

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
  // TODO: Convertir a signals
  // contador =
  // nombre =

  incrementar() {
    // TODO: Implementar con signal.update()
    console.log('Signal: Contador =');
  }

  decrementar() {
    // TODO: Implementar con signal.update()
    console.log('Signal: Contador =');
  }

  resetear() {
    // TODO: Implementar con signal.set()
    console.log('Signal: Contador reseteado');
  }

  cambiarNombre(nuevoNombre: string) {
    // TODO: Implementar con signal.set()
    console.log('Signal: Nombre =');
  }
}
