const mercadopago = require('mercadopago');
const client = require('../config/mercadopago');

// Datos de ejemplo para productos
const productos = [
  { 
    id: 1, 
    nombre: 'Producto 1', 
    descripcion: 'Descripción del producto 1', 
    precio: 100 
  },
  { 
    id: 2, 
    nombre: 'Producto 2', 
    descripcion: 'Descripción del producto 2', 
    precio: 200 
  },
  { 
    id: 3, 
    nombre: 'Producto 3', 
    descripcion: 'Descripción del producto 3', 
    precio: 300 
  }
];

// Obtener todos los productos
exports.getProductos = (req, res) => {
  res.json(productos);
};

// Procesar pago
exports.procesarPago = async (req, res) => {
  try {
    const { productoId } = req.body;
    
    // Encontrar el producto seleccionado
    const producto = productos.find(p => p.id === parseInt(productoId));
    
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    // Crear preferencia de pago en MercadoPago
    const preference = {
      items: [
        {
          title: producto.nombre,
          unit_price: producto.precio,
          quantity: 1,
        }
      ],
      back_urls: {
        success: "http://localhost:5173/success",
        failure: "http://localhost:5173/failure",
        pending: "http://localhost:5173/pending"
      },
      auto_return: "approved",
    };
    
    // Esta línea podría necesitar ajustes según la versión actual de la API de MercadoPago
    const { Preference } = mercadopago;
    const preferenceClient = new Preference(client);
    const result = await preferenceClient.create({ body: preference });
    
    return res.json({
      id: result.id,
      url: result.init_point
    });
    
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Esta es la ruta original que tenías, puedes mantenerla si la necesitas
exports.rutaPago = (req, res) => {
  res.send('Pago recibido');
};