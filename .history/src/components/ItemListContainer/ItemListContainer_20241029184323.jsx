import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { getProducts } from "../../data/data.js";
import { useParams } from "react-router-dom";
import "./itemlistcontainer.css";

const ItemListContainer = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const { idCategory } = useParams();

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (idCategory) {
          const productsFilter = data.filter((product) => product.category === idCategory);
          setProducts(productsFilter);
        } else {
          setProducts(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [idCategory]);

  return (
    <div className="itemlistcontainer">
      <ItemList products={products} onAddToCart={onAddToCart} />
    </div>
  );
};

export default ItemListContainer;
