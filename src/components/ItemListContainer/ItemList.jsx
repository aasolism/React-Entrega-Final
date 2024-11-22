import Item from "./Item";

const ItemList = ({ products, onAddToCart }) => {
  return (
    <div className="itemlist">
      {products.map((product) => (
        <Item product={product} key={product.id} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ItemList;
