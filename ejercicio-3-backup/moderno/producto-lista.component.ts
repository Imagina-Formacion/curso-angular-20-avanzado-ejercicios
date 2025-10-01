import { Component, signal } from '@angular/core';
import { ProductoDetalleComponent } from './producto-detalle.component';

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
 * - standalone: true (no necesita NgModule)
 * - Imports explícitos en el componente
 * - Signals para estado reactivo
 * - Nueva sintaxis de control flow (@if, @for)
 */
@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [ProductoDetalleComponent],
  template: `
    <div style="border: 2px solid #4CAF50; padding: 15px; margin: 10px;">
      <h2>Lista de Productos (Moderno)</h2>

      @if (productoSeleccionado()) {
        <app-producto-detalle
          [producto]="productoSeleccionado()"
          (cerrar)="productoSeleccionado.set(null)"
        />
      } @else {
        <div>
          <h3>Productos disponibles:</h3>
          <ul>
            @for (producto of productos(); track producto.id) {
              <li>
                {{ producto.nombre }} - {{ producto.precio }}€
                (Stock: {{ producto.stock }})
                <button (click)="seleccionar(producto)">Ver detalle</button>
              </li>
            }
          </ul>
        </div>
      }

      <p>Total productos: {{ productos().length }}</p>
    </div>
  `
})
export class ProductoListaComponent {
  // Estado con signals
  productos = signal<Producto[]>([
    { id: 1, nombre: 'Laptop', precio: 1200, stock: 5 },
    { id: 2, nombre: 'Mouse', precio: 25, stock: 15 },
    { id: 3, nombre: 'Teclado', precio: 80, stock: 8 }
  ]);

  productoSeleccionado = signal<Producto | null>(null);

  seleccionar(producto: Producto) {
    this.productoSeleccionado.set(producto);
    console.log('📦 [Moderno] Producto seleccionado:', producto);
  }
}
