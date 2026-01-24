import React from "react";

function ResumenModal({
  mostrar,
  cerrar,
  cantidades,
  menu,
  total,
  igic,
  totalConImpuesto,
  confirmar,
  modoOscuro
}) {
  if (!mostrar) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className={`modal-content ${modoOscuro ? "bg-dark text-light" : ""}`}>
          <div className="modal-header">
            <h5 className="modal-title">Resumen del pedido</h5>
            <button type="button" className="btn-close" onClick={cerrar}></button>
          </div>

          <div className="modal-body" id="resumen-pedido">
            <p>
              <strong>Fecha:</strong> {new Date().toLocaleDateString()} —{" "}
              <strong>Hora:</strong> {new Date().toLocaleTimeString()}
            </p>

            <h5 className="mt-3">Productos seleccionados</h5>

            <table className="table table-sm table-bordered mt-3">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {menu.map((item) => {
                  const cantidad = cantidades[item.nombre] || 0;
                  if (cantidad === 0) return null;
                  const subtotal = cantidad * item.precio;

                  return (
                    <tr key={item.nombre}>
                      <td>{item.nombre}</td>
                      <td>{cantidad}</td>
                      <td>{item.stock}</td>
                      <td>{item.precio.toFixed(2)} €</td>
                      <td>{subtotal.toFixed(2)} €</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <hr />
            <p><strong>Total bruto:</strong> {total.toFixed(2)} €</p>
            <p><strong>IGIC (7%):</strong> {igic.toFixed(2)} €</p>
            <p><strong>Total con impuesto:</strong> {totalConImpuesto.toFixed(2)} €</p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-success" onClick={confirmar}>
              Confirmar venta
            </button>
            <button className="btn btn-secondary" onClick={cerrar}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumenModal;
