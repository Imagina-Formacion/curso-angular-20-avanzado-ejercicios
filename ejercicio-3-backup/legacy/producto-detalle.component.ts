import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

/**
 * VERSIÓN LEGACY - Componente sin standalone
 * Debe declararse en NgModule
 */
@Component({
  selector: 'app-producto-detalle',
  template: `
    <div style="background: #f0f0f0; padding: 15px; margin: 10px 0;">
      <h3>Detalle del Producto (Legacy)</h3>

      <div *ngIf="producto">
        <p><strong>ID:</strong> {{ producto.id }}</p>
        <p><strong>Nombre:</strong> {{ producto.nombre }}</p>
        <p><strong>Precio:</strong> ${{ producto.precio }}</p>
        <p><strong>Stock:</strong> {{ producto.stock }}</p>

        <div>
          <label>Cantidad: </label>
          <input
            type="number"
            [(ngModel)]="cantidad"
            min="1"
            [max]="producto.stock"
            style="width: 60px; padding: 5px;"
          />
          <button (click)="agregar()" [disabled]="cantidad > producto.stock">
            Agregar al carrito
          </button>
        </div>

        <button (click)="cerrarDetalle()" style="margin-top: 10px;">
          Cerrar
        </button>

        <p *ngIf="cantidad > producto.stock" style="color: red;">
          No hay suficiente stock
        </p>
      </div>
    </div>
  `
})
export class ProductoDetalleComponent {
  @Input() producto: Producto | null = null;
  @Output() cerrar = new EventEmitter<void>();

  cantidad = 1;

  agregar() {
    if (this.producto && this.cantidad <= this.producto.stock) {
      console.log('🛒 [Legacy] Agregado al carrito:', {
        producto: this.producto.nombre,
        cantidad: this.cantidad
      });
      alert(`${this.cantidad} x ${this.producto.nombre} agregado al carrito`);
    }
  }

  cerrarDetalle() {
    this.cerrar.emit();
    console.log('✖️ [Legacy] Detalle cerrado');
  }
}
