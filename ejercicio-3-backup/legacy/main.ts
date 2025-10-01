import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

/**
 * VERSIÓN LEGACY - Bootstrap con NgModule
 */
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    console.log('✅ [Legacy] Aplicación iniciada con NgModule');
  })
  .catch(err => console.error(err));
