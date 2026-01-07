import React from "react";

function ResumenVentas({ total, igic, totalConImpuesto }) {
  return (
    <div className="mt-4">
      <h4>Resumen de ventas</h4>
      <p>Total bruto: {total.toFixed(2)} €</p>
      <p>IGIC (7%): {igic.toFixed(2)} €</p>
      <p><strong>Total con impuesto: {totalConImpuesto.toFixed(2)} €</strong></p>
    </div>
  );
}

export default ResumenVentas;
