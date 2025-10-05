import { Component, computed, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { LoggerService } from './services/logger.service';
import { ConfigService, APP_CONFIG, AppConfig } from './services/config.service';

/**
 * EJERCICIO 3 - VERSIÓN MODERNA: Inyección de Dependencias con inject() + Modificadores
 *
 * 🎯 TU OBJETIVO:
 * Dominar la función inject() de Angular 20 con todos sus modificadores
 * (@Optional, @Self, @SkipSelf) y combinarla con Signals para estado reactivo.
 *
 * 📝 TAREAS:
 * 1. Inyectar servicios usando inject() (TODO 1-3)
 * 2. Usar modificadores de inyección (TODO 4-5)
 * 3. Crear signals para el estado reactivo (TODO 6)
 * 4. Implementar computed signals (TODO 7-8)
 * 5. Completar métodos del componente (TODO 9-12)
 */

@Component({
  selector: 'app-ejercicio3-di-moderno',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div class="ejercicio-card">
      <h2>✨ Ejercicio 3: DI - Versión Moderna</h2>
      <p class="subtitle">inject() function + Signals - ¡Completa los TODOs!</p>

      <div class="section">
        <h3>Servicios Inyectados:</h3>
        <ul>
          <li><strong>LoggerService:</strong> {{ isLoggerAvailable() ? '✅ Disponible' : '❌ No disponible' }}</li>
          <li><strong>ConfigService:</strong> {{ isConfigAvailable() ? '✅ Disponible' : '❌ No disponible' }}</li>
        </ul>
      </div>

      <div class="section">
        <h3>Configuración Actual (Signal):</h3>
        <pre>{{ currentConfig() | json }}</pre>
      </div>

      <div class="section">
        <h3>Acciones:</h3>
        <div class="button-group">
          <button (click)="logMessage()">
            Crear Log
          </button>
          <button (click)="showLogs()">
            Ver Logs ({{ logsCount() }})
          </button>
          <button (click)="clearLogs()">
            Limpiar Logs
          </button>
        </div>
      </div>

      <div class="section">
        <h3>Logs Recientes (Signal):</h3>
        <div class="logs-container">
          @for (log of recentLogs(); track log) {
            <div class="log-entry">{{ log }}</div>
          } @empty {
            <div class="no-logs">No hay logs aún</div>
          }
        </div>
      </div>

      <!-- Nueva sección: Jerarquía de Inyección -->
      <div class="section hierarchy-section">
        <h3>🔍 Jerarquía de Inyección (Modificadores):</h3>
        <ul>
          <li>
            <strong>Logger (normal):</strong> {{ isLoggerAvailable() ? '✅' : '❌' }}
            <code>inject(LoggerService, {{ '{' }} optional: true {{ '}' }})</code>
          </li>
          <li>
            <strong>Logger (self):</strong> {{ isSelfLoggerAvailable() ? '✅ Solo en este componente' : '❌ No en este componente' }}
            <code>inject(LoggerService, {{ '{' }} self: true {{ '}' }})</code>
          </li>
          <li>
            <strong>Config (normal):</strong> {{ isConfigAvailable() ? '✅' : '❌' }}
            <code>inject(ConfigService)</code>
          </li>
          <li>
            <strong>Config (skipSelf):</strong> {{ isParentConfigAvailable() ? '✅ Del componente padre' : '❌ Sin padre' }}
            <code>inject(ConfigService, {{ '{' }} skipSelf: true {{ '}' }})</code>
          </li>
        </ul>
        <div class="hint-box">
          💡 <strong>Tip:</strong> Los modificadores ayudan a controlar DÓNDE buscar dependencias en la jerarquía de componentes.
        </div>
      </div>

      <div class="success-box">
        <h3>✅ Ventajas del enfoque moderno:</h3>
        <ul>
          <li>Function injection: <code>inject(Service)</code> más flexible</li>
          <li>Sin constructor: código más limpio</li>
          <li>Inyección condicional: <code>inject(Service, {{ '{' }} optional: true {{ '}' }})</code></li>
          <li><strong>Modificadores:</strong> <code>{{ '{' }} self: true {{ '}' }}</code>, <code>{{ '{' }} skipSelf: true {{ '}' }}</code></li>
          <li>Combinación con Signals para reactividad</li>
          <li>Más fácil de testear y refactorizar</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .ejercicio-card {
      background: #f0f8ff;
      border-radius: 8px;
      padding: 20px;
    }

    h2 {
      color: #1976d2;
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
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }

    button:hover {
      background: #1565c0;
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

    .success-box {
      background: #d4edda;
      padding: 15px;
      border-radius: 4px;
    }

    .success-box h3 {
      margin-top: 0;
      color: #155724;
    }

    .success-box ul {
      margin: 10px 0 0 0;
      padding-left: 20px;
    }

    .success-box li {
      color: #155724;
      list-style: disc;
    }

    code {
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
    }

    .hierarchy-section {
      background: #fff9e6;
    }

    .hierarchy-section ul li {
      margin: 10px 0;
      line-height: 1.6;
    }

    .hint-box {
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      margin-top: 15px;
      border: 1px dashed #ffc107;
    }
  `]
})
export class Ejercicio3DIModerno {
  // TODO 1: Inyecta LoggerService usando inject()
  // Usa: private logger = inject(LoggerService, { optional: true });
  // El { optional: true } hace que el servicio sea opcional
  private logger: LoggerService | null = null; // TODO: Reemplazar con inject()

  // TODO 2: Inyecta ConfigService usando inject()
  private config: ConfigService | null = null; // TODO: Reemplazar con inject()

  // TODO 3: Inyecta APP_CONFIG token usando inject()
  // Usa: private appConfig = inject(APP_CONFIG, { optional: true });
  private appConfig: AppConfig | null = null; // TODO: Reemplazar con inject()

  // ========== MODIFICADORES DE INYECCIÓN ==========

  // TODO 4: Inyecta LoggerService con { self: true }
  // Este logger SOLO se buscará en el inyector de este componente
  // Si no está en providers de este componente, será null
  // private selfLogger = inject(LoggerService, { self: true, optional: true });
  private selfLogger: LoggerService | null = null;

  // TODO 5: Inyecta ConfigService con { skipSelf: true }
  // Este config SALTARÁ el inyector de este componente y buscará en el padre
  // Útil para obtener configuración del componente padre
  // private parentConfig = inject(ConfigService, { skipSelf: true, optional: true });
  private parentConfig: ConfigService | null = null;

  // TODO 6: Crea signals para el estado reactivo
  // - recentLogs = signal<string[]>([])
  // - logsCount = signal(0)
  // - currentConfig = signal<AppConfig>({ ... valores por defecto ... })
  recentLogs = signal<string[]>([]);
  logsCount = signal(0);
  currentConfig = signal<AppConfig>({
    apiUrl: 'N/A',
    timeout: 0,
    retries: 0,
    environment: 'development'
  });

  // TODO 7: Crea computed signals para verificar disponibilidad de servicios
  // isLoggerAvailable = computed(() => this.logger !== null);
  // isConfigAvailable = computed(() => this.config !== null);
  isLoggerAvailable = computed(() => false); // TODO: Implementar
  isConfigAvailable = computed(() => false); // TODO: Implementar

  // TODO 8: Crea computed signals para mostrar jerarquía de inyección
  // isSelfLoggerAvailable = computed(() => this.selfLogger !== null);
  // isParentConfigAvailable = computed(() => this.parentConfig !== null);
  isSelfLoggerAvailable = computed(() => false);
  isParentConfigAvailable = computed(() => false);

  constructor() {
    console.log('✅ [MODERNO] Ejercicio 3 - DI con inject() + Modificadores');

    // Inicialización (ya implementado como referencia)
    if (this.logger) {
      this.logger.log('Componente DI Moderno inicializado');
      this.updateLogs();
    }

    if (this.config) {
      this.currentConfig.set(this.config.getConfig());
    } else if (this.appConfig) {
      this.currentConfig.set(this.appConfig);
    }

    // Demostración de jerarquía
    if (this.selfLogger) {
      this.selfLogger.log('[SELF] Logger encontrado en este componente');
    }

    if (this.parentConfig) {
      console.log('[SKIP_SELF] Config del padre:', this.parentConfig.getConfig());
    }
  }

  // TODO 9: Implementa logMessage
  // - Verifica que logger exista
  // - Crea un log con mensaje de prueba
  // - Actualiza los signals llamando a updateLogs()
  logMessage() {
    console.log('TODO: Implementar logMessage');
  }

  // TODO 10: Implementa showLogs
  // - Verifica que logger exista
  // - Obtiene todos los logs
  // - Muestra alert con el total y contenido
  showLogs() {
    console.log('TODO: Implementar showLogs');
  }

  // TODO 11: Implementa clearLogs
  // - Verifica que logger exista
  // - Limpia los logs
  // - Actualiza los signals
  clearLogs() {
    console.log('TODO: Implementar clearLogs');
  }

  // TODO 12: Implementa updateLogs (método privado)
  // - Obtiene los logs del logger service
  // - Actualiza recentLogs signal con los últimos 5 logs (reversed)
  // - Actualiza logsCount signal con el total
  private updateLogs() {
    console.log('TODO: Implementar updateLogs');
  }
}

/**
 * RESUMEN DE TODOs - EJERCICIO 3 MEJORADO:
 *
 * Total: 12 TODOs (antes: 10)
 *
 * Parte 1: Inyección Básica (TODO 1-3)
 * - inject() para servicios y tokens
 *
 * Parte 2: Modificadores (TODO 4-5) ← NUEVO
 * - { self: true } para buscar solo en este componente
 * - { skipSelf: true } para saltar este componente
 *
 * Parte 3: Signals (TODO 6-8)
 * - Signals de estado
 * - Computed signals para disponibilidad
 * - Computed signals para jerarquía ← NUEVO
 *
 * Parte 4: Métodos (TODO 9-12)
 * - Implementación de funcionalidades
 */
