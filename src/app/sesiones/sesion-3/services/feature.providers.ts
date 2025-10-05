import { Provider, InjectionToken, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { LoggerService } from './logger.service';
import { NotificationService } from './notification.service';
import { ConfigService, APP_CONFIG, AppConfig } from './config.service';

/**
 * Token para configuración de feature
 */
export interface FeatureConfig {
  enableLogging: boolean;
  enableNotifications: boolean;
  apiUrl?: string;
}

export const FEATURE_CONFIG = new InjectionToken<FeatureConfig>('feature.config');

/**
 * Functional Provider Pattern (Versión Clásica)
 * Provee un conjunto de servicios relacionados con configuración
 */
export function provideFeatureClassic(config: FeatureConfig): Provider[] {
  const providers: Provider[] = [
    { provide: FEATURE_CONFIG, useValue: config }
  ];

  if (config.enableLogging) {
    providers.push(LoggerService);
  }

  if (config.enableNotifications) {
    providers.push(NotificationService);
  }

  if (config.apiUrl) {
    providers.push({
      provide: APP_CONFIG,
      useValue: {
        apiUrl: config.apiUrl,
        timeout: 30000,
        retries: 3,
        environment: 'development'
      } as AppConfig
    });
  }

  return providers;
}

/**
 * Functional Provider Pattern (Versión Moderna)
 * Usa makeEnvironmentProviders para mejor tree-shaking
 */
export function provideFeatureModern(config: FeatureConfig): EnvironmentProviders {
  const providers: Provider[] = [
    { provide: FEATURE_CONFIG, useValue: config }
  ];

  if (config.enableLogging) {
    providers.push(LoggerService);
  }

  if (config.enableNotifications) {
    providers.push(NotificationService);
  }

  if (config.apiUrl) {
    providers.push({
      provide: APP_CONFIG,
      useValue: {
        apiUrl: config.apiUrl,
        timeout: 30000,
        retries: 3,
        environment: 'development'
      } as AppConfig
    });
  }

  return makeEnvironmentProviders(providers);
}
