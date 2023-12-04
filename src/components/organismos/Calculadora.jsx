import "../../../src/App.css";
import { useState, useEffect } from "react";
import Boton from "../atomos/Boton.jsx";
import Inputs from "../atomos/Inputs.jsx";
import BotonReset from "../atomos/BotonReset.jsx";
import { evaluate } from "mathjs";
import axios from "axios";

function Historial({ historial }) {
  return (
    <div className="">
      <h2 className="text-2xl font-bold">Historial de Operaciones</h2>
      <ul>
        {historial.map((item, index) => (
          <li key={index}>{`${item.operacion} = ${item.resultado}`}</li>
        ))}
      </ul>
    </div>
  );
}

function Calculadora() {
  const [input, setInput] = useState("");
  const [historial, setHistorial] = useState([]);

  const InputsChange = (val) => {
    setInput(input + val);
  };

  const resultado = async () => {
    if (input) {
      const result = eval(input);

      try {
        console.log('Antes de la solicitud Axios');
        // Guardar la operación y el resultado en el historial mediante Axios
        await axios.post('http://localhost:3001/api/operaciones', {
          operacion: input,
          resultado: result.toString(),
        });

        console.log('Después de la solicitud Axios');
        setInput(result.toString());
        // Actualizar el historial después de cada nueva operación
        const response = await axios.get('http://localhost:3001/api/operaciones');
        setHistorial(response.data);
      } catch (error) {
        console.error('Error al guardar la operación:', error);
        alert('Error al guardar la operación');
      }
    } else {
      alert('Agregue antes valores a calcular.');
    }
  };

  // Obtener el historial al cargar el componente
  useEffect(() => {
    async function obtenerHistorial() {
      try {
        const response = await axios.get('http://localhost:3001/api/operaciones');
        setHistorial(response.data);
      } catch (error) {
        console.error('Error al obtener el historial:', error);
        // Maneja el error de manera apropiada, por ejemplo, mostrando un mensaje al usuario
      }
    }

    obtenerHistorial();
  }, []); 

  return (
    <div className="grid grid-cols-3 items-center justify-center h-screen ">
      <h1 className=" text-5xl py-10 font-bold">CALCULADORA</h1>
      <div className=" w-96 h-auto">
        <Inputs input={input} />
        <div className="grid grid-cols-4">
            <Boton handleClick={InputsChange}>1</Boton>
            <Boton handleClick={InputsChange}>2</Boton>
            <Boton handleClick={InputsChange}>3</Boton>
            <Boton handleClick={InputsChange}>+</Boton>
          
          
            <Boton handleClick={InputsChange}>4</Boton>
            <Boton handleClick={InputsChange}>5</Boton>
            <Boton handleClick={InputsChange}>6</Boton>
            <Boton handleClick={InputsChange}>-</Boton>
          
          
            <Boton handleClick={InputsChange}>7</Boton>
            <Boton handleClick={InputsChange}>8</Boton>
            <Boton handleClick={InputsChange}>9</Boton>
            <Boton handleClick={InputsChange}>*</Boton>
          
          
            <Boton handleClick={resultado}>=</Boton>
            <Boton handleClick={InputsChange}>0</Boton>
            <Boton handleClick={InputsChange}>.</Boton>
            <Boton handleClick={InputsChange}>/</Boton>
          
          
            <Boton handleClick={() => calcular("sqrt")}>√</Boton>
            <Boton handleClick={() => calcular("pow(" + input + ",2)")}>
              x²
            </Boton>
            <Boton handleClick={() => agregarInput(Math.PI)}>π</Boton>
            <BotonReset handleReset={() => setInput("")}>C</BotonReset>
          
        </div>
        
      </div>
      <Historial historial={historial} />
    </div>
  );
}

export default Calculadora;
