import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponentModerno } from './app.component';

/**
 * VERSIÓN MODERNA - Bootstrap con bootstrapApplication
 *
 * Ventajas:
 * - No necesita NgModule
 * - Configuración funcional con providers
 * - Más simple y directo
 */
bootstrapApplication(AppComponentModerno, {
  providers: [
    provideHttpClient()
    // Aquí irían otros providers como provideRouter(), etc.
  ]
})
  .then(() => {
    console.log('✅ [Moderno] Aplicación standalone iniciada');
  })
  .catch(err => console.error(err));
