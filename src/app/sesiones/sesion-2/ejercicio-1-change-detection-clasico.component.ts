// ejercicio-1-change-detection-clasico.component.ts
// VERSIÓN CLÁSICA: Usando ChangeDetectionStrategy.Default con Zone.js

import { Component, ChangeDetectionStrategy } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-ejercicio-1-cd-clasico',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div>
      <h3>Ejercicio 1: Change Detection - Versión Clásica (Default)</h3>

      <div style="background: #f8d7da; padding: 10px; border-radius: 4px; margin-bottom: 15px;">
        <p style="margin: 5px 0;"><strong>Total productos:</strong> {{ products.length }}</p>
        <p style="margin: 5px 0;"><strong>Total precio (getter):</strong> &#36;{{ getTotalPrice() }}</p>
        <p style="margin: 5px 0; font-size: 12px;">👆 El getter se ejecuta constantemente</p>
      </div>

      <button (click)="addProduct()">Agregar Producto</button>
      <button (click)="updatePriceMutation()">Mutación (funciona)</button>
      <button (click)="updatePriceImmutable()">Inmutable (funciona)</button>

      <div class="product-list">
        <div *ngFor="let product of products" class="product">
          <strong>{{ product.name }}</strong> - &#36;{{ product.price }}
        </div>
      </div>

      <div style="background: #f0f0f0; padding: 10px; border-radius: 4px; margin-top: 15px;">
        <p style="margin: 5px 0; font-size: 13px;">
          ⚠️ <strong>Observa en consola:</strong><br>
          • getTotalPrice() se ejecuta constantemente (incluso sin cambios)<br>
          • Ambos métodos funcionan pero con bajo rendimiento<br>
          • Default strategy = Chequea todo en cada evento
        </p>
      </div>
    </div>
  `,
  styles: [`
    .product-list { margin-top: 15px; }
    .product { padding: 8px; background: #f0f0f0; margin: 5px 0; border-radius: 4px; }
    button { margin: 5px; padding: 8px 15px; }
  `]
})
export class Ejercicio1CdClasicoComponent {
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Mouse', price: 50 }
  ];

  addProduct() {
    // TODO: Implementa la lógica para agregar un nuevo producto al array
    // Pista: Usa push() para agregar al array
    const newProduct: Product = {
      id: this.products.length + 1,
      name: `Producto ${this.products.length + 1}`,
      price: Math.floor(Math.random() * 500)
    };
    // TODO: Agrega newProduct al array products
    console.log('Clásico: Producto agregado');
  }

  // ❌ MALA PRÁCTICA: Mutación directa del objeto
  updatePriceMutation() {
    if (this.products.length > 0) {
      // TODO: Incrementa el precio del primer producto en 10
      // Pista: this.products[0].price += 10
      console.log('Clásico: Precio mutado (puede no detectarse con OnPush)');
    }
  }

  // ✅ BUENA PRÁCTICA: Actualización inmutable
  updatePriceImmutable() {
    if (this.products.length > 0) {
      // TODO: Crea un nuevo array con el primer producto actualizado
      // Pista: Usa map() y spread operator {...p, price: p.price + 10}
      console.log('Clásico: Precio actualizado (inmutable)');
    }
  }

  // ⚠️ Este getter se ejecuta en CADA change detection
  getTotalPrice(): number {
    console.log('🔴 Clásico: getTotalPrice() ejecutado');
    // TODO: Calcula y retorna la suma de todos los precios
    // Pista: Usa reduce() para sumar los precios
    return 0;
  }
}
