import { Component, computed, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { LoggerService } from './services/logger.service';
import { NotificationService } from './services/notification.service';
import { APP_CONFIG, AppConfig } from './services/config.service';
import { FEATURE_CONFIG, FeatureConfig, provideFeatureModern, provideFeatureClassic } from './services/feature.providers';

/**
 * EJERCICIO 5 - VERSIÓN MODERNA: Functional Providers + inject()
 *
 * 🎯 TU OBJETIVO:
 * Aprender a usar functional providers combinados con inject()
 * y Signals para configuración reactiva de servicios.
 *
 * 📝 TAREAS:
 * 1. Inyectar servicios y tokens con inject() (TODO 1-4)
 * 2. Crear signals para estado reactivo (TODO 5-7)
 * 3. Implementar métodos del componente (TODO 8-10)
 */

@Component({
  selector: 'app-ejercicio5-providers-moderno',
  standalone: true,
  imports: [JsonPipe],
  providers: [
    // Configuramos la feature con providers funcionales clásicos (mismo patrón)
    // Nota: provideFeatureModern retorna EnvironmentProviders que solo se usa en main.ts
    ...provideFeatureClassic({
      enableLogging: true,
      enableNotifications: true,
      apiUrl: 'https://api-moderno.example.com'
    })
  ],
  template: `
    <div class="ejercicio-card">
      <h2>✨ Ejercicio 5: Providers - Versión Moderna</h2>
      <p class="subtitle">Functional Providers + inject() - ¡Completa los TODOs!</p>

      <div class="section">
        <h3>Configuración de Feature (Signal):</h3>
        @if (featureConfig()) {
          <pre>{{ featureConfig() | json }}</pre>
        } @else {
          <p class="warning">Feature config no disponible</p>
        }
      </div>

      <div class="section">
        <h3>Servicios Disponibles:</h3>
        <ul>
          <li>
            <strong>LoggerService:</strong>
            {{ isLoggerAvailable() ? '✅ Habilitado' : '❌ Deshabilitado' }}
          </li>
          <li>
            <strong>NotificationService:</strong>
            {{ isNotificationAvailable() ? '✅ Habilitado' : '❌ Deshabilitado' }}
          </li>
          <li>
            <strong>AppConfig:</strong>
            {{ isAppConfigAvailable() ? '✅ Configurado' : '❌ No configurado' }}
          </li>
        </ul>
      </div>

      @if (appConfig()) {
        <div class="section">
          <h3>Configuración de API (Signal):</h3>
          <pre>{{ appConfig() | json }}</pre>
        </div>
      }

      <div class="section">
        <h3>Acciones:</h3>
        <div class="button-group">
          <button (click)="testLogger()" [disabled]="!isLoggerAvailable()">
            Test Logger
          </button>
          <button (click)="testNotification()" [disabled]="!isNotificationAvailable()">
            Test Notification
          </button>
          <button (click)="showAll()">
            Ver Todo
          </button>
        </div>
      </div>

      <div class="success-box">
        <h3>✅ Ventajas del enfoque moderno:</h3>
        <ul>
          <li>inject() más flexible que constructor injection</li>
          <li>makeEnvironmentProviders() para mejor tree-shaking</li>
          <li>Signals para configuración reactiva</li>
          <li>Código más limpio y mantenible</li>
          <li>Fácil de testear y refactorizar</li>
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
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }

    button:hover:not(:disabled) {
      background: #1565c0;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
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
  `]
})
export class Ejercicio5ProvidersModerno {
  // TODO 1: Inyecta FEATURE_CONFIG token usando inject()
  // private featureConfigValue = inject(FEATURE_CONFIG, { optional: true });
  private featureConfigValue: FeatureConfig | null = null; // TODO: Reemplazar

  // TODO 2: Inyecta APP_CONFIG token usando inject()
  // private appConfigValue = inject(APP_CONFIG, { optional: true });
  private appConfigValue: AppConfig | null = null; // TODO: Reemplazar

  // TODO 3: Inyecta LoggerService usando inject()
  // private logger = inject(LoggerService, { optional: true });
  private logger: LoggerService | null = null; // TODO: Reemplazar

  // TODO 4: Inyecta NotificationService usando inject()
  // private notification = inject(NotificationService, { optional: true });
  private notification: NotificationService | null = null; // TODO: Reemplazar

  // TODO 5: Crea signals para las configuraciones
  // featureConfig = signal<FeatureConfig | null>(this.featureConfigValue);
  // appConfig = signal<AppConfig | null>(this.appConfigValue);
  featureConfig = signal<FeatureConfig | null>(null); // TODO: Inicializar con valor inyectado
  appConfig = signal<AppConfig | null>(null); // TODO: Inicializar con valor inyectado

  // TODO 6: Crea computed signals para verificar disponibilidad
  // isLoggerAvailable = computed(() => this.logger !== null);
  // isNotificationAvailable = computed(() => this.notification !== null);
  // isAppConfigAvailable = computed(() => this.appConfig() !== null);
  isLoggerAvailable = computed(() => false); // TODO: Implementar
  isNotificationAvailable = computed(() => false); // TODO: Implementar
  isAppConfigAvailable = computed(() => false); // TODO: Implementar

  constructor() {
    console.log('✅ [MODERNO] Ejercicio 5 - Functional Providers + inject()');

    // TODO 7: Inicializa los servicios si están disponibles
    // - Si logger existe, hacer log inicial
    // - Si notification existe, mostrar notificación de bienvenida
    // Pista: Verifica this.logger y this.notification
  }

  // TODO 8: Implementa testLogger()
  // - Verifica que logger esté disponible
  // - Crea un log con timestamp
  // - Muestra alert confirmando
  testLogger() {
    console.log('TODO: Implementar testLogger');
  }

  // TODO 9: Implementa testNotification()
  // - Verifica que notification esté disponible
  // - Crea una notificación aleatoria (info, success, error)
  // - Muestra alert con el tipo de notificación
  testNotification() {
    console.log('TODO: Implementar testNotification');
  }

  // TODO 10: Implementa showAll()
  // - Construye un mensaje con toda la información:
  //   * Feature config (usa featureConfig signal)
  //   * App config (usa appConfig signal)
  //   * Estado de servicios (usa computed signals)
  //   * Total de logs si logger está disponible
  //   * Total de notificaciones si notification está disponible
  // - Muestra alert con el mensaje completo
  showAll() {
    console.log('TODO: Implementar showAll');
  }
}
