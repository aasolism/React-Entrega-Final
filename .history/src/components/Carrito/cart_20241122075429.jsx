// src/components/Carrito/cart.jsx
import React, { useState } from "react";
import CheckoutForm from "../Carrito/Checkoutform";
import { toast } from "react-toastify";
import "./cart.css";

const Cart = ({ cartItems, onClose, clearCart, removeItem }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const formatPrice = (price) => {
    return price.toLocaleString("es-CL");
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Función para eliminar un producto del carrito
  const handleRemoveItem = (id) => {
    console.log("Attempting to remove item with id:", id); // Log de depuración para verificar si se llama varias veces
    if (!cartItems.some(item => item.id === id)) return; // Si el item ya no existe, no hacer nada

    removeItem(id); // Llamamos a la función removeItem para eliminar el producto
    toast.info("Producto eliminado del carrito."); // Notificación de eliminación
    console.log("Product removed and toast shown"); // Verificamos que no se invoque varias veces
  };

  const handleOrderComplete = () => {
    clearCart(); // Vaciamos el carrito
    setShowCheckout(false); // Ocultamos el formulario de checkout
    onClose(); // Cerramos el carrito
    // La notificación de la compra ya está siendo manejada en CheckoutForm
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
              onOrderComplete={handleOrderComplete} // Llamamos a handleOrderComplete cuando se finaliza la compra
            />
          ) : (
            <button
              className="checkout-button"
              onClick={() => setShowCheckout(true)} // Mostramos el formulario de compra
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
