import React from "react";
import "./cart.css";

const Cart = ({ cartItems, onClose, clearCart, updateQuantity, removeItem }) => {
  const formatPrice = (price) => {
    return price.toLocaleString("es-CL");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={`cart cart-open`}>
      <span className="close-button" onClick={onClose}>
        &times;
      </span>
      <h2 className="cart-title">Carrito de Compras</h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">
                  Precio unitario: ${formatPrice(item.price)}
                </p>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <p className="cart-item-subtotal">
                  Subtotal: ${formatPrice(item.price * item.quantity)}
                </p>
              </div>
              <button
                className="remove-item-button"
                onClick={() => removeItem(item.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="cart-total">Total: ${formatPrice(totalPrice)}</div>
          <button className="checkout-button">Finalizar Compra</button>
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
