// ejercicio-4-cd-manual-clasico.component.ts
// VERSIÓN CLÁSICA: Change Detection Manual con ChangeDetectorRef

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  id: number;
  message: string;
  timestamp: Date;
}

@Component({
  selector: 'app-ejercicio-4-cd-clasico',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="exercise-container">
      <h3>🔴 Ejercicio 4: Change Detection Manual - Clásico</h3>

      <div class="info-box">
        <p><strong>ChangeDetectorRef Methods:</strong></p>
        <ul>
          <li><code>markForCheck()</code> - Marca para próxima detección</li>
          <li><code>detach()</code> - Desconecta del árbol CD</li>
          <li><code>detectChanges()</code> - Fuerza detección inmediata</li>
        </ul>
      </div>

      <div class="controls">
        <button (click)="addNotification()">📬 Agregar Notificación</button>
        <button (click)="toggleDetach()">
          {{ isDetached ? '🔗 Reconectar CD' : '⛓️ Desconectar CD' }}
        </button>
        <button (click)="manualDetect()" [disabled]="!isDetached">
          🔄 Detectar Cambios Manualmente
        </button>
      </div>

      <div class="status">
        <p><strong>Estado CD:</strong>
          <span [style.color]="isDetached ? 'red' : 'green'">
            {{ isDetached ? '❌ Desconectado' : '✅ Conectado' }}
          </span>
        </p>
        <p><strong>Notificaciones:</strong> {{ notifications.length }}</p>
        <p><strong>Última actualización:</strong> {{ formatTime(lastUpdate) }}</p>
      </div>

      <div class="notifications">
        <div *ngFor="let notification of notifications; trackBy: trackById" class="notification">
          <strong>#{{ notification.id }}</strong> - {{ notification.message }}
          <small>({{ formatTime(notification.timestamp) }})</small>
        </div>
        <div *ngIf="notifications.length === 0" class="empty">
          Sin notificaciones
        </div>
      </div>

      <div class="warning-box">
        <p>⚠️ <strong>Observa:</strong></p>
        <ul>
          <li>Con CD conectado: Los cambios se reflejan automáticamente</li>
          <li>Con CD desconectado: Necesitas <code>detectChanges()</code> manual</li>
          <li>Útil para optimizar componentes con muchas actualizaciones</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .exercise-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .info-box {
      background: #e7f3ff;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .info-box code {
      background: #fff;
      padding: 2px 6px;
      border-radius: 3px;
      color: #d63384;
    }
    .controls {
      margin: 20px 0;
    }
    .controls button {
      margin: 5px;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background: #0d6efd;
      color: white;
    }
    .controls button:disabled {
      background: #6c757d;
      cursor: not-allowed;
    }
    .status {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .notifications {
      margin: 20px 0;
    }
    .notification {
      padding: 10px;
      background: #fff3cd;
      margin: 8px 0;
      border-radius: 4px;
    }
    .notification small {
      color: #666;
      margin-left: 10px;
    }
    .empty {
      padding: 20px;
      text-align: center;
      color: #6c757d;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .warning-box {
      background: #fff3cd;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
  `]
})
export class Ejercicio4CdClasicoComponent {
  notifications: Notification[] = [];
  isDetached = false;
  lastUpdate = new Date();
  private notificationId = 1;

  constructor(private cdr: ChangeDetectorRef) {
    console.log('🔴 [CLÁSICO] Ejercicio 4 - Change Detection Manual inicializado');
  }

  addNotification() {
    const notification: Notification = {
      id: this.notificationId++,
      message: `Notificación ${this.notificationId - 1}`,
      timestamp: new Date()
    };

    this.notifications = [...this.notifications, notification];
    this.lastUpdate = new Date();

    if (!this.isDetached) {
      // Con OnPush, necesitamos marcar para detección porque cambiamos un array
      this.cdr.markForCheck();
      console.log('🔴 markForCheck() llamado - CD programado para próximo ciclo');
    } else {
      console.log('⚠️ CD desconectado - Cambios NO se mostrarán hasta detectChanges()');
    }
  }

  toggleDetach() {
    if (this.isDetached) {
      // Reconectar al árbol de Change Detection
      this.cdr.reattach();
      this.isDetached = false;
      console.log('🔗 CD Reconectado - Cambios se detectarán automáticamente');

      // Forzar detección inmediata para actualizar la UI
      this.cdr.detectChanges();
    } else {
      // Desconectar del árbol de Change Detection
      this.cdr.detach();
      this.isDetached = true;
      console.log('⛓️ CD Desconectado - Cambios NO se detectarán automáticamente');
    }
  }

  manualDetect() {
    if (this.isDetached) {
      // Forzar detección manual
      this.cdr.detectChanges();
      console.log('🔄 detectChanges() llamado - UI actualizada manualmente');
    }
  }

  trackById(index: number, item: Notification): number {
    return item.id;
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
}
