// ejercicio-6-profiling-clasico.component.ts
// VERSIÓN CLÁSICA: Problema de performance - operaciones costosas

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

@Component({
  selector: 'app-ejercicio-6-profiling-clasico',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Default, // Default = problema
  template: `
    <div class="exercise-container">
      <h3>🔴 Ejercicio 6: Profiling - Clásico (Con Problemas)</h3>

      <div class="info-box warning">
        <p><strong>⚠️ Este componente tiene problemas de performance:</strong></p>
        <ul>
          <li>Getters se ejecutan en CADA change detection</li>
          <li>Filtros y cálculos se ejecutan constantemente</li>
          <li>No hay memoización ni optimización</li>
          <li>Change Detection Default = CD en todo el árbol</li>
        </ul>
      </div>

      <div class="controls">
        <button (click)="addProducts(10)" class="btn">➕ Agregar 10 Productos</button>
        <button (click)="addProducts(100)" class="btn">➕ Agregar 100 Productos</button>
        <button (click)="clearProducts()" class="btn btn-danger">🗑️ Limpiar</button>
        <button (click)="toggleCategory()" class="btn">🔄 Cambiar Categoría</button>
      </div>

      <div class="stats">
        <p><strong>Total Productos:</strong> {{ products.length }}</p>
        <p><strong>Categoría Actual:</strong> {{ currentCategory }}</p>
        <p><strong>Productos Filtrados:</strong> {{ filteredProducts.length }}</p>
        <p><strong>Precio Total:</strong> {{ totalPrice | number:'1.2-2' }}€</p>
        <p><strong>Promedio:</strong> {{ averagePrice | number:'1.2-2' }}€</p>
      </div>

      <div class="console-section">
        <p><strong>📊 Abre la consola (F12) y observa:</strong></p>
        <ul>
          <li>Cuántas veces se ejecuta cada getter</li>
          <li>Los getters se ejecutan CONSTANTEMENTE</li>
          <li>Incluso cuando NO cambias nada</li>
        </ul>
        <p class="highlight">💡 <strong>Tip:</strong> Usa Angular DevTools Profiler para ver el impacto</p>
      </div>

      <div class="warning-box">
        <p><strong>🐌 Operaciones costosas identificadas:</strong></p>
        <ol>
          <li><code>filteredProducts</code>: Filter en array grande</li>
          <li><code>totalPrice</code>: Reduce en array filtrado</li>
          <li><code>averagePrice</code>: Cálculo basado en totalPrice</li>
          <li><code>sortedProducts</code>: Sort en cada CD</li>
        </ol>
        <p class="danger">❌ Todos estos se ejecutan en CADA change detection!</p>
      </div>

      <div class="products-list">
        <h4>Productos (mostrando primeros 10):</h4>
        <div *ngFor="let product of sortedProducts.slice(0, 10); trackBy: trackById" class="product-item">
          <span class="product-name">{{ product.name }}</span>
          <span class="product-price">{{ product.price }}€</span>
          <span class="product-category">{{ product.category }}</span>
        </div>
        <div *ngIf="products.length === 0" class="empty">
          Sin productos
        </div>
      </div>

      <div class="profiling-tips">
        <h4>🔍 Cómo usar Angular DevTools para profiling:</h4>
        <ol>
          <li>Abre Chrome DevTools (F12)</li>
          <li>Ve a la pestaña "Angular" (instala extension si no la ves)</li>
          <li>Click en "Profiler"</li>
          <li>Click en el botón "Record" (⏺️)</li>
          <li>Interactúa con los botones de arriba</li>
          <li>Click en "Stop" (⏹️)</li>
          <li>Analiza los componentes que tardan >16ms</li>
        </ol>
        <p class="highlight">
          ⏱️ <strong>Regla de oro:</strong> Componentes que tardan >16ms causan "jank" (lag visual)
        </p>
      </div>
    </div>
  `,
  styles: [`
    .exercise-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .info-box {
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .info-box.warning {
      background: #fff3cd;
    }
    .controls {
      margin: 20px 0;
    }
    .btn {
      margin: 5px;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background: #0d6efd;
      color: white;
      cursor: pointer;
      font-size: 14px;
    }
    .btn-danger {
      background: #dc3545;
    }
    .stats {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .stats p {
      margin: 8px 0;
    }
    .console-section {
      background: #e7f3ff;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .warning-box {
      background: #f8d7da;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .warning-box code {
      background: #fff;
      padding: 2px 6px;
      border-radius: 3px;
      color: #d63384;
    }
    .danger {
      color: #dc3545;
      font-weight: bold;
    }
    .products-list {
      margin: 20px 0;
    }
    .product-item {
      padding: 10px;
      background: #fff;
      border: 1px solid #ddd;
      margin: 5px 0;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .product-name {
      flex: 2;
      font-weight: 500;
    }
    .product-price {
      flex: 1;
      color: #198754;
      font-weight: bold;
    }
    .product-category {
      flex: 1;
      color: #6c757d;
      font-size: 12px;
    }
    .empty {
      text-align: center;
      padding: 40px;
      color: #6c757d;
    }
    .profiling-tips {
      background: #d1e7dd;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .profiling-tips ol {
      margin-left: 20px;
    }
    .profiling-tips li {
      margin: 8px 0;
    }
    .highlight {
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      margin-top: 10px;
    }
  `]
})
export class Ejercicio6ProfilingClasicoComponent {
  products: Product[] = [];
  currentCategory = 'Electronics';
  private productCounter = 1;

