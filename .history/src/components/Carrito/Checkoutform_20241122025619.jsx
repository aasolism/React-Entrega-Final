import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../../components/db/db";
import { toast } from "react-toastify"; // Importamos Toastify

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
      date: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("Orden registrada con ID:", docRef.id);

      // Notificación de éxito
      toast.success(`¡Compra exitosa! ID de la orden: ${docRef.id}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      onOrderComplete(); // Limpia el carrito
    } catch (error) {
      console.error("Error al registrar la orden:", error);

      // Notificación de error
      toast.error("Hubo un error al registrar la orden. Inténtalo de nuevo.", {
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
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Formulario de Checkout</h2>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={handleInputChange}
        required
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Finalizar Compra
      </button>
    </form>
  );
};

export default CheckoutForm;
