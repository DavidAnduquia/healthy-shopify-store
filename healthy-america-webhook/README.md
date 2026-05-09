# Healthy America Webhook Integration

## Objetivo
Servicio para recibir webhooks de Shopify (orders/paid) y enviar datos transformados a herramientas de marketing externas.

## Setup Rápido

### 1. Instalación
```bash
git clone https://github.com/tu-repo/healthy-america-webhook.git
cd healthy-america-webhook
npm install
```

### 2. Configuración
```bash
# Copiar .env.example a .env
cp .env.example .env

# Editar .env con tus valores
SHOPIFY_WEBHOOK_SECRET=tu_secreto_real
WEBHOOK_URL=https://tu-endpoint-externo.com/webhook
PORT=3000
```

### 3. Ejecución
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `SHOPIFY_WEBHOOK_SECRET` | Secreto del webhook de Shopify | `whsec_xxx...` |
| `WEBHOOK_URL` | Endpoint destino para datos transformados | `https://webhook.site/abc123` |
| `PORT` | Puerto del servidor (opcional) | `3000` |

## Endpoints

### POST /webhook/orders/paid
Recibe webhooks de Shopify cuando un pedido es pagado.

**Payload de entrada:** Objeto Order de Shopify
**Payload de salida:** JSON transformado y enriquecido

```json
{
  "event_type": "order_paid",
  "timestamp": "2024-05-09T14:30:00Z",
  "customer": {
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "phone": "+57 300 123 4567"
  },
  "order": {
    "id": 123456789,
    "number": "#1001",
    "total": 150000,
    "currency": "COP",
    "created_at": "2024-05-09T14:25:00Z",
    "shipping_address": {
      "city": "Cali",
      "province": "Valle del Cauca",
      "country": "Colombia"
    }
  },
  "products": [
    {
      "product_id": 987654321,
      "name": "Proteína Whey",
      "quantity": 2,
      "price": 75000,
      "total": 150000,
      "variant": "Chocolate 1kg"
    }
  ],
  "enrichment": {
    "isFirstTimeCustomer": true,
    "totalOrders": 3,
    "lastOrderDate": "2024-04-15T10:30:00Z"
  }
}
```

### GET /health
Endpoint para health checks del servicio.

```json
{
  "status": "healthy",
  "timestamp": "2024-05-09T14:30:00Z",
  "version": "1.0.0"
}
```

## Seguridad

### Validación HMAC
- **Obligatoria:** Todos los webhooks son validados con HMAC SHA-256
- **Rechazo:** Webhooks sin firma válida reciben HTTP 401
- **Logging:** Todos los intentos son registrados

### Rate Limiting
- Implementar si es necesario para producción

## Manejo de Errores

### Reintentos Exponenciales
- **Intento 1:** Inmediato
- **Intento 2:** 2 segundos después
- **Intento 3:** 4 segundos después
- **Máximo:** 3 intentos

### Logging
- **Nivel:** Info para desarrollo, Error para producción
- **Formato:** JSON estructurado
- **Destino:** Consola y archivo de logs (opcional)

## Pruebas Locales

### Con Ngrok
```bash
# Exponer servidor local
ngrok http 3000

# Configurar webhook en Shopify hacia URL de ngrok
# https://abc123.ngrok.io/webhook/orders/paid
```

### Prueba Manual
```bash
# Enviar webhook de prueba
curl -X POST http://localhost:3000/webhook/orders/paid \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Hmac-Sha256: test_hmac" \
  -d '{"test": true}'
```

## Deploy

### Heroku
```bash
git push heroku main
heroku config:set SHOPIFY_WEBHOOK_SECRET=tu_secreto
heroku config:set WEBHOOK_URL=tu_endpoint
```
 
## 🔍 Debugging

### Logs Útiles
```bash
# Ver logs en tiempo real
npm run dev

# Buscar errores específicos
grep "HMAC verification failed" logs/app.log
grep "Failed to send webhook" logs/app.log
```

### Variables de Debug
```javascript
// Agregar al inicio de server.js
const DEBUG = process.env.NODE_ENV !== 'production';

if (DEBUG) {
  console.log('🐛 Debug mode enabled');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
}
```

## Monitoreo (Opcional)

### Métricas Sugeridas
- **Uptime:** Tiempo que el servicio está activo
- **Webhooks recibidos:** Contador de webhooks exitosos
- **Errores:** Tasa de error por hora
- **Latencia:** Tiempo de respuesta del endpoint externo

## Soporte

### Problemas Comunes
1. **HMAC verification failed** → Verificar secreto en .env
2. **Cannot read property 'customer'** → Validar estructura del payload
3. **Connection refused** → Verificar que el servidor esté corriendo

### Contacto
- **Issues:** Crear issue en GitHub
- **Emergencias:** Email del equipo de desarrollo

**Versión:** 1.0.0  
**Última actualización:** 9 de mayo de 2024
