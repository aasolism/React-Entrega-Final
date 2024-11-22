import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../../db/db"; // Asegúrate de que esta ruta sea correcta

const CheckoutForm = ({ cartItems, total, onOrderComplete }) => {
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });

  const handleInputChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const order = {
        buyer,
        items: cartItems,
        total,
        date: new Date(),
      };

      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("Orden registrada con ID:", docRef.id);
      onOrderComplete(); // Limpia el carrito y cierra el formulario
    } catch (error) {
      console.error("Error al registrar la orden:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Formulario de Checkout</h2>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={buyer.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={buyer.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Teléfono"
        value={buyer.phone}
        onChange={handleInputChange}
        required
      />
      <button type="submit" style={{ backgroundColor: "#28a745", color: "#fff", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Finalizar Compra
      </button>
    </form>
  );
};

export default CheckoutForm;
