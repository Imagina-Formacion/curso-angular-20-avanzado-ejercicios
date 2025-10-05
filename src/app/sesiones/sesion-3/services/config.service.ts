import { Injectable, InjectionToken } from '@angular/core';

/**
 * Interfaz para la configuración de la aplicación
 */
export interface AppConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
  environment: 'development' | 'production';
}

/**
 * InjectionToken para configuración
 */
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
  factory: () => ({
    apiUrl: 'https://api.example.com',
    timeout: 30000,
    retries: 3,
    environment: 'development'
  })
});

/**
 * Servicio de configuración
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig = {
    apiUrl: 'https://api.example.com',
    timeout: 30000,
    retries: 3,
    environment: 'development'
  };

  getConfig(): AppConfig {
    return { ...this.config };
  }

  updateConfig(updates: Partial<AppConfig>) {
    this.config = { ...this.config, ...updates };
  }
}
