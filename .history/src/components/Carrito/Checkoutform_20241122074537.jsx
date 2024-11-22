import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../../components/db/db";

const CheckoutForm = ({ cartItems, total, onOrderComplete }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      buyer: formData,
      items: cartItems,
      total,
      date: new Date().toISOString(),
    };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Checkout</h2>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Correo Electrónico:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Teléfono:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit" className="checkout-confirm-button">
        Confirmar Compra
      </button>
    </form>
  );
};

export default CheckoutForm;