# Instalación de Dependencias Node.js

## 📦 Requisitos del Sistema

### Node.js y npm
```bash
# Verificar Node.js instalado
node --version
# Requiere: v14.0.0 o superior

# Verificar npm instalado
npm --version
# Requiere: v6.0.0 o superior
```

### Shopify CLI
```bash
# Instalar Shopify CLI globalmente
npm install -g @shopify/cli

# Verificar instalación
shopify --version
```

## 🚀 Instalación del Proyecto

### 1. Clonar Repositorio
```bash
git clone https://github.com/DavidAnduquia/healthy-shopify-store.git
cd healthy-shopify-store/platform-healthy
```

### 2. Instalar Dependencias del Tema
```bash
# Navegar al directorio del tema Dawn
cd platform-healthy/dawn

# Instalar dependencias del tema (si package.json existe)
npm install

# Instalar Shopify CLI si no está disponible
npm install -g @shopify/cli
```

### 3. Instalar Dependencias del Webhook
```bash
# Navegar al directorio del webhook
cd healthy-america-webhook

# Instalar dependencias del webhook
npm install

# Crear archivo de configuración
cp .env.example .env
# Editar .env con credenciales reales
```

### 4. Configurar Variables de Entorno
```bash
# Para el tema Shopify
export SHOPIFY_STORE=healthy-america-development.myshopify.com
export SHOPIFY_THEME_PASSWORD=tu_theme_password

# Para el webhook
export SHOPIFY_WEBHOOK_SECRET=whsec_tu_secreto_real
export WEBHOOK_URL=https://tu-endpoint-externo.com/webhook
```

## 🔧 Configuración Específica

### Archivo .env para Webhook
```bash
# Copiar plantilla
cp healthy-america-webhook/.env.example healthy-america-webhook/.env

# Editar con valores reales
nano healthy-america-webhook/.env
```

**Variables requeridas:**
- `SHOPIFY_WEBHOOK_SECRET`: Secreto del webhook de Shopify
- `WEBHOOK_URL`: Endpoint externo para datos transformados
- `PORT`: Puerto del servidor (opcional, default: 3000)

### Configuración de Shopify CLI
```bash
# Iniciar sesión en Shopify
shopify login --store healthy-america-development.myshopify.com

# Configurar tema
shopify theme pull --store healthy-america-development.myshopify.com
```

## 📋 Verificación de Instalación

### Verificar Node.js
```bash
node --version
# Salida esperada: v18.17.0 o superior
```

### Verificar Shopify CLI
```bash
shopify --version
# Salida esperada: 3.0.0 o superior
```

### Verificar Dependencias del Tema
```bash
cd platform-healthy/dawn
npm list --depth=0
# Debería mostrar: express, dotenv, etc.
```

### Verificar Dependencias del Webhook
```bash
cd healthy-america-webhook
npm list --depth=0
# Debería mostrar: express, body-parser, cors, crypto, dotenv
```

## 🚨 Solución de Problemas Comunes

### Problema: "shopify command not found"
```bash
# Solución: Agregar al PATH
export PATH=$PATH:$(npm bin -g):$PATH
echo 'export PATH=$PATH:$(npm bin -g):$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Problema: "npm install permissions denied"
```bash
# Solución: Corregir permisos
sudo chown -R $(whoami) node_modules
npm install
```

### Problema: "HMAC verification failed"
```bash
# Solución: Verificar secreto en .env
cat healthy-america-webhook/.env
# Asegurar que coincida con el secreto de Shopify Admin
```

### Problema: "Cannot connect to Shopify"
```bash
# Solución: Verificar conexión y credenciales
shopify login --store healthy-america-development.myshopify.com
shopify theme list
```

## 🔄 Flujo Completo de Instalación

```bash
# 1. Clonar proyecto
git clone https://github.com/DavidAnduquia/healthy-shopify-store.git

# 2. Instalar dependencias del tema
cd platform-healthy/dawn && npm install

# 3. Instalar dependencias del webhook
cd ../healthy-america-webhook && npm install

# 4. Configurar variables de entorno
cp .env.example .env && nano .env

# 5. Iniciar desarrollo del tema
cd ../dawn && shopify theme dev --store healthy-america-development.myshopify.com

# 6. Iniciar webhook (en otra terminal)
cd ../healthy-america-webhook && npm start
```

## ✅ Verificación Final

### Comandos para verificar que todo funciona:
```bash
# Verificar servidor webhook
curl http://localhost:3000/health

# Verificar tema en desarrollo
curl https://healthy-america-development.myshopify.com/?preview_theme=ID

# Verificar webhook con ngrok
ngrok http 3000
```

---

**Nota**: Esta instalación asume que tienes Node.js 14+ y git instalados. Si no los tienes, instálalos antes de continuar.
