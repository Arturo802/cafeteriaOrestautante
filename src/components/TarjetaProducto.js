import React from "react";

function TarjetaProducto({ item, cantidad, onChange, modoOscuro }) {
  return (
    <div className="col-md-4 mb-3">
      <div className={`card shadow-sm ${modoOscuro ? "bg-secondary text-light" : ""}`}>
        
        <img
          src={item.imagen}
          alt={item.nombre}
          className="card-img-top"
          style={{ height: "150px", objectFit: "contain" }}
        />

        <div className="card-body">
          <h5 className="card-title">{item.nombre}</h5>
          <p className="card-text">Precio: {item.precio.toFixed(2)} €</p>
          <p className="card-text">Stock disponible: {item.stock}</p>

          <input
            type="number"
            className="form-control"
            min="0"
            max={item.stock}
            value={cantidad || ""}
            onChange={(e) => {
              const valor = parseInt(e.target.value) || 0;
              if (valor <= item.stock) {
                onChange(item.nombre, valor);
              }
            }}
            placeholder="Cantidad"
          />
        </div>

      </div>
    </div>
  );
}

export default TarjetaProducto;
