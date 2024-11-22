import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../components/db/db"; // Asegúrate de que la ruta sea correcta
import { useParams } from "react-router-dom";
import "./itemlistcontainer.css";

const ItemListContainer = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Indicador de carga
  const { idCategory } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Inicia la carga
        let q;

        if (idCategory) {
          // Si se selecciona una categoría, filtra los productos
          q = query(collection(db, "products"), where("category", "==", idCategory));
        } else {
          // Si no hay categoría, consulta todos los productos
          q = collection(db, "products");
        }

        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(items); // Establece los productos
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchProducts();
  }, [idCategory]);

  if (loading) {
    return <p>Cargando productos...</p>; // Mensaje de carga
  }

  if (products.length === 0) {
    return <p>No hay productos disponibles.</p>; // Mensaje si no hay productos
  }

  return (
    <div className="itemlistcontainer">
      <ItemList products={products} onAddToCart={onAddToCart} />
    </div>
  );
};

export default ItemListContainer;
