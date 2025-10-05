import { Injectable } from '@angular/core';

/**
 * Servicio de notificaciones
 */
@Injectable()
export class NotificationService {
  private notifications: string[] = [];

  show(message: string, type: 'info' | 'success' | 'error' = 'info') {
    const notification = `[${type.toUpperCase()}] ${message}`;
    this.notifications.push(notification);
    console.log('🔔', notification);
  }

  getAll(): string[] {
    return [...this.notifications];
  }

  clear() {
    this.notifications = [];
  }
}
