// src/config/mercadopago.js
const { MercadoPagoConfig } = require('mercadopago');

// Inicializa MercadoPago con tu ACCESS TOKEN
const client = new MercadoPagoConfig({ 
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
});

module.exports = client;