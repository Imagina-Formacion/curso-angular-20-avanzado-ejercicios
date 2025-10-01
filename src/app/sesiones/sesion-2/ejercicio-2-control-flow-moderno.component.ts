// ejercicio-2-control-flow-moderno.component.ts
// VERSIÓN MODERNA: Usando @if, @for, @switch (Angular 17+)

import { Component, signal } from '@angular/core';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
}

@Component({
  selector: 'app-ejercicio-2-cf-moderno',
  standalone: true,
  template: `
    <div>
      <h3>Ejercicio 2: Control Flow - Versión Moderna (&#64;if, &#64;for, &#64;switch)</h3>

      <button (click)="toggleLoading()">{{ isLoading() ? 'Detener' : 'Iniciar' }} Carga</button>
      <button (click)="loadUsers()">Cargar Usuarios</button>
      <button (click)="clearUsers()">Limpiar</button>

      <hr>

      <!-- @if con @else - Más legible que *ngIf -->
      @if (isLoading()) {
        <p>⏳ Cargando usuarios...</p>
      } @else if (users().length === 0) {
        <p>📭 No hay usuarios. Presiona "Cargar Usuarios"</p>
      } @else {
        <p>✅ {{ users().length }} usuarios cargados</p>

        <!-- Filtros -->
        <div>
          <label>Vista: </label>
          <button (click)="viewMode.set('list')">Lista</button>
          <button (click)="viewMode.set('grid')">Grid</button>
        </div>

        <!-- @switch para cambiar vista - Más claro que [ngSwitch] -->
        @switch (viewMode()) {
          @case ('list') {
            <div class="list-view">
              <!-- @for con track obligatorio - Mejor performance -->
              @for (user of users(); track user.id) {
                <div class="user-card">
                  <strong>{{ user.name }}</strong>
                  <span [class]="'badge ' + user.role">{{ user.role }}</span>
                  @if (!user.isActive) {
                    <span class="inactive">Inactivo</span>
                  }
                </div>
              } @empty {
                <p>No hay usuarios</p>
              }
            </div>
          }

          @case ('grid') {
            <div class="grid-view">
              @for (user of users(); track user.id) {
                <div class="user-grid">
                  <div class="avatar">{{ user.name.charAt(0) }}</div>
                  <p>{{ user.name }}</p>
                  <span [class]="'badge ' + user.role">{{ user.role }}</span>
                </div>
              }
            </div>
          }
        }
      }

      <p>💡 Moderno: Sintaxis más limpia sin directivas (*) ni ng-template</p>
    </div>
  `,
  styles: [`
    button { margin: 5px; padding: 8px 15px; }
    .user-card { padding: 10px; background: #e7f3ff; margin: 5px 0; border-radius: 4px; }
    .grid-view { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .user-grid { padding: 15px; background: #e7f3ff; text-align: center; border-radius: 4px; }
    .avatar { width: 50px; height: 50px; background: #007bff; color: white; border-radius: 50%;
              display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; }
    .badge { padding: 3px 8px; border-radius: 10px; font-size: 12px; margin-left: 10px; }
    .badge.admin { background: #dc3545; color: white; }
    .badge.editor { background: #ffc107; }
    .badge.viewer { background: #6c757d; color: white; }
    .inactive { color: #999; margin-left: 10px; }
  `]
})
export class Ejercicio2CfModernoComponent {
  // 💡 SIGNALS: Estado reactivo
  isLoading = signal(false);
  users = signal<User[]>([]);
  viewMode = signal<'list' | 'grid'>('list');

  toggleLoading() {
    this.isLoading.update(v => !v);
    if (this.isLoading()) {
      setTimeout(() => this.isLoading.set(false), 2000);
    }
    console.log('Moderno: Loading =', this.isLoading());
  }

  loadUsers() {
    this.users.set([
      { id: 1, name: 'Juan Pérez', role: 'admin', isActive: true },
      { id: 2, name: 'María García', role: 'editor', isActive: true },
      { id: 3, name: 'Carlos López', role: 'viewer', isActive: false },
      { id: 4, name: 'Ana Martínez', role: 'editor', isActive: true }
    ]);
    console.log('Moderno: Usuarios cargados');
  }

  clearUsers() {
    this.users.set([]);
    console.log('Moderno: Usuarios limpiados');
  }

  // 💡 No necesita trackBy function, usa track en @for directamente
}
