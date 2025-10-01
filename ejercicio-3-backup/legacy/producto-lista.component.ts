import { Component } from '@angular/core';

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
  selector: 'app-producto-lista',
  template: `
    <div style="border: 2px solid #ccc; padding: 15px; margin: 10px;">
      <h2>Lista de Productos (Legacy)</h2>

      <div *ngIf="productoSeleccionado; else noSeleccion">
        <app-producto-detalle
          [producto]="productoSeleccionado"
          (cerrar)="productoSeleccionado = null"
        ></app-producto-detalle>
      </div>

      <ng-template #noSeleccion>
        <div>
          <h3>Productos disponibles:</h3>
          <ul>
            <li *ngFor="let producto of productos">
              {{ producto.nombre }} - {{ producto.precio }}€
              (Stock: {{ producto.stock }})
              <button (click)="seleccionar(producto)">Ver detalle</button>
            </li>
          </ul>
        </div>
      </ng-template>

      <p>Total productos: {{ productos.length }}</p>
    </div>
  `
})
export class ProductoListaComponent {
  productos: Producto[] = [
    { id: 1, nombre: 'Laptop', precio: 1200, stock: 5 },
    { id: 2, nombre: 'Mouse', precio: 25, stock: 15 },
    { id: 3, nombre: 'Teclado', precio: 80, stock: 8 }
  ];

  productoSeleccionado: Producto | null = null;

  seleccionar(producto: Producto) {
    this.productoSeleccionado = producto;
    console.log('📦 [Legacy] Producto seleccionado:', producto);
  }
}
