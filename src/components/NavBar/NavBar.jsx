import CartWidget from "./CartWidget";
import { FiCpu } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./navbar.css";

const NavBar = ({ cartCount, onCartClick }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="brand primary-font-color">
        <FiCpu className="icon-brand" />
        <p className="title-brand">ASMA STORE</p>
      </Link>

      <ul className="categories">
        <li className="category">
          <Link to="/category/laptops">Laptops</Link>
        </li>
        <li className="category">
          <Link to="/category/smartphones">Smartphones</Link>
        </li>
        <li className="category">
          <Link to="/category/headphones">Audífonos</Link>
        </li>
      </ul>
      

      <div className="cartwidget" onClick={onCartClick} style={{ cursor: 'pointer' }}>
        <CartWidget cartCount={cartCount} /> 
      </div>
    </nav>
  );
};

export default NavBar;
