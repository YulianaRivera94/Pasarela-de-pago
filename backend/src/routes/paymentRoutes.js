const express = require('express');
const router = express.Router();
const { rutaPago } = require('../controllers/paymentController');

console.log('¿Qué es rutaPago?', rutaPago); // <- esto es clave

router.post('/pago', rutaPago);

module.exports = router;
