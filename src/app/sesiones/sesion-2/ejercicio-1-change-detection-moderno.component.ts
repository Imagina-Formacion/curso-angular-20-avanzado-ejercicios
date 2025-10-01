// ejercicio-1-change-detection-moderno.component.ts
// VERSIÓN MODERNA: Usando OnPush con Signals

import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-ejercicio-1-cd-moderno',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h3>Ejercicio 1: Change Detection - Versión Moderna (OnPush + Signals)</h3>

      <div style="background: #fff3cd; padding: 10px; border-radius: 4px; margin-bottom: 15px;">
        <p style="margin: 5px 0;"><strong>Total productos:</strong> {{ products().length }}</p>
        <p style="margin: 5px 0;"><strong>Total precio (computed):</strong> &#36;{{ totalPrice() }}</p>
        <p style="margin: 5px 0; font-size: 12px;">👆 El computed solo se actualiza con inmutabilidad</p>
      </div>

      <button (click)="addProduct()">Agregar Producto</button>
      <button (click)="updatePriceImmutable()">✅ Inmutable (funciona bien)</button>
      <button (click)="updatePriceMutation()">⚠️ Mutación (computed NO se ejecuta)</button>

      <div class="product-list">
        @for (product of products(); track product.id) {
          <div class="product">
            <strong>{{ product.name }}</strong> - &#36;{{ product.price }}
          </div>
        }
      </div>

      <div style="background: #e7f3ff; padding: 10px; border-radius: 4px; margin-top: 15px;">
        <p style="margin: 5px 0; font-size: 13px;">
          💡 <strong>Observa en consola:</strong><br>
          • Con inmutabilidad: ves "🟢 computed ejecutado" y el total se actualiza<br>
          • Con mutación: el precio individual cambia pero el computed NO se ejecuta<br>
          • Resultado: Total desincronizado = BUG silencioso
        </p>
      </div>
    </div>
  `,
  styles: [`
    .product-list { margin-top: 15px; }
    .product { padding: 8px; background: #e7f3ff; margin: 5px 0; border-radius: 4px; }
    button { margin: 5px; padding: 8px 15px; }
  `]
})
export class Ejercicio1CdModernoComponent {
  // 💡 SIGNALS: Estado reactivo
  products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Mouse', price: 50 }
  ]);

  // 💡 COMPUTED: Solo se recalcula cuando cambia products()
  totalPrice = computed(() => {
    console.log('🟢 Moderno: totalPrice() computed ejecutado');
    return this.products().reduce((sum, p) => sum + p.price, 0);
  });

  addProduct() {
    const newProduct: Product = {
      id: this.products().length + 1,
      name: `Producto ${this.products().length + 1}`,
      price: Math.floor(Math.random() * 500)
    };
    // ✅ BUENA PRÁCTICA: Inmutabilidad automática con signals
    this.products.update(prods => [...prods, newProduct]);
    console.log('Moderno: Producto agregado');
  }

  // ✅ BUENA PRÁCTICA: Actualización inmutable
  updatePriceImmutable() {
    this.products.update(prods =>
      prods.map((p, i) => i === 0 ? { ...p, price: p.price + 10 } : p)
    );
    console.log('Moderno: Precio actualizado (inmutable)');
  }

  // ❌ MALA PRÁCTICA: Mutación - El precio se actualiza pero computed NO se ejecuta
  updatePriceMutation() {
    const prods = this.products();
    if (prods.length > 0) {
      prods[0].price += 10; // Muta el objeto pero no notifica cambios
      console.log('⚠️ Moderno: Precio mutado - Mira: totalPrice() computed NO se ejecutó!');
      console.log('   El precio cambió en pantalla pero el signal no detectó el cambio');
    }
  }
}
