import { Injectable } from '@angular/core';

/**
 * Servicio Logger simple para demostrar DI
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private logs: string[] = [];

  log(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    this.logs.push(logMessage);
    console.log('📝', logMessage);
  }

  getLogs(): string[] {
    return [...this.logs];
  }

  clear() {
    this.logs = [];
    console.log('🗑️ Logs cleared');
  }
}
