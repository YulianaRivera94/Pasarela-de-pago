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

  useEffect(() => {
    // Cargar productos desde tu backend
    fetch('http://localhost:5000/api/productos/pago')
      .then(response => response.json())
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error cargando productos:', error);
        setCargando(false);
      });
  }, []);

  const iniciarPago = (productoId: number) => {
    fetch('http://localhost:5000/api/crear-preferencia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productoId }),
    })
      .then(response => response.json())
      .then(data => {
        window.location.href = data.url;
      })
      .catch(error => console.error('Error iniciando pago:', error));
  };

  if (cargando) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tienda con MercadoPago</h1>
      </header>
      <main>
        <div className="productos-container">
          {productos.map(producto => (
            <div key={producto.id} className="producto-card">
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p className="precio">${producto.precio}</p>
              <button onClick={() => iniciarPago(producto.id)}>
                Comprar ahora
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
