import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../../db/db"; // Asegúrate de que esta ruta sea correcta

const CheckoutForm = ({ cartItems, total, onOrderComplete }) => {
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!buyer.name || !buyer.email || !buyer.phone) {
      setErrorMessage("Por favor, completa todos los campos.");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(buyer.email)) {
      setErrorMessage("Por favor, ingresa un correo válido.");
      return false;
    }
    if (!/^\d+$/.test(buyer.phone)) {
      setErrorMessage("El teléfono debe contener solo números.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const order = {
        buyer,
        items: cartItems,
        total,
        date: new Date(),
      };

      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);
      onOrderComplete(); // Limpia el carrito y cierra el formulario
    } catch (error) {
      console.error("Error al registrar la orden:", error);
      setErrorMessage("Hubo un problema al registrar la orden. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      {orderId ? (
        <div>
          <h2>¡Gracias por tu compra!</h2>
          <p>Tu orden ha sido registrada con el ID: <strong>{orderId}</strong></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h2>Formulario de Checkout</h2>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
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
            disabled={loading}
          >
            {loading ? "Procesando..." : "Finalizar Compra"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
