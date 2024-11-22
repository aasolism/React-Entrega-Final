import React from "react";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import { useCart } from "../../components/Context/CartContext";

const NavBar = () => {
  const { cartCount } = useCart(); // Accede al número de productos en el carrito

  return (
    <nav>
      <h1>Tienda</h1>
      <div>
        {/* Agregar los enlaces de categorías */}
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/category/electronics">Electrónicos</Link></li>
          <li><Link to="/category/clothing">Ropa</Link></li>
          <li><Link to="/category/tablets">Tablets</Link></li> {/* Enlace para Tablets */}
        </ul>
      </div>
      <div>
        <span>Carrito ({cartCount})</span> {/* Muestra la cantidad de productos */}
      </div>
    </nav>
  );
};

export default NavBar;
