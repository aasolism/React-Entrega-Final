import "./contador.css";

const Contador = ({ contador, aumentarContador, disminuirContador, onAdd }) => {
  return (
    <div className="contador-container">
      <button onClick={disminuirContador} className="contador-btn">-</button>
      <span className="contador-number">{contador}</span>
      <button onClick={aumentarContador} className="contador-btn">+</button>
      <button onClick={onAdd} className="agregar-btn">Agregar al Carrito</button>
    </div>
  );
};

export default Contador;
