import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto que solo envolverá los componentes relacionados con el carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  // Función para agregar al carrito
  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Función para vaciar el carrito
  const clearCart = () => setCart([]);

  // Calcular el número total de productos en el carrito
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook para usar el carrito en cualquier componente
export const useCart = () => useContext(CartContext);
