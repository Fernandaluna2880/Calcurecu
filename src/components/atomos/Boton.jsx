import React from 'react';
import '../../Style/Boton.css';

function Boton({ children, handleClick }) {
  const esOperador = valor => {
    return isNaN(valor) && (valor !== '.') && (valor !== '=');
  };

  const handleButtonClick = () => {
    handleClick(children);
  };

  return (
    <div
      className={`p-5 flex items-center justify-center bg-blue-500 border-2 hover:bg-blue-300 text-xl font-bold text-white ${esOperador(children) ? 'operador' : ''}`.trimEnd()}
      onClick={handleButtonClick}
    >
      {children}
    </div>
  );
}

export default Boton;

