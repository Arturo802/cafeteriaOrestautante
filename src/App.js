import React, { useState } from "react";
import "./App.css";

import menu from "./menu";
import ProductoCard from "./components/ProductoCard";
import ResumenVentas from "./components/ResumenVentas";
import BotonesAccion from "./components/BotonesAccion";
import ResumenModal from "./components/ResumenModal";

function App() {
  const [cantidades, setCantidades] = useState({});
  const [modoOscuro, setModoOscuro] = useState(false);
  const [mostrarResumen, setMostrarResumen] = useState(false);

  const handleCantidadChange = (nombre, valor) => {
    setCantidades({ ...cantidades, [nombre]: parseInt(valor) || 0 });
  };

  const calcularTotal = () =>
    menu.reduce((total, item) => {
      const cantidad = cantidades[item.nombre] || 0;
      return total + cantidad * item.precio;
    }, 0);

  const total = calcularTotal();
  const igic = +(total * 0.07).toFixed(2);
  const totalConImpuesto = +(total + igic).toFixed(2);

  const limpiarFormulario = () => setCantidades({});

  const hayProductosSeleccionados = () =>
    Object.values(cantidades).some((cantidad) => cantidad > 0);

  const imprimirResumen = () => {
    const contenido = document.getElementById("resumen-pedido");
    const ventana = window.open("", "PRINT", "height=600,width=800");
    ventana.document.write(`<html><head><title>Resumen del pedido</title>`);
    ventana.document.write(
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">`
    );
    ventana.document.write(`</head><body>`);
    ventana.document.write(contenido.innerHTML);
    ventana.document.write(`</body></html>`);
    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.close();
  };

  const confirmarVenta = () => {
    if (!hayProductosSeleccionados()) {
      alert(" No hay productos para confirmar.");
      setMostrarResumen(false);
      return;
    }

    imprimirResumen();
    alert("Venta confirmada correctamente.");
    setMostrarResumen(false);
    limpiarFormulario();
  };

  return (
    <div className={modoOscuro ? "bg-dark text-light p-4" : "bg-light text-dark p-4"}>
      <div className="container">
        <h1 className="text-center mb-4">Gestión de Pedidos - Cafetería IES</h1>

        <button
          className="btn btn-secondary mb-4"
          onClick={() => setModoOscuro(!modoOscuro)}
        >
          Cambiar a modo {modoOscuro ? "claro" : "oscuro"}
        </button>

        <div className="row">
          {menu.map((item) => (
            <ProductoCard
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
          menu={menu}
          total={total}
          igic={igic}
          totalConImpuesto={totalConImpuesto}
          imprimir={imprimirResumen}
          confirmar={confirmarVenta}
          modoOscuro={modoOscuro}
        />
      </div>
    </div>
  );
}

export default App;
