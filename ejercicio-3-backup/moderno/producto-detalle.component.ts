import { Component, input, output, signal } from '@angular/core';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

/**
 * VERSIÓN MODERNA - Componente standalone con Signals
 *
 * Ventajas:
 * - input() signal en lugar de @Input
 * - output() en lugar de @Output EventEmitter
 * - signal() para estado local
 * - Nueva sintaxis @if para condicionales
 */
@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  template: `
    <div style="background: #e8f5e9; padding: 15px; margin: 10px 0;">
      <h3>Detalle del Producto (Moderno)</h3>

      @if (producto(); as prod) {
        <p><strong>ID:</strong> {{ prod.id }}</p>
        <p><strong>Nombre:</strong> {{ prod.nombre }}</p>
        <p><strong>Precio:</strong> ${{ prod.precio }}</p>
        <p><strong>Stock:</strong> {{ prod.stock }}</p>

        <div>
          <label>Cantidad: </label>
          <input
            type="number"
            [value]="cantidad()"
            (input)="cantidad.set(+$any($event.target).value)"
            min="1"
            [max]="prod.stock"
            style="width: 60px; padding: 5px;"
          />
          <button (click)="agregar()" [disabled]="cantidad() > prod.stock">
            Agregar al carrito
          </button>
        </div>

        <button (click)="cerrarDetalle()" style="margin-top: 10px;">
          Cerrar
        </button>

        @if (cantidad() > prod.stock) {
          <p style="color: red;">No hay suficiente stock</p>
        }
      }
    </div>
  `
})
export class ProductoDetalleComponent {
  // Input signal
  producto = input<Producto | null>(null);

  // Output signal
  cerrar = output<void>();

  // Estado local con signal
  cantidad = signal(1);

  agregar() {
    const prod = this.producto();
    const cant = this.cantidad();

    if (prod && cant <= prod.stock) {
      console.log('🛒 [Moderno] Agregado al carrito:', {
        producto: prod.nombre,
        cantidad: cant
      });
      alert(`${cant} x ${prod.nombre} agregado al carrito`);
    }
  }

  cerrarDetalle() {
    this.cerrar.emit();
    console.log('✖️ [Moderno] Detalle cerrado');
  }
}
