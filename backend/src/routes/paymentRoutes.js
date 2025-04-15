const express = require('express');
const router = express.Router();
const { rutaPago, getProductos, procesarPago } = require('../controllers/paymentController');

// Ruta para obtener productos
router.get('/productos', getProductos);

// Ruta para procesar el pago
router.post('/crear-preferencia', procesarPago);

// Ruta original
router.post('/pago', rutaPago);

module.exports = router;