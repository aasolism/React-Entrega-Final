import React from "react";
import { toast } from "react-toastify";
import CheckoutForm from "../Carrito/Checkoutform";
import "./cart.css";

const Cart = ({ cartItems, onClose, clearCart, removeItem, setCartItems }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const formatPrice = (price) => {
    return price.toLocaleString("es-CL");
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemoveItem = (id) => {
    removeItem(id); // Llamamos a la función removeItem para eliminar el producto
    toast.info("Producto eliminado del carrito.");
  };

  const handleOrderComplete = () => {
    clearCart();
    setShowCheckout(false);
    onClose();
    toast.success("¡Compra realizada con éxito!");
  };

  return (
    <div className={`cart cart-open`}>
      <span className="close-button" onClick={onClose}>&times;</span>
      <h2 className="cart-title">Carrito de Compras</h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
                <p className="cart-item-price">Total: ${formatPrice(item.price * item.quantity)}</p>
              </div>
              <button
                className="remove-item-button"
                onClick={() => handleRemoveItem(item.id)} // Llamamos a la función para eliminar el producto
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="cart-total">Total: ${formatPrice(totalPrice)}</div>

          {showCheckout ? (
            <CheckoutForm
              cartItems={cartItems}
              total={totalPrice}
              onOrderComplete={handleOrderComplete}
            />
          ) : (
            <button
              className="checkout-button"
              onClick={() => setShowCheckout(true)}
            >
              Finalizar Compra
            </button>
          )}

          <button className="clear-cart-button" onClick={clearCart}>
            Vaciar Carrito
          </button>
        </>
      ) : (
        <p>No hay productos en el carrito.</p>
      )}
    </div>
  );
};

export default Cart;
