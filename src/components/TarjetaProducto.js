function TarjetaProducto({ item, cantidad, onChange, modoOscuro }) {
  return (
    <div className="col-md-4 mb-3">
      <div className={`card ${modoOscuro ? "bg-secondary text-light" : ""}`}>
        <img
          src={item.imagen}
          alt={item.nombre}
          className="card-img-top"
          style={{ height: "150px", objectFit: "contain" }}
        />

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

export default TarjetaProducto;
