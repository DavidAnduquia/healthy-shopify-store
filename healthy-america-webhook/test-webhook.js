const crypto = require('crypto');

// Payload de prueba (simula pedido de Shopify)
const orderPayload = {
  id: "test_order_12345",
  order_number: "#1001",
  customer: {
    first_name: "Juan",
    last_name: "Pérez",
    email: "juan@ejemplo.com",
    phone: "+57 300 123 4567"
  },
  financial_status: "paid",
  total_price: "150000.00",
  currency: "COP",
  created_at: "2024-05-09T14:30:00Z",
  shipping_address: {
    city: "Cali",
    province: "Valle del Cauca",
    country: "Colombia"
  },
  line_items: [
    {
      product_id: "987654321",
      name: "Proteína Whey",
      quantity: 2,
      price: "75000.00",
      variant_title: "Chocolate 1kg"
    }
  ],
  payment_gateway_names: ["shopify_payments"],
  discount_codes: [],
  tags: "test,webhook"
};

// Generar HMAC para prueba
const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET || 'whsec_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6xxxxxxxx';
const payloadString = JSON.stringify(orderPayload);
const hmac = crypto.createHmac('sha256', webhookSecret).update(payloadString).digest('hex');

console.log('🚀 Enviando webhook de prueba...');
console.log('📋 Payload:', JSON.stringify(orderPayload, null, 2));
console.log('🔐 HMAC:', hmac);

// Enviar webhook
fetch('http://localhost:3000/webhook/orders/paid', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Hmac-Sha256': hmac,
    'X-Shopify-Topic': 'orders/paid',
    'X-Shopify-Shop-Domain': 'healthy-america-development.myshopify.com'
  },
  body: payloadString
})
.then(response => response.text())
.then(data => console.log('✅ Respuesta:', data))
.catch(error => console.error('❌ Error:', error));
