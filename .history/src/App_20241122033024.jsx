import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Carrito/cart';
import { ToastContainer, toast } from 'react-toastify'; // Importamos Toastify
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success(`Se añadió ${quantity} unidad(es) de ${product.name} al carrito.`);
    } else {
      setCart([...cart, { ...product, quantity }]);
      toast.success(`${product.name} ha sido agregado al carrito.`);
    }
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Función para eliminar un producto del carrito
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id)); // Actualizamos el estado para eliminar el producto
    toast.info("Producto eliminado del carrito.");
  };

  // Función para finalizar la compra
  const handleCheckout = () => {
    const orderId = Math.random().toString(36).substr(2, 9); // Simulando la generación de un ID de orden
    toast.success(`¡Compra realizada con éxito! ID de la orden: ${orderId}`);
    clearCart(); // Vaciar el carrito después de la compra
    setIsCartOpen(false); // Cerrar el carrito después de completar la compra
  };

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
        {isCartOpen && <Cart cartItems={cart} onClose={() => setIsCartOpen(false)} clearCart={clearCart} removeItem={removeItem} />}
      </BrowserRouter>

      {/* Contenedor para Toastify */}
      <ToastContainer />
    </div>
  );
}

export default App;
