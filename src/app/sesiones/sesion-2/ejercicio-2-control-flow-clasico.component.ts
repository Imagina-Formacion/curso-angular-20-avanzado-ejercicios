// ejercicio-2-control-flow-clasico.component.ts
// VERSIÓN CLÁSICA: Usando *ngIf, *ngFor, *ngSwitch

import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
}

@Component({
  selector: 'app-ejercicio-2-cf-clasico',
  standalone: false,
  template: `
    <div>
      <h3>Ejercicio 2: Control Flow - Versión Clásica (*ngIf, *ngFor, *ngSwitch)</h3>

      <button (click)="toggleLoading()">{{ isLoading ? 'Detener' : 'Iniciar' }} Carga</button>
      <button (click)="loadUsers()">Cargar Usuarios</button>
      <button (click)="clearUsers()">Limpiar</button>

      <hr>

      <!-- *ngIf con else -->
      <div *ngIf="isLoading; else notLoading">
        <p>⏳ Cargando usuarios...</p>
      </div>

      <ng-template #notLoading>
        <div *ngIf="users.length === 0; else hasUsers">
          <p>📭 No hay usuarios. Presiona "Cargar Usuarios"</p>
        </div>
      </ng-template>

      <ng-template #hasUsers>
        <p>✅ {{ users.length }} usuarios cargados</p>

        <!-- Filtros con *ngSwitch -->
        <div>
          <label>Vista: </label>
          <button (click)="viewMode = 'list'">Lista</button>
          <button (click)="viewMode = 'grid'">Grid</button>
        </div>

        <!-- *ngSwitch para cambiar vista -->
        <div [ngSwitch]="viewMode">
          <div *ngSwitchCase="'list'" class="list-view">
            <!-- *ngFor para lista -->
            <div *ngFor="let user of users; trackBy: trackByUserId" class="user-card">
              <strong>{{ user.name }}</strong>
              <span [class]="'badge ' + user.role">{{ user.role }}</span>
              <span *ngIf="!user.isActive" class="inactive">Inactivo</span>
            </div>
          </div>

          <div *ngSwitchCase="'grid'" class="grid-view">
            <div *ngFor="let user of users; trackBy: trackByUserId" class="user-grid">
              <div class="avatar">{{ user.name.charAt(0) }}</div>
              <p>{{ user.name }}</p>
              <span [class]="'badge ' + user.role">{{ user.role }}</span>
            </div>
          </div>
        </div>
      </ng-template>

      <p>💡 Clásico: Usa directivas estructurales (*) y ng-template</p>
    </div>
  `,
  styles: [`
    button { margin: 5px; padding: 8px 15px; }
    .user-card { padding: 10px; background: #f0f0f0; margin: 5px 0; border-radius: 4px; }
    .grid-view { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .user-grid { padding: 15px; background: #f0f0f0; text-align: center; border-radius: 4px; }
    .avatar { width: 50px; height: 50px; background: #007bff; color: white; border-radius: 50%;
              display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; }
    .badge { padding: 3px 8px; border-radius: 10px; font-size: 12px; margin-left: 10px; }
    .badge.admin { background: #dc3545; color: white; }
    .badge.editor { background: #ffc107; }
    .badge.viewer { background: #6c757d; color: white; }
    .inactive { color: #999; margin-left: 10px; }
  `]
})
export class Ejercicio2CfClasicoComponent {
  isLoading = false;
  users: User[] = [];
  viewMode: 'list' | 'grid' = 'list';

  toggleLoading() {
    this.isLoading = !this.isLoading;
    if (this.isLoading) {
      setTimeout(() => this.isLoading = false, 2000);
    }
    console.log('Clásico: Loading =', this.isLoading);
  }

  loadUsers() {
    this.users = [
      { id: 1, name: 'Juan Pérez', role: 'admin', isActive: true },
      { id: 2, name: 'María García', role: 'editor', isActive: true },
      { id: 3, name: 'Carlos López', role: 'viewer', isActive: false },
      { id: 4, name: 'Ana Martínez', role: 'editor', isActive: true }
    ];
    console.log('Clásico: Usuarios cargados');
  }

  clearUsers() {
    this.users = [];
    console.log('Clásico: Usuarios limpiados');
  }

  // trackBy para optimizar *ngFor
  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
