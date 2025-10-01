// ejercicio-2-computed-moderno.component.ts
// VERSIÓN MODERNA: Usando computed signals
//
// 🎯 OBJETIVO: Crear valores derivados usando computed signals
//
// 📝 TAREAS:
// 1. Importar 'signal' y 'computed' desde '@angular/core'
// 2. Crear signals para precioBase y cantidad
// 3. Crear computed signals para total y totalConIVA
// 4. Implementar los métodos para modificar los signals
//
// 💡 PISTAS:
// - computed(() => expresión) crea un valor derivado
// - Los computed se recalculan automáticamente cuando cambian sus dependencias
// - Los computed son read-only (no se pueden modificar directamente)

import { Component } from '@angular/core';

@Component({
  selector: 'app-ejercicio-2-moderno',
  standalone: true,
  template: `
    <div>
      <h3>Ejercicio 2: Valores Derivados - Versión Moderna (Computed)</h3>

      <!-- TODO: Actualizar para usar signals con () -->
      <p>Precio base: €</p>
      <p>Cantidad: </p>

      <p><strong>Total: €</strong></p>
      <p><strong>Total con IVA (21%): €</strong></p>

      <button (click)="aumentarCantidad()">+ Cantidad</button>
      <button (click)="disminuirCantidad()">- Cantidad</button>

      <hr>

      <button (click)="cambiarPrecio(10)">Precio: 10€</button>
      <button (click)="cambiarPrecio(25)">Precio: 25€</button>
      <button (click)="cambiarPrecio(50)">Precio: 50€</button>

      <p>💡 Los computed signals solo se recalculan cuando cambian sus dependencias</p>
    </div>
  `
})
export class Ejercicio2ModernoComponent {
  // TODO: Crear signals para estado mutable
  // precioBase =
  // cantidad =

  // TODO: Crear computed signal para el total
  // total = computed(() => {
  //   console.log('Signal: Calculando total (computed ejecutado)');
  //   return ...
  // });

  // TODO: Crear computed signal para total con IVA
  // totalConIVA = computed(() => {
  //   console.log('Signal: Calculando total con IVA (computed ejecutado)');
  //   return ...
  // });

  aumentarCantidad() {
    // TODO: Implementar
    console.log('Signal: Cantidad =');
  }

  disminuirCantidad() {
    // TODO: Implementar (validar que cantidad > 0)
    console.log('Signal: Cantidad =');
  }

  cambiarPrecio(precio: number) {
    // TODO: Implementar
    console.log('Signal: Precio base =');
  }
}
