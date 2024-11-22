import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import "./cart.css";

const Cart = ({ cartItems, clearCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrderComplete = () => {
    clearCart(); // Limpia el carrito
    setShowCheckout(false); // Oculta el formulario
    toast.success("Gracias por tu compra. ¡Esperamos verte pronto!", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  return (
    <div className="cart">
      <h2>Carrito</h2>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.price}</p>
            </div>
          ))}
          <p>Total: ${totalPrice}</p>
          {showCheckout ? (
            <CheckoutForm
              cartItems={cartItems}
              total={totalPrice}
              onOrderComplete={handleOrderComplete}
            />
          ) : (
            <button onClick={() => setShowCheckout(true)}>Finalizar Compra</button>
          )}
        </>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default Cart;
