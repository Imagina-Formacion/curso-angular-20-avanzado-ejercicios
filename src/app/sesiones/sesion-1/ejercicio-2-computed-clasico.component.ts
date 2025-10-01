// ejercicio-2-computed-clasico.component.ts
// VERSIÓN CLÁSICA: Cálculos con getters

import { Component } from '@angular/core';

@Component({
  selector: 'app-ejercicio-2-clasico',
  standalone: false,
  template: `
    <div>
      <h3>Ejercicio 2: Valores Derivados - Versión Clásica (Getters)</h3>

      <p>Precio base: {{ precioBase }}€</p>
      <p>Cantidad: {{ cantidad }}</p>

      <p><strong>Total: {{ total }}€</strong></p>
      <p><strong>Total con IVA (21%): {{ totalConIVA }}€</strong></p>

      <button (click)="aumentarCantidad()">+ Cantidad</button>
      <button (click)="disminuirCantidad()">- Cantidad</button>

      <hr>

      <button (click)="cambiarPrecio(10)">Precio: 10€</button>
      <button (click)="cambiarPrecio(25)">Precio: 25€</button>
      <button (click)="cambiarPrecio(50)">Precio: 50€</button>

      <p>💡 Los getters se recalculan en cada detección de cambios</p>
    </div>
  `
})
export class Ejercicio2ClasicoComponent {
  precioBase: number = 10;
  cantidad: number = 1;

  // ⚠️ Los getters se ejecutan CADA VEZ que Angular los necesita
  get total(): number {
    console.log('Clásico: Calculando total (getter ejecutado)');
    return this.precioBase * this.cantidad;
  }

  get totalConIVA(): number {
    console.log('Clásico: Calculando total con IVA (getter ejecutado)');
    return this.total * 1.21;
  }

  aumentarCantidad() {
    this.cantidad++;
    console.log('Clásico: Cantidad =', this.cantidad);
  }

  disminuirCantidad() {
    if (this.cantidad > 0) {
      this.cantidad--;
      console.log('Clásico: Cantidad =', this.cantidad);
    }
  }

  cambiarPrecio(precio: number) {
    this.precioBase = precio;
    console.log('Clásico: Precio base =', this.precioBase);
  }
}
