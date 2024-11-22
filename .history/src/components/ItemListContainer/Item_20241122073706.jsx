// Item.jsx
import { useState } from "react";
import Contador from "../Contador/Contador";
import { Link } from "react-router-dom";

const Item = ({ product, onAddToCart }) => {
  const [contador, setContador] = useState(1);

  // Incrementar el contador
  const aumentarContador = () => setContador(contador + 1);

  // Decrementar el contador, asegurándonos de que nunca baje de 1
  const disminuirContador = () => setContador(Math.max(1, contador - 1));

  // Llamamos a la función onAddToCart cuando se agrega al carrito
  const handleAddToCart = () => {
    onAddToCart(product, contador); // Pasamos el producto y el contador (cantidad)
  };

  // Formatear el precio a CLP (peso chileno)
  const formatPrice = (price) => {
    return price.toLocaleString("es-CL");
  };

  return (
    <div className="item">
      <img src={product.image} className="img-item" alt={product.name} width={100} />
      <p className="text-item">{product.name}</p>
      <p className="description-item">{product.description}</p>
      <p className="price-item">${formatPrice(product.price)}</p>

      {/* Componente de contador */}
      <Contador
        contador={contador}
        aumentarContador={aumentarContador}
        disminuirContador={disminuirContador}
        onAdd={handleAddToCart} // Al hacer clic en "Agregar", ejecutamos handleAddToCart
      />

      {/* Enlace a la página de detalles del producto */}
      <Link to={`/detail/${product.id}`}>Ver más</Link>
    </div>
  );
};

export default Item;
