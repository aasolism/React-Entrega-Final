import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify"; // Importa Toastify para notificaciones
import db from "../../db/db"; // Asegúrate de que la ruta a db.js sea correcta
import "./cart.css";

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

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      toast.success(`¡Compra realizada con éxito! ID: ${docRef.id}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onOrderComplete(); // Limpia el carrito o realiza otras acciones necesarias
    } catch (error) {
      console.error("Error al registrar la orden:", error);
      toast.error("Hubo un problema al procesar tu compra.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2 className="checkout-form-title">Checkout</h2>
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
