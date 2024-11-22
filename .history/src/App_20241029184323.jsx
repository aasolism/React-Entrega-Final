import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Carrito/cart';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Función para agregar productos al carrito
  const onAddToCart = (product, quantity) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map((item) => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  // Función para vaciar el carrito
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='container-app'>
      <BrowserRouter>
        <NavBar cartCount={cartCount} onCartClick={() => setIsCartOpen(!isCartOpen)} />
        
        <Routes>
          <Route path="/" element={<ItemListContainer onAddToCart={onAddToCart} />} />
          <Route path="/category/:idCategory" element={<ItemListContainer onAddToCart={onAddToCart} />} />
          <Route path="/detail/:idProduct" element={<ItemDetailContainer onAddToCart={onAddToCart} />} />
        </Routes>

        {/* Sidebar del carrito */}
        {isCartOpen && <Cart cartItems={cart} onClose={() => setIsCartOpen(false)} clearCart={clearCart} />}
      </BrowserRouter>
    </div>
  );
}

export default App;
