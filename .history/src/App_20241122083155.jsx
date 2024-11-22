import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Carrito/cart';
import { CartProvider } from './context/CartContext'; // Importamos el CartProvider

import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="container-app">
        <BrowserRouter>
          <NavBar /> {/* No necesita envolver con CartProvider */}

          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:idCategory" element={<ItemListContainer />} />
            <Route path="/detail/:idProduct" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} /> {/* El carrito es donde estará el contexto */}
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
