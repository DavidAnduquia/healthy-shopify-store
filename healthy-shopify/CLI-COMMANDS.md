# Shopify CLI - Comandos Esenciales

## 🚀 Comandos Principales

### Desarrollo del Tema
```bash
# Iniciar servidor de desarrollo con recarga automática
shopify theme dev --store=healthy-america-development.myshopify.com

# Subir cambios al tema live
shopify theme push --store=healthy-america-development.myshopify.com

# Descargar tema actual del servidor
shopify theme pull --store=healthy-america-development.myshopify.com

# Ver lista de temas disponibles
shopify theme list --store=healthy-america-development.myshopify.com

# Publicar tema (hacerlo visible)
shopify theme publish --store=healthy-america-development.myshopify.com
```

### Sincronización y Deploy
```bash
# Sincronizar archivos locales con servidor
shopify theme push --store=healthy-america-development.myshopify.com --live

# Subir solo archivos modificados
shopify theme push --store=healthy-america-development.myshopify.com --only=changed

# Forzar actualización completa
shopify theme push --store=healthy-america-development.myshopify.com --allow-live
```

### Monitoreo y Debugging
```bash
# Ver logs del tema
shopify theme logs --store=healthy-america-development.myshopify.com

# Ver reporte de rendimiento
shopify theme report --store=healthy-america-development.myshopify.com

# Ver errores con detalle
shopify theme logs --store=healthy-america-development.myshopify.com --verbose

# Iniciar con modo debug
shopify theme dev --store=healthy-america-development.myshopify.com --verbose
```

### Gestión de Temas
```bash
# Crear nuevo tema
shopify theme create --name="Healthy America Theme" --url="https://github.com/DavidAnduquia/healthy-shopify-store"

# Duplicar tema existente
shopify theme duplicate --theme=ID_DEL_TEMA --name="Healthy America Copy"

# Eliminar tema
shopify theme delete --theme=ID_DEL_TEMA --store=healthy-america-development.myshopify.com
```

## 🔧 Comandos de Configuración

### Variables de Entorno
```bash
# Configurar tienda
export SHOPIFY_STORE=healthy-america-development.myshopify.com

# Configurar tema
export SHOPIFY_THEME_ID=ID_DEL_TEMA

# Configurar contraseña del tema
export SHOPIFY_THEME_PASSWORD=tu_contraseña
```

### Autenticación
```bash
# Iniciar sesión
shopify login --store=healthy-america-development.myshopify.com

# Cerrar sesión
shopify logout

# Ver información de la tienda
shopify info --store=healthy-america-development.myshopify.com
```

## 📊 Comandos de Análisis

### Análisis de Rendimiento
```bash
# Generar reporte Lighthouse
shopify theme report --store=healthy-america-development.myshopify.com --categories=performance,accessibility,best-practices,seo

# Análisis de liquid
shopify theme check --store=healthy-america-development.myshopify.com

# Ver tamaño de archivos
shopify theme size --store=healthy-america-development.myshopify.com
```

### Análisis de SEO
```bash
# Verificar meta tags
shopify metafields list --store=healthy-america-development.myshopify.com --type=PRODUCT

# Verificar URLs canónicas
shopify url list --store=healthy-america-development.myshopify.com
```

## 🔄 Comandos de Flujo de Trabajo

### Flujo de Desarrollo Típico
```bash
# 1. Iniciar desarrollo
shopify theme dev --store=healthy-america-development.myshopify.com

# 2. Hacer cambios en archivos locales
# Editar archivos en platform-healthy/dawn/

# 3. Subir cambios
shopify theme push --store=healthy-america-development.myshopify.com

# 4. Ver en vivo
# Visitar https://healthy-america-development.myshopify.com
```

### Flujo de Deploy a Producción
```bash
# 1. Preparar para producción
shopify theme push --store=healthy-america-development.myshopify.com --theme=production

# 2. Publicar cambios
shopify theme publish --store=healthy-america-development.myshopify.com --theme=production

# 3. Verificar estado
shopify theme list --store=healthy-america-development.myshopify.com --live
```

## 🐛 Comandos de Troubleshooting

### Problemas Comunes y Soluciones
```bash
# Problema: El tema no se actualiza
shopify theme dev --store=healthy-america-development.myshopify.com --live-reload

# Problema: Error de permisos
shopify theme push --store=healthy-america-development.myshopify.com --verbose

# Problema: Conflicto con tema live
shopify theme push --store=healthy-america-development.myshopify.com --allow-live

# Problema: Ver qué archivos cambiaron
shopify theme diff --store=healthy-america-development.myshopify.com

# Problema: Limpiar cache
shopify theme dev --store=healthy-america-development.myshopify.com --no-update
```

### Recuperación de Errores
```bash
# Ver último error
shopify theme logs --store=healthy-america-development.myshopify.com --tail=10

# Ver estado completo
shopify theme status --store=healthy-america-development.myshopify.com

# Restaurar versión anterior
shopify theme rollback --store=healthy-america-development.myshopify.com --theme=ID_ANTERIOR
```

## 📝 Comandos Avanzados

### Personalización del CLI
```bash
# Crear archivo de configuración
shopify config set --store=healthy-america-development.myshopify.com

# Ver configuración actual
shopify config get --store=healthy-america-development.myshopify.com

# Usar tema específico
shopify theme dev --store=healthy-america-development.myshopify.com --theme=ID_ESPECIFICO
```

### Integración con Herramientas Externas
```bash
# Conectar con GitHub Pages
shopify theme push --store=healthy-america-development.myshopify.com --repository=https://github.com/DavidAnduquia/healthy-shopify-store

# Integrar con Vercel
shopify theme push --store=healthy-america-development.myshopify.com --deploy=vercel

# Configurar webhook (para el Reto 3)
shopify webhook create --topic=orders/paid --address=https://tu-webhook-url.ngrok.io/webhook/orders/paid
```

## 🎯 Atajos y Alias Útiles

### Alias Recomendados
```bash
# Agregar al .bashrc o .zshrc
alias shopify-dev='shopify theme dev --store=healthy-america-development.myshopify.com'
alias shopify-push='shopify theme push --store=healthy-america-development.myshopify.com'
alias shopify-logs='shopify theme logs --store=healthy-america-development.myshopify.com'
```

### Scripts de Package.json Recomendados
```json
{
  "scripts": {
    "dev": "shopify theme dev --store=healthy-america-development.myshopify.com",
    "push": "shopify theme push --store=healthy-america-development.myshopify.com",
    "logs": "shopify theme logs --store=healthy-america-development.myshopify.com",
    "build": "shopify theme build --store=healthy-america-development.myshopify.com"
  }
}
```

---

**Nota**: Reemplaza `healthy-america-development.myshopify.com` con tu URL de tienda real. Estos comandos asumen que tienes Shopify CLI instalado y configurado.
