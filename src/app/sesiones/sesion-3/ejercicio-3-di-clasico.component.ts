import { Component, Optional, Self, SkipSelf } from '@angular/core';
import { LoggerService } from './services/logger.service';
import { ConfigService, APP_CONFIG, AppConfig } from './services/config.service';

/**
 * EJERCICIO 3 - VERSIÓN CLÁSICA: Inyección de Dependencias con Constructor
 *
 * Esta es la implementación COMPLETA del enfoque clásico de DI.
 * Muestra cómo usar constructor injection con modificadores.
 *
 * Características:
 * - Constructor injection tradicional
 * - Uso de modificadores (@Optional, @Self, @SkipSelf)
 * - Inyección de tokens personalizados
 */

@Component({
  selector: 'app-ejercicio3-di-clasico',
  standalone: false,
  template: `
    <div class="ejercicio-card">
      <h2>🔌 Ejercicio 3: DI - Versión Clásica</h2>
      <p class="subtitle">Constructor Injection con modificadores</p>

      <div class="section">
        <h3>Servicios Inyectados:</h3>
        <ul>
          <li><strong>LoggerService:</strong> {{ logger ? '✅ Disponible' : '❌ No disponible' }}</li>
          <li><strong>ConfigService:</strong> {{ config ? '✅ Disponible' : '❌ No disponible' }}</li>
        </ul>
      </div>

      <div class="section">
        <h3>Configuración Actual:</h3>
        <pre>{{ configData | json }}</pre>
      </div>

      <div class="section">
        <h3>Acciones:</h3>
        <div class="button-group">
          <button (click)="logMessage()">
            Crear Log
          </button>
          <button (click)="showLogs()">
            Ver Logs ({{ logsCount }})
          </button>
          <button (click)="clearLogs()">
            Limpiar Logs
          </button>
        </div>
      </div>

      <div class="section">
        <h3>Logs Recientes:</h3>
        <div class="logs-container">
          <div *ngFor="let log of recentLogs" class="log-entry">
            {{ log }}
          </div>
          <div *ngIf="recentLogs.length === 0" class="no-logs">
            No hay logs aún
          </div>
        </div>
      </div>

      <div class="info-box">
        <h3>💡 Enfoque Clásico:</h3>
        <ul>
          <li>Constructor injection: <code>constructor(private service: Service)</code></li>
          <li>Modificadores: <code>@Optional()</code>, <code>@Self()</code>, <code>@SkipSelf()</code></li>
          <li>Tokens: <code>@Inject(TOKEN)</code></li>
          <li>Sintaxis verbosa y acoplada al constructor</li>
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

    button:hover {
      background: #45a049;
    }

    .logs-container {
      max-height: 200px;
      overflow-y: auto;
      background: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      margin-top: 10px;
    }

    .log-entry {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      font-family: monospace;
      font-size: 12px;
    }

    .log-entry:last-child {
      border-bottom: none;
    }

    .no-logs {
      text-align: center;
      color: #999;
      padding: 20px;
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

    code {
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
    }
  `]
})
export class Ejercicio3DIClasico {
  recentLogs: string[] = [];
  logsCount = 0;
  configData: AppConfig;

  // Constructor injection clásico
  // @Optional hace que el servicio sea opcional
  constructor(
    @Optional() public logger: LoggerService,
    @Optional() public config: ConfigService
  ) {
    console.log('🔴 [CLÁSICO] Ejercicio 3 - DI con constructor injection');

    // Verificar si los servicios están disponibles
    if (this.logger) {
      this.logger.log('Componente DI Clásico inicializado');
      this.updateLogs();
    }

    if (this.config) {
      this.configData = this.config.getConfig();
    } else {
      this.configData = {
        apiUrl: 'N/A',
        timeout: 0,
        retries: 0,
        environment: 'development'
      };
    }
  }

  logMessage() {
    if (this.logger) {
      this.logger.log(`Mensaje de prueba ${Date.now()}`);
      this.updateLogs();
    }
  }

  showLogs() {
    if (this.logger) {
      const logs = this.logger.getLogs();
      alert(`Total de logs: ${logs.length}\n\n${logs.join('\n')}`);
    }
  }

  clearLogs() {
    if (this.logger) {
      this.logger.clear();
      this.updateLogs();
    }
  }

  private updateLogs() {
    if (this.logger) {
      const allLogs = this.logger.getLogs();
      this.recentLogs = allLogs.slice(-5).reverse(); // Últimos 5 logs
      this.logsCount = allLogs.length;
    }
  }
}
