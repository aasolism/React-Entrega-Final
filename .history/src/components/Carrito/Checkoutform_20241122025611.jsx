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

  