  constructor() {
    console.log('🔴 [CLÁSICO] Ejercicio 6 - Profiling inicializado');
    console.log('⚠️ OBSERVA: Los getters se ejecutarán CONSTANTEMENTE');

    // Agregar algunos productos iniciales
    this.addProducts(20);
  }

  // ❌ PROBLEMA 1: Getter que se ejecuta en cada CD
  get filteredProducts(): Product[] {
    console.log('🔴 GETTER filteredProducts ejecutado'); // Verás esto MUCHAS veces

    // Simular operación costosa
    const start = performance.now();

    const filtered = this.products.filter(p => p.category === this.currentCategory);

    const duration = performance.now() - start;
    if (duration > 1) {
      console.warn(`⚠️ filteredProducts tardó ${duration.toFixed(2)}ms`);
    }

    return filtered;
  }

  // ❌ PROBLEMA 2: Getter que depende de otro getter
  get totalPrice(): number {
    console.log('🔴 GETTER totalPrice ejecutado');

    const start = performance.now();

    const total = this.filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);

    const duration = performance.now() - start;
    if (duration > 1) {
      console.warn(`⚠️ totalPrice tardó ${duration.toFixed(2)}ms`);
    }

    return total;
  }

  // ❌ PROBLEMA 3: Getter con cálculo adicional
  get averagePrice(): number {
    console.log('🔴 GETTER averagePrice ejecutado');

    const filtered = this.filteredProducts;
    return filtered.length > 0 ? this.totalPrice / filtered.length : 0;
  }

  // ❌ PROBLEMA 4: Sort en cada CD
  get sortedProducts(): Product[] {
    console.log('🔴 GETTER sortedProducts ejecutado');

    const start = performance.now();

    // Sort es costoso en arrays grandes
    const sorted = [...this.filteredProducts].sort((a, b) => b.price - a.price);

    const duration = performance.now() - start;
    if (duration > 1) {
      console.warn(`⚠️ sortedProducts tardó ${duration.toFixed(2)}ms`);
    }

    return sorted;
  }

  addProducts(count: number) {
    console.log(`➕ Agregando ${count} productos...`);

    const categories = ['Electronics', 'Books', 'Clothing', 'Food', 'Toys'];

    for (let i = 0; i < count; i++) {
      this.products.push({
        id: this.productCounter++,
        name: `Producto ${this.productCounter}`,
        price: Math.random() * 100 + 10,
        category: categories[Math.floor(Math.random() * categories.length)],
        stock: Math.floor(Math.random() * 50) + 1
      });
    }

    console.log(`✅ Total productos: ${this.products.length}`);
  }

  clearProducts() {
    this.products = [];
    this.productCounter = 1;
    console.log('🗑️ Productos limpiados');
  }

  toggleCategory() {
    const categories = ['Electronics', 'Books', 'Clothing', 'Food', 'Toys'];
    const currentIndex = categories.indexOf(this.currentCategory);
    this.currentCategory = categories[(currentIndex + 1) % categories.length];
    console.log(`🔄 Categoría cambiada a: ${this.currentCategory}`);
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }
}
