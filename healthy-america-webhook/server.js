const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.raw({ type: 'application/json' }));
app.use(cors());

// Validación HMAC obligatoria de Shopify
function verifyShopifyWebhook(req, res, next) {
  const hmac = req.get('X-Shopify-Hmac-Sha256');
  const body = req.body;
  
  if (!hmac || !body) {
    return res.status(400).send('Missing HMAC or body');
  }
  
  const calculatedHmac = crypto
    .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('hex');
  
  if (hmac !== calculatedHmac) {
    console.error('HMAC verification failed');
    return res.status(401).send('Unauthorized');
  }
  
  console.log('HMAC verification successful');
  next();
}

// Función para enriquecer datos con Admin API (Bonus)
async function enrichCustomerData(customerEmail) {
  try {
    // Aquí iría la llamada GraphQL a Shopify Admin API
    const query = `
      query getCustomer($email: String!) {
        customer(email: $email) {
          orders(first: 5, reverse: true) {
            edges {
              node {
                id
                processedAt
                totalPriceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          numberOfOrders
        }
      }
    `;
    
    // Simulación para pruebas - en producción usarías Shopify Admin API
    return {
      isFirstTimeCustomer: Math.random() > 0.5,
      totalOrders: Math.floor(Math.random() * 10) + 1,
      lastOrderDate: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Error enriching customer data:', error);
    return null;
  }
}

// Manejo de errores con reintentos
async function sendToWebhook(data, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'HealthyAmerica-Webhook/1.0'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        console.log(`Data sent successfully on attempt ${attempt}`);
        return true;
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      
      if (attempt === retries) {
        console.error('All retries exhausted');
        return false;
      }
      
      // Espera exponencial entre reintentos
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}

// Endpoint principal para orders/paid
app.post('/webhook/orders/paid', verifyShopifyWebhook, async (req, res) => {
  try {
    console.log('Received orders/paid webhook');
    
    const orderData = JSON.parse(req.body);
    
    // Validar que sea un pedido pagado
    if (orderData.financial_status !== 'paid') {
      return res.status(400).send('Order not paid');
    }
    
    // Transformar payload
    const transformedData = {
      event_type: 'order_paid',
      timestamp: new Date().toISOString(),
      customer: {
        name: `${orderData.customer.first_name} ${orderData.customer.last_name}`,
        email: orderData.customer.email,
        phone: orderData.customer.phone || null
      },
      order: {
        id: orderData.id,
        number: orderData.order_number || orderData.name,
        total: orderData.total_price,
        currency: orderData.currency,
        created_at: orderData.created_at,
        shipping_address: {
          city: orderData.shipping_address?.city || 'Unknown',
          province: orderData.shipping_address?.province || 'Unknown',
          country: orderData.shipping_address?.country || 'Unknown'
        }
      },
      products: orderData.line_items.map(item => ({
        product_id: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
        variant: item.variant_title || 'Default'
      })),
      metadata: {
        gateway: orderData.payment_gateway_names?.[0] || 'Unknown',
        discount_codes: orderData.discount_codes || [],
        tags: orderData.tags || []
      }
    };
    
    // Enriquecer con datos del cliente (Bonus)
    if (orderData.customer?.email) {
      const enrichedData = await enrichCustomerData(orderData.customer.email);
      if (enrichedData) {
        transformedData.customer.enrichment = enrichedData;
      }
    }
    
    // Enviar a endpoint externo con manejo de errores
    const success = await sendToWebhook(transformedData);
    
    if (success) {
      console.log('Webhook processed successfully');
      return res.status(200).send('OK');
    } else {
      console.error('Failed to send webhook data');
      return res.status(500).send('Failed to process webhook');
    }
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(400).send('Bad Request');
  }
});

// Endpoint de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Manejo global de errores
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Healthy America Webhook Server running on port ${PORT}`);
  console.log(`Webhook endpoint: http://localhost:${PORT}/webhook/orders/paid`);
});
