import { PiShoppingCartBold } from "react-icons/pi";

const CartWidget = ({ cartCount }) => {
  return (
    <div className="cartwidget">
      <PiShoppingCartBold className="icon-cartwidget" />
      {cartCount > 0 && <p className="number-cartwidget">{cartCount}</p>} {/* Solo muestra el número si hay productos en el carrito */}
    </div>
  );
};

export default CartWidget;
