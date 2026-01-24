import React, { useState } from "react";
import "./App.css";

import menu from "./menu";
import TarjetaProducto from "./components/TarjetaProducto";
import ResumenVentas from "./components/ResumenVentas";
import BotonesAccion from "./components/Botones";
import ResumenModal from "./components/ResumenModal";

function App() {
  const [cantidades, setCantidades] = useState({});
  const [modoOscuro, setModoOscuro] = useState(false);
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [menuState, setMenuState] = useState(menu);

  const handleCantidadChange = (nombre, valor) => {
    setCantidades({ ...cantidades, [nombre]: parseInt(valor) || 0 });
  };

  const calcularTotal = () =>
    menuState.reduce((total, item) => {
      const cantidad = cantidades[item.nombre] || 0;
      return total + cantidad * item.precio;
    }, 0);

  const total = calcularTotal();
  const igic = +(total * 0.07).toFixed(2);
  const totalConImpuesto = +(total + igic).toFixed(2);

  const limpiarFormulario = () => setCantidades({});

  const hayProductosSeleccionados = () =>
    Object.values(cantidades).some((cantidad) => cantidad > 0);

  const confirmarVenta = () => {
    if (!hayProductosSeleccionados()) {
      alert("No hay productos para confirmar.");
      setMostrarResumen(false);
      return;
    }

    // Verificar si hay productos con stock insuficiente
    const productosSinStock = menuState.filter((item) => {
      const cantidad = cantidades[item.nombre] || 0;
      return cantidad > item.stock;
    });

    if (productosSinStock.length > 0) {
      const nombres = productosSinStock.map((p) => p.nombre).join(", ");
      alert(`❌ No hay stock suficiente para: ${nombres}`);
      return;
    }

    // Actualizar stock
    const nuevoMenu = menuState.map((item) => {
      const cantidadVendida = cantidades[item.nombre] || 0;
      return {
        ...item,
        stock: item.stock - cantidadVendida,
      };
    });

    setMenuState(nuevoMenu);

    // Detectar productos con stock bajo
    const productosBajos = nuevoMenu.filter((item) => item.stock <= 5 && item.stock > 0);
    if (productosBajos.length > 0) {
      const nombres = productosBajos.map((p) => p.nombre).join(", ");
      alert(`⚠️ Se debe reabastecer: ${nombres}`);
    }

    // Detectar productos agotados
    const productosAgotados = nuevoMenu.filter((item) => item.stock === 0);
    if (productosAgotados.length > 0) {
      const nombres = productosAgotados.map((p) => p.nombre).join(", ");
      alert(`❌ Producto agotado: ${nombres}`);
    }

    alert("Venta confirmada correctamente.");
    setMostrarResumen(false);
    limpiarFormulario();
  };

  return (
    <div className={modoOscuro ? "bg-dark text-light p-4" : "bg-light text-dark p-4"}>
      <div className="container">
        <h1 className="text-center mb-4">Gestión de Pedidos - Cafetería IES Lomo de la herradura</h1>

        <button
          className="btn btn-secondary mb-4"
          onClick={() => setModoOscuro(!modoOscuro)}
        >
          Cambiar a modo {modoOscuro ? "claro" : "oscuro"}
        </button>

        <div className="row">
          {menuState.map((item) => (
            <TarjetaProducto
              key={item.nombre}
              item={item}
              cantidad={cantidades[item.nombre]}
              onChange={handleCantidadChange}
              modoOscuro={modoOscuro}
            />
          ))}
        </div>

        <ResumenVentas total={total} igic={igic} totalConImpuesto={totalConImpuesto} />

        <BotonesAccion
          onAceptar={() =>
            hayProductosSeleccionados()
              ? setMostrarResumen(true)
              : alert("No se ha seleccionado ningún producto.")
          }
          onLimpiar={limpiarFormulario}
          onSalir={() => window.close()}
        />

        <ResumenModal
          mostrar={mostrarResumen}
          cerrar={() => setMostrarResumen(false)}
          cantidades={cantidades}
          menu={menuState}
          total={total}
          igic={igic}
          totalConImpuesto={totalConImpuesto}
          confirmar={confirmarVenta}
          modoOscuro={modoOscuro}
        />
      </div>
    </div>
  );
}

export default App;
