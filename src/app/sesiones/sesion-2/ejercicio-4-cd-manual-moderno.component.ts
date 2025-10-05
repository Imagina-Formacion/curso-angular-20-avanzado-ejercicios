// ejercicio-4-cd-manual-moderno.component.ts
// VERSIÓN MODERNA: Con Signals no se necesita Change Detection manual

import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  id: number;
  message: string;
  timestamp: Date;
}

@Component({
  selector: 'app-ejercicio-4-cd-moderno',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="exercise-container">
      <h3>✅ Ejercicio 4: Change Detection Manual - Moderno (Signals)</h3>

      <div class="info-box success">
        <p><strong>🎯 Con Signals NO necesitas:</strong></p>
        <ul>
          <li>❌ <code>markForCheck()</code></li>
          <li>❌ <code>detach()</code></li>
          <li>❌ <code>detectChanges()</code></li>
          <li>✅ Los Signals actualizan automáticamente la UI</li>
        </ul>
      </div>

      <div class="controls">
        <button (click)="addNotification()">📬 Agregar Notificación</button>
        <button (click)="clearNotifications()">🗑️ Limpiar</button>
      </div>

      <div class="status">
        <p><strong>Estado CD:</strong>
          <span style="color: green">✅ Siempre sincronizado (Signals)</span>
        </p>
        <p><strong>Total notificaciones:</strong> {{ notificationsCount() }}</p>
        <p><strong>Última actualización:</strong> {{ lastUpdate() | date:'HH:mm:ss' }}</p>
        <p><strong>Notificaciones sin leer:</strong> {{ unreadCount() }}</p>
      </div>

      <div class="notifications">
        @for (notification of notifications(); track notification.id) {
          <div class="notification">
            <strong>#{{ notification.id }}</strong> - {{ notification.message }}
            <small>({{ notification.timestamp | date:'HH:mm:ss' }})</small>
          </div>
        } @empty {
          <div class="empty">Sin notificaciones</div>
        }
      </div>

      <div class="success-box">
        <p>✅ <strong>Ventajas de Signals:</strong></p>
        <ul>
          <li>Reactividad automática - Sin código manual de CD</li>
          <li>Computed signals para valores derivados</li>
          <li>Performance óptimo - Solo actualiza lo necesario</li>
          <li>Código más limpio y mantenible</li>
        </ul>
      </div>

      <div class="profiling-box">
        <p>🔍 <strong>Profiling con Angular DevTools:</strong></p>
        <ol>
          <li>Instala Angular DevTools en Chrome</li>
          <li>Abre DevTools → pestaña "Angular"</li>
          <li>Ve a "Profiler" → Inicia grabación</li>
          <li>Interactúa con los botones</li>
          <li>Detén grabación y analiza el flamegraph</li>
        </ol>
        <p><small>💡 Verás que Signals minimizan los change detection cycles</small></p>
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
      background: #198754;
      color: white;
    }
    .controls button:hover {
      background: #157347;
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
      background: #d1e7dd;
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
    .success-box {
      background: #d1e7dd;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .profiling-box {
      background: #e7f3ff;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
    }
    .profiling-box ol {
      margin: 10px 0;
      padding-left: 20px;
    }
  `]
})
export class Ejercicio4CdModernoComponent {
  // Signals para estado reactivo
  notifications = signal<Notification[]>([]);
  lastUpdate = signal<Date>(new Date());
  private notificationId = signal(1);

  // Computed signals - valores derivados automáticamente
  notificationsCount = computed(() => this.notifications().length);
  unreadCount = computed(() => this.notifications().filter(n => n.id > 0).length);

  constructor() {
    console.log('✅ [MODERNO] Ejercicio 4 - Signals: Change Detection automático');
  }

  addNotification() {
    const id = this.notificationId();
    const notification: Notification = {
      id,
      message: `Notificación ${id}`,
      timestamp: new Date()
    };

    // ✅ Signal update - UI se actualiza automáticamente
    this.notifications.update(current => [...current, notification]);
    this.lastUpdate.set(new Date());
    this.notificationId.update(n => n + 1);

    console.log('✅ Signal actualizado - UI sincronizada automáticamente');
    console.log('   No se necesita markForCheck, detach o detectChanges');
  }

  clearNotifications() {
    this.notifications.set([]);
    this.lastUpdate.set(new Date());
    console.log('🗑️ Notificaciones limpiadas - Signals actualizados');
  }
}
