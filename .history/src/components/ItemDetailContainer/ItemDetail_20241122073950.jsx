import "./itemdetail.css";
import ContadorContainer from "../Contador/ContadorContainer";

const ItemDetail = ({ product, onAddToCart }) => {
  const handleAddToCart = (quantity) => {
    onAddToCart(product, quantity); 
  };

  
  const formatPrice = (price) => {
    return price.toLocaleString("es-CL"); 
  };

  return (
    <div className="item-detail">
      <img src={product.image} alt={product.name} width={600} />
      <div className="text-detail-container">
        <h2 className="title-detail">{product.name}</h2>
        <p className="text-detail">{product.description}</p>
        <p className="text-detail">Precio: ${formatPrice(product.price)}</p> 
        <ContadorContainer stock={product.stock} initial={1} onAdd={handleAddToCart} />
      </div>
    </div>
  );
};

export default ItemDetail;
