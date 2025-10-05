import { Component, Optional, Inject } from '@angular/core';
import { LoggerService } from './services/logger.service';
import { NotificationService } from './services/notification.service';
import { APP_CONFIG, AppConfig } from './services/config.service';
import { FEATURE_CONFIG, FeatureConfig, provideFeatureClassic } from './services/feature.providers';

/**
 * EJERCICIO 5 - VERSIÓN CLÁSICA: Functional Providers Pattern
 *
 * Esta es la implementación COMPLETA del enfoque clásico.
 * Muestra cómo usar functional providers para configurar servicios.
 *
 * Características:
 * - Functional providers con provideFeature()
 * - Configuración dinámica de servicios
 * - InjectionToken para configuración
 */

@Component({
  selector: 'app-ejercicio5-providers-clasico',
  standalone: false,
  providers: [
    // Configuramos la feature con providers funcionales
    ...provideFeatureClassic({
      enableLogging: true,
      enableNotifications: true,
      apiUrl: 'https://api-clasico.example.com'
    })
  ],
  template: `
    <div class="ejercicio-card">
      <h2>⚙️ Ejercicio 5: Providers - Versión Clásica</h2>
      <p class="subtitle">Functional Providers Pattern</p>

      <div class="section">
        <h3>Configuración de Feature:</h3>
        <div *ngIf="featureConfig">
          <p><strong>Enable Logging:</strong> {{ featureConfig.enableLogging ? 'Sí' : 'No' }}</p>
          <p><strong>Enable Notifications:</strong> {{ featureConfig.enableNotifications ? 'Sí' : 'No' }}</p>
          <p *ngIf="featureConfig.apiUrl"><strong>API URL:</strong> {{ featureConfig.apiUrl }}</p>
        </div>
        <p *ngIf="!featureConfig" class="warning">Feature config no disponible</p>
      </div>

      <div class="section">
        <h3>Servicios Disponibles:</h3>
        <ul>
          <li>
            <strong>LoggerService:</strong>
            {{ logger ? '✅ Habilitado' : '❌ Deshabilitado' }}
          </li>
          <li>
            <strong>NotificationService:</strong>
            {{ notification ? '✅ Habilitado' : '❌ Deshabilitado' }}
          </li>
          <li>
            <strong>AppConfig:</strong>
            {{ appConfig ? '✅ Configurado' : '❌ No configurado' }}
          </li>
        </ul>
      </div>

      <div class="section" *ngIf="appConfig">
        <h3>Configuración de API:</h3>
        <p><strong>API URL:</strong> {{ appConfig.apiUrl }}</p>
        <p><strong>Timeout:</strong> {{ appConfig.timeout }}ms</p>
        <p><strong>Retries:</strong> {{ appConfig.retries }}</p>
        <p><strong>Environment:</strong> {{ appConfig.environment }}</p>
      </div>

      <div class="section">
        <h3>Acciones:</h3>
        <div class="button-group">
          <button (click)="testLogger()" [disabled]="!logger">
            Test Logger
          </button>
          <button (click)="testNotification()" [disabled]="!notification">
            Test Notification
          </button>
          <button (click)="showAll()">
            Ver Todo
          </button>
        </div>
      </div>

      <div class="info-box">
        <h3>💡 Functional Providers Pattern:</h3>
        <ul>
          <li>Encapsula configuración de servicios relacionados</li>
          <li>Permite habilitar/deshabilitar features dinámicamente</li>
          <li>Facilita reutilización en diferentes módulos</li>
          <li>Mejor organización del código de providers</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .ejercicio-card {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 20px;
    }

    h2 {
      color: #333;
      margin-bottom: 5px;
    }

    .subtitle {
      color: #666;
      font-style: italic;
      margin-bottom: 20px;
    }

    .section {
      background: white;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
    }

    h3 {
      margin-top: 0;
      color: #333;
      font-size: 16px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 10px 0;
    }

    li {
      padding: 5px 0;
    }

    pre {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      margin: 10px 0 0 0;
      font-size: 12px;
    }

    .warning {
      color: #ff9800;
      font-style: italic;
    }

    .button-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    button {
      padding: 10px 20px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }

    button:hover:not(:disabled) {
      background: #45a049;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .info-box {
      background: #fff3cd;
      padding: 15px;
      border-radius: 4px;
    }

    .info-box h3 {
      margin-top: 0;
      color: #856404;
    }

    .info-box ul {
      margin: 10px 0 0 0;
      padding-left: 20px;
    }

    .info-box li {
      color: #856404;
      list-style: disc;
    }
  `]
})
export class Ejercicio5ProvidersClasico {
  featureConfig: FeatureConfig | null = null;
  appConfig: AppConfig | null = null;

  constructor(
    @Optional() @Inject(FEATURE_CONFIG) featureConfig: FeatureConfig | null,
    @Optional() @Inject(APP_CONFIG) appConfig: AppConfig | null,
    @Optional() public logger: LoggerService | null,
    @Optional() public notification: NotificationService | null
  ) {
    console.log('🔴 [CLÁSICO] Ejercicio 5 - Functional Providers Pattern');

    this.featureConfig = featureConfig;
    this.appConfig = appConfig;

    if (this.logger) {
      this.logger.log('Componente Providers Clásico inicializado');
    }

    if (this.notification) {
      this.notification.show('Feature habilitada con providers funcionales', 'success');
    }
  }

  testLogger() {
    if (this.logger) {
      this.logger.log(`Test de logger - ${new Date().toLocaleTimeString()}`);
      alert('Log creado. Revisa la consola.');
    }
  }

  testNotification() {
    if (this.notification) {
      const types: Array<'info' | 'success' | 'error'> = ['info', 'success', 'error'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      this.notification.show(`Notificación de prueba - ${randomType}`, randomType);
      alert(`Notificación creada (${randomType}). Revisa la consola.`);
    }
  }

  showAll() {
    let message = '=== ESTADO DEL COMPONENTE ===\n\n';

    message += 'Feature Config:\n';
    message += JSON.stringify(this.featureConfig, null, 2) + '\n\n';

    message += 'App Config:\n';
    message += JSON.stringify(this.appConfig, null, 2) + '\n\n';

    message += 'Servicios:\n';
    message += `- Logger: ${this.logger ? 'Habilitado' : 'Deshabilitado'}\n`;
    message += `- Notification: ${this.notification ? 'Habilitado' : 'Deshabilitado'}\n`;

    if (this.logger) {
      message += `\nLogs totales: ${this.logger.getLogs().length}`;
    }

    if (this.notification) {
      message += `\nNotificaciones totales: ${this.notification.getAll().length}`;
    }

    alert(message);
  }
}
