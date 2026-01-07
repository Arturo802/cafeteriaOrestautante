import React from "react";

function BotonesAccion({ onAceptar, onLimpiar, onSalir }) {
  return (
    <div className="mt-3">
      <button className="btn btn-success me-2" onClick={onAceptar}>
        Aceptar
      </button>

      <button className="btn btn-warning me-2" onClick={onLimpiar}>
        Limpiar
      </button>

      <button className="btn btn-danger" onClick={onSalir}>
        Salir
      </button>
    </div>
  );
}

export default BotonesAccion;
