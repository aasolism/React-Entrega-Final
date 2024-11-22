// src/components/Item/Item.jsx
import { useState } from "react";
import Contador from "../Contador/Contador";
import { Link } from "react-router-dom";

const Item = ({ product, onAddToCart }) => {
  const [contador, setContador] = useState(1);

  const aumentarContador = () => setContador(contador + 1);
  const disminuirContador = () => setContador(Math.max(1, contador - 1));

  const handleAddToCart = () => {
    onAddToCart(product, contador); // Llamamos a la función onAddToCart para agregar al carrito
  };

  const formatPrice = (price) => {
    return price.toLocaleString("es-CL"); 
  };

  return (
    <div className="item">
      <img src={product.image} className="img-item" alt={product.name} width={100} />
      <p className="text-item">{product.name}</p>
      <p className="description-item">{product.description}</p> 
      <p className="price-item">${formatPrice(product.price)}</p> 

      <Contador
        contador={contador}
        aumentarContador={aumentarContador}
        disminuirContador={disminuirContador}
        onAdd={handleAddToCart} // Llamamos a handleAddToCart cuando se agrega al carrito
      />

      <Link to={`/detail/${product.id}`}>Ver más</Link>
    </div>
  );
};

export default Item;
