import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCiWaTV14HB7j4_YXiawyMJyqfP8S8hmhw",
  authDomain: "asma-store-23049.firebaseapp.com",
  projectId: "asma-store-23049",
  storageBucket: "asma-store-23049.firebasestorage.app",
  messagingSenderId: "1004643116052",
  appId: "1:1004643116052:web:febbe4703fa64991cdf301",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar la instancia de Firestore
const db = getFirestore(app);
export default db;
