import React, { useState } from "react";
import CheckoutForm from "../Carrito/Checkoutform";
import { toast } from "react-toastify"; // Importamos Toastify
import "./cart.css";

const Cart = ({ cartItems, onClose, clearCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const formatPrice = (price) => {
    return price.toLocaleString("es-CL");
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrderComplete = () => {
    clearCart();
    setShowCheckout(false);
    onClose();

    // Notificación de agradecimiento
    toast.success("¡Gracias por tu compra!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleClearCart = () => {
    clearCart();

    // Notificación al vaciar el carrito
    toast.info("El carrito ha sido vaciado.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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

          <button className="clear-cart-button" onClick={handleClearCart}>
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
