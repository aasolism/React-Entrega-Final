import React, { useState } from "react";
import CheckoutForm from "../Checkout/CheckoutForm";
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
          <button
            className="checkout-button
