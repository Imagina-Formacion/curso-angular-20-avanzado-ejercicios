# Ejercicio 3: Convertir NgModule a Standalone Components

## Objetivo
Migrar una aplicación basada en NgModules (legacy) a Standalone Components (moderna) con Signals.

## Conceptos a aprender
- Componentes standalone con `standalone: true`
- Imports directos en componentes
- Eliminación de NgModule
- Configuración moderna en `main.ts`
- `bootstrapApplication()` en lugar de `platformBrowserDynamic()`

## Archivos
- `legacy/` - Aplicación con NgModule
- `moderno/` - Aplicación con Standalone Components

## Ventajas de Standalone
- Menos boilerplate
- Imports más explícitos y claros
- Mejor tree-shaking
- Más fácil de entender y mantener
- Carga lazy loading simplificada
