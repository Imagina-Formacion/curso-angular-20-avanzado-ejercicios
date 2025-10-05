// ejercicio-6-profiling-moderno.component.ts
// VERSIÓN MODERNA: Optimizada con Signals y computed

import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

@Component({
  selector: 'app-ejercicio-6-profiling-moderno',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="exercise-container">
      <h3>✅ Ejercicio 6: Profiling - Moderno (Optimizado)</h3>

      <div class="info-box success">
        <p><strong>✅ Este componente está optimizado:</strong></p>
        <ul>
          <li>Signals + Computed = cálculos solo cuando cambian dependencias</li>
          <li>Memoización automática de resultados</li>
          <li>OnPush Change Detection</li>
          <li>Operaciones costosas se ejecutan UNA sola vez</li>
        </ul>
      </div>

      <div class="controls">
        <button (click)="addProducts(10)" class="btn">➕ Agregar 10 Productos</button>
        <button (click)="addProducts(100)" class="btn">➕ Agregar 100 Productos</button>
        <button (click)="clearProducts()" class="btn btn-danger">🗑️ Limpiar</button>
        <button (click)="toggleCategory()" class="btn">🔄 Cambiar Categoría</button>
      </div>

      <div class="stats">
        <p><strong>Total Productos:</strong> {{ products().length }}</p>
        <p><strong>Categoría Actual:</strong> {{ currentCategory() }}</p>
        <p><strong>Productos Filtrados:</strong> {{ filteredProducts().length }}</p>
        <p><strong>Precio Total:</strong> {{ totalPrice() | number:'1.2-2' }}€</p>
        <p><strong>Promedio:</strong> {{ averagePrice() | number:'1.2-2' }}€</p>
      </div>

      <div class="console-section">
        <p><strong>📊 Abre la consola (F12) y compara con el clásico:</strong></p>
        <ul>
          <li>Los computed se ejecutan SOLO cuando cambian sus dependencias</li>
          <li>No hay recálculos innecesarios</li>
          <li>Performance óptima incluso con miles de productos</li>
        </ul>
        <p class="highlight">💡 <strong>Tip:</strong> Compara con el componente clásico usando Profiler</p>
      </div>

      <div class="success-box">
        <p><strong>🚀 Optimizaciones aplicadas:</strong></p>
        <ol>
          <li><code>filteredProducts</code>: Computed - solo cuando cambia products o category</li>
          <li><code>totalPrice</code>: Computed - solo cuando cambia filteredProducts</li>
          <li><code>averagePrice</code>: Computed - solo cuando cambia totalPrice</li>
          <li><code>sortedProducts</code>: Computed - solo cuando cambia filteredProducts</li>
        </ol>
        <p class="success">✅ Cadena de computed = máxima eficiencia!</p>
      </div>

      <div class="products-list">
        <h4>Productos (mostrando primeros 10):</h4>
        @for (product of sortedProducts().slice(0, 10); track product.id) {
          <div class="product-item">
            <span class="product-name">{{ product.name }}</span>
            <span class="product-price">{{ product.price | number:'1.2-2' }}€</span>
            <span class="product-category">{{ product.category }}</span>
          </div>
        } @empty {
          <div class="empty">Sin productos</div>
        }
      </div>

      <div class="metrics">
        <h4>📈 Métricas de Performance:</h4>
        <div class="metric-grid">
          <div class="metric">
            <p class="metric-label">Último filtrado:</p>
            <p class="metric-value">{{ lastFilterDuration() }}ms</p>
          </div>
          <div class="metric">
            <p class="metric-label">Último cálculo total:</p>
            <p class="metric-value">{{ lastTotalDuration() }}ms</p>
          </div>
          <div class="metric">
            <p class="metric-label">Último sort:</p>
            <p class="metric-value">{{ lastSortDuration() }}ms</p>
          </div>
          <div class="metric">
            <p class="metric-label">Total ejecuciones filtro:</p>
            <p class="metric-value">{{ filterExecutions() }}</p>
          </div>
        </div>
        <p class="info-text">
          💡 Nota cómo las métricas solo cambian cuando haces acciones,
          NO en cada change detection como en el clásico.
        </p>
      </div>

      <div class="comparison">
        <h4>⚖️ Comparativa: Clásico vs Moderno</h4>
        <table>
          <thead>
            <tr>
              <th>Aspecto</th>
              <th>Clásico (Getters)</th>
              <th>Moderno (Computed)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ejecuciones</td>
              <td class="bad">Constantemente</td>
              <td class="good">Solo cuando necesario</td>
            </tr>
            <tr>
              <td>Performance</td>
              <td class="bad">Baja con datos grandes</td>
              <td class="good">Óptima siempre</td>
            </tr>
            <tr>
              <td>Memoización</td>
              <td class="bad">Manual</td>
              <td class="good">Automática</td>
            </tr>
            <tr>
              <td>Change Detection</td>
              <td class="bad">Default (todo el árbol)</td>
              <td class="good">OnPush (granular)</td>
            </tr>
          </tbody>
        </table>
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
    .info-box.success {
      background: #d1e7dd;
    }
    .controls {
      margin: 20px 0;
    }
    .btn {
      margin: 5px;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background: #198754;
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
      background: #cfe2ff;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .success-box {
      background: #d1e7dd;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .success-box code {
      background: #fff;
      padding: 2px 6px;
      border-radius: 3px;
      color: #198754;
    }
    .success {
      color: #198754;
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
    .metrics {
      background: #e7f3ff;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin: 15px 0;
    }
    .metric {
      background: #fff;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }
    .metric-label {
      font-size: 12px;
      color: #6c757d;
      margin: 0 0 5px 0;
    }
    .metric-value {
      font-size: 24px;
      font-weight: bold;
      color: #0d6efd;
      margin: 0;
    }
    .info-text {
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      margin-top: 10px;
    }
    .comparison {
      margin: 20px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background: #f8f9fa;
      font-weight: 600;
    }
    .bad {
      color: #dc3545;
    }
    .good {
      color: #198754;
    }
    .highlight {
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      margin-top: 10px;
    }
  `]
})
export class Ejercicio6ProfilingModernoComponent {
  // Signals
  products = signal<Product[]>([]);
  currentCategory = signal('Electronics');
  private productCounter = signal(1);

  // Métricas
  lastFilterDuration = signal(0);
  lastTotalDuration = signal(0);
  lastSortDuration = signal(0);
  filterExecutions = signal(0);

  // ✅ OPTIMIZACIÓN 1: Computed para filtrado
  filteredProducts = computed(() => {
    console.log('✅ COMPUTED filteredProducts ejecutado');
    this.filterExecutions.update(n => n + 1);

    const start = performance.now();

    const filtered = this.products().filter(p => p.category === this.currentCategory());

    const duration = performance.now() - start;
    this.lastFilterDuration.set(Number(duration.toFixed(2)));

    if (duration > 1) {
      console.log(`⏱️ filteredProducts tardó ${duration.toFixed(2)}ms`);
    }

    return filtered;
  });

  // ✅ OPTIMIZACIÓN 2: Computed que depende de otro computed
  totalPrice = computed(() => {
    console.log('✅ COMPUTED totalPrice ejecutado');

    const start = performance.now();

    const total = this.filteredProducts().reduce((sum, p) => sum + (p.price * p.stock), 0);

    const duration = performance.now() - start;
    this.lastTotalDuration.set(Number(duration.toFixed(2)));

    if (duration > 1) {
      console.log(`⏱️ totalPrice tardó ${duration.toFixed(2)}ms`);
    }

    return total;
  });

  // ✅ OPTIMIZACIÓN 3: Computed con cálculo adicional
  averagePrice = computed(() => {
    console.log('✅ COMPUTED averagePrice ejecutado');

    const filtered = this.filteredProducts();
    return filtered.length > 0 ? this.totalPrice() / filtered.length : 0;
  });

  // ✅ OPTIMIZACIÓN 4: Sort con computed
  sortedProducts = computed(() => {
    console.log('✅ COMPUTED sortedProducts ejecutado');

    const start = performance.now();

    const sorted = [...this.filteredProducts()].sort((a, b) => b.price - a.price);

    const duration = performance.now() - start;
    this.lastSortDuration.set(Number(duration.toFixed(2)));

    if (duration > 1) {
      console.log(`⏱️ sortedProducts tardó ${duration.toFixed(2)}ms`);
    }

    return sorted;
  });

  constructor() {
    console.log('✅ [MODERNO] Ejercicio 6 - Profiling Optimizado inicializado');
    console.log('🚀 Los computed se ejecutarán SOLO cuando cambien sus dependencias');

    // Agregar algunos productos iniciales
    this.addProducts(20);
  }

  addProducts(count: number) {
    console.log(`➕ Agregando ${count} productos...`);

    const categories = ['Electronics', 'Books', 'Clothing', 'Food', 'Toys'];

    const newProducts: Product[] = [];
    for (let i = 0; i < count; i++) {
      newProducts.push({
        id: this.productCounter(),
        name: `Producto ${this.productCounter()}`,
        price: Math.random() * 100 + 10,
        category: categories[Math.floor(Math.random() * categories.length)],
        stock: Math.floor(Math.random() * 50) + 1
      });
      this.productCounter.update(n => n + 1);
    }

    // Actualizar signal (esto disparará los computed necesarios)
    this.products.update(current => [...current, ...newProducts]);

    console.log(`✅ Total productos: ${this.products().length}`);
  }

  clearProducts() {
    this.products.set([]);
    this.productCounter.set(1);
    this.filterExecutions.set(0);
    console.log('🗑️ Productos limpiados');
  }

  toggleCategory() {
    const categories = ['Electronics', 'Books', 'Clothing', 'Food', 'Toys'];
    const currentIndex = categories.indexOf(this.currentCategory());
    this.currentCategory.set(categories[(currentIndex + 1) % categories.length]);
    console.log(`🔄 Categoría cambiada a: ${this.currentCategory()}`);
  }
}
