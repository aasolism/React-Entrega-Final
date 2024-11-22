import { useState, useEffect } from "react";
import Contador from "../Contador/Contador";

const ContadorContainer = ({ stock, initial, onAdd }) => {
  const [contador, setContador] = useState(initial);
  const [toggle, setToggle] = useState(true);

  const aumentarContador = () => {
    if (contador < stock) {
      setContador(contador + 1);
    }
  };

  const disminuirContador = () => {
    if (contador > 1) {
      setContador(contador - 1);
    }
  };

  const alternarToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    console.log("1er useEffect");
  }, []);

  useEffect(() => {
    console.log("2do useEffect");
  }, [contador]);

  useEffect(() => {
    console.log("3er useEffect");
  });

  return (
    <>
      <Contador 
        contador={contador} 
        aumentarContador={aumentarContador} 
        disminuirContador={disminuirContador} 
        onAdd={() => onAdd(contador)} 
      />
    </>
  );
};

export default ContadorContainer;
