// ejercicio-3-effect-moderno.component.ts
// CONCEPTO NUEVO: Effects - No existe equivalente directo en clásico
//
// 🎯 OBJETIVO: Usar effects para ejecutar side effects reactivos
//
// 📝 TAREAS:
// 1. Importar 'signal' y 'effect' desde '@angular/core'
// 2. Crear signals para busqueda y contadorBusquedas
// 3. Crear un effect que guarde en localStorage cuando cambie busqueda
// 4. Crear un effect que incremente el contador cuando se busque
// 5. Implementar los métodos actualizarBusqueda y limpiar
//
// 💡 PISTAS:
// - effect(() => { ... }) se ejecuta cuando cambian los signals que lee
// - Los effects se declaran en el constructor
// - Son ideales para side effects: logging, localStorage, analytics, etc.
// - NO usar effects para modificar el estado directamente (usar computed en su lugar)

import { Component } from '@angular/core';

@Component({
  selector: 'app-ejercicio-3-moderno',
  standalone: true,
  template: `
    <div>
      <h3>Ejercicio 3: Effects - Versión Moderna (Solo con Signals)</h3>

      <!-- TODO: Actualizar para usar signals con () -->
      <p>Búsqueda: </p>
      <p>Contador de búsquedas: </p>

      <input
        type="text"
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
  // TODO: Crear signals
  // busqueda =
  // contadorBusquedas =

  constructor() {
    // TODO: Crear effect para guardar en localStorage
    // effect(() => {
    //   const termino = ...
    //   console.log('Effect ejecutado: Búsqueda =', termino);
    //   if (termino) {
    //     localStorage.setItem('ultimaBusqueda', termino);
    //   }
    // });

    // TODO: Crear effect para contar búsquedas
    // effect(() => {
    //   ...
    // });
  }

  actualizarBusqueda(valor: string) {
    // TODO: Implementar
  }

  limpiar() {
    // TODO: Implementar (limpiar signals y localStorage)
    console.log('Búsqueda limpiada');
  }
}
