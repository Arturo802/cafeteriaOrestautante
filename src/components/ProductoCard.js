import React from "react";

function ProductoCard({ item, cantidad, onChange, modoOscuro }) {
  return (
    <div className="col-md-4 mb-3">
      <div className={`card ${modoOscuro ? "bg-secondary text-light" : ""}`}>
        <div className="card-body">
          <h5 className="card-title">{item.nombre}</h5>
          <p className="card-text">Precio: {item.precio.toFixed(2)} €</p>
          <input
            type="number"
            className="form-control"
            min="0"
            value={cantidad || ""}
            onChange={(e) => onChange(item.nombre, e.target.value)}
            placeholder="Cantidad"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductoCard;
