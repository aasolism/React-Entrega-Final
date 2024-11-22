import React, { useState } from "react";
import CheckoutForm from "../Carrito/Checkoutform";
import { toast } from "react-toastify";
import "./cart.css";

const Cart = ({ cartItems, onClose, clearCart, setCartItems }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const formatPrice = (price) => {
    return price.toLocaleString("es-CL");
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.info("Producto eliminado del carrito.");
  };

  const handleOrderComplete = () => {
    clearCart();
    setShowCheckout(false);
    onClose();
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
                onClick={() => handleRemoveItem(item.id)}
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
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default Cart;
