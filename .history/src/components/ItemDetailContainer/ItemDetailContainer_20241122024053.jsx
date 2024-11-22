import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../../components/db/db"; // Asegúrate de que esta ruta sea correcta
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { idProduct } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "products", idProduct); // Obtiene el documento por ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() }); // Guarda el producto con sus datos
        } else {
          console.log("No se encontró el producto.");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [idProduct]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>No se encontró el producto.</p>;

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;
