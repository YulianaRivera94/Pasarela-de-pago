import React, { useState, useEffect } from 'react';
import './App.css';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cargar productos desde el backend - ruta corregida
    fetch('http://localhost:5000/api/payments/productos')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error cargando productos:', error);
        setError('No se pudieron cargar los productos');
        setCargando(false);
      });
  }, []);

  const iniciarPago = (productoId: number) => {
    fetch('http://localhost:5000/api/payments/crear-preferencia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productoId }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        window.location.href = data.url;
      })
      .catch(error => {
        console.error('Error iniciando pago:', error);
        alert('Hubo un error al procesar el pago');
      });
  };

  if (cargando) {
    return <div className="App loading">Cargando productos...</div>;
  }

  if (error) {
    return <div className="App error">{error}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tienda con MercadoPago</h1>
      </header>
      <main>
        <div className="productos-container">
          {productos.length > 0 ? (
            productos.map(producto => (
              <div key={producto.id} className="producto-card">
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p className="precio">${producto.precio}</p>
                <button onClick={() => iniciarPago(producto.id)}>
                  Comprar ahora
                </button>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;