import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../../db/db"; // Ruta correcta a tu archivo db.js
import "./checkoutform.css"; // Asegúrate de tener este archivo con los estilos

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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
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
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
        date: new Date(),
      };

      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);
      onOrderComplete(); // Limpia el carrito y cierra el formulario
    } catch (error) {
      console.error("Error al registrar la orden:", error.message);
      setErrorMessage("Ocurrió un problema al registrar la orden. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-form-container">
      {orderId ? (
        <div className="checkout-success">
          <h2>¡Gracias por tu compra!</h2>
          <p>El ID de tu orden es: <strong>{orderId}</strong></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Formulario de Checkout</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={buyer.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={buyer.email}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Teléfono"
            value={buyer.phone}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <button
            type="submit"
            className="submit-button"
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
