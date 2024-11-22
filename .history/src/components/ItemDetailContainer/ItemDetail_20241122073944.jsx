// src/components/ItemDetail/ItemDetail.jsx
import { useState } from "react";
import Contador from "../Contador/Contador";

const ItemDetail = ({ product, onAddToCart }) => {
  const [contador, setContador] = useState(1);

  // Incrementar el contador
  const aumentarContador = () => setContador(contador + 1);

  // Decrementar el contador, asegurándonos de que nunca baje de 1
  const disminuirContador = () => setContador(Math.max(1, contador - 1));

  const handleAddToCart = () => {
    onAddToCart(product, contador);  // Pasamos el producto y la cantidad al carrito
  };

  const formatPrice = (price) => {
    return price.toLocaleString("es-CL");
  };

  return (
    <div className="item-detail">
      <img src={product.image} alt={product.name} width={200} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${formatPrice(product.price)}</p>

      <Contador
        contador={contador}
        aumentarContador={aumentarContador}
        disminuirContador={disminuirContador}
        onAdd={handleAddToCart}  // Llamamos a handleAddToCart cuando se hace clic en "Agregar al carrito"
      />

      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
};

export default ItemDetail;
