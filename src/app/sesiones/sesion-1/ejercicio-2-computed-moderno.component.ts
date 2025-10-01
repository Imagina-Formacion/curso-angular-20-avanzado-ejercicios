// ejercicio-2-computed-moderno.component.ts
// VERSIÓN MODERNA: Usando computed signals

import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-ejercicio-2-moderno',
  standalone: true,
  template: `
    <div>
      <h3>Ejercicio 2: Valores Derivados - Versión Moderna (Computed)</h3>

      <p>Precio base: {{ precioBase() }}€</p>
      <p>Cantidad: {{ cantidad() }}</p>

      <p><strong>Total: {{ total() }}€</strong></p>
      <p><strong>Total con IVA (21%): {{ totalConIVA() }}€</strong></p>

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
  // 💡 SIGNALS para estado mutable
  precioBase = signal(10);
  cantidad = signal(1);

  // 💡 COMPUTED: Solo se recalcula cuando precioBase o cantidad cambian
  total = computed(() => {
    console.log('Signal: Calculando total (computed ejecutado)');
    return this.precioBase() * this.cantidad();
  });

  // 💡 COMPUTED: Puede derivar de otros computed
  totalConIVA = computed(() => {
    console.log('Signal: Calculando total con IVA (computed ejecutado)');
    return this.total() * 1.21;
  });

  aumentarCantidad() {
    this.cantidad.update(valor => valor + 1);
    console.log('Signal: Cantidad =', this.cantidad());
  }

  disminuirCantidad() {
    if (this.cantidad() > 0) {
      this.cantidad.update(valor => valor - 1);
      console.log('Signal: Cantidad =', this.cantidad());
    }
  }

  cambiarPrecio(precio: number) {
    this.precioBase.set(precio);
    console.log('Signal: Precio base =', this.precioBase());
  }
}
