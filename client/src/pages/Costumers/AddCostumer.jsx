import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCostumer = () => {
  const navigate = useNavigate();

  const initialState = {
    nombreComprador: "",
    apellidosComprador: "",
    tipoComprador: null,
  };

  const [nuevoComprador, setNuevoComprador] = useState(initialState);
  const [tiposDeCompradores, setTiposDeCompradores] = useState();

  useEffect(() => {
    const fetchTipoComprador = async () => {
      const response = await axios.get("http://localhost:4000/costumers/type");
      setTiposDeCompradores(response.data);
    };
    fetchTipoComprador();
  }, []);

  const handleInputChange = (e) => {
    setNuevoComprador({ ...nuevoComprador, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !nuevoComprador.nombreComprador ||
      !nuevoComprador.apellidosComprador ||
      !nuevoComprador.tipoComprador
    ) {
      return toast.error("Verifique los datos ingresados");
    }
    try {
      await axios.post("http://localhost:4000/costumers", { nuevoComprador });
      setNuevoComprador(initialState);
      toast.success("Comprador Agregado con exito");
      navigate("/costumers");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-100 h-screen overflow-x-auto w-full">
      <div className="flex flex-col justify-center items-center mt-24">
        <div class="max-w-7xl rounded overflow-hidden shadow-lg bg-white">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-center">
              Agregar un comprador
            </div>
            <p class="text-gray-700 text-base">
              Aquí podra agregar a un nuevo comprador que será automaticamente
              generado y se le sera asignado un ID de reconocimiento unico, solo
              debe completar los siguientes datos Nombre, Apellidos y Tipo de
              comprador.
            </p>
          </div>
          {/* Inputs */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex flex-col ">
              <p class="text-gray-700 text-base">Nombre del comprador</p>
              <input
                type="text"
                name="nombreComprador"
                id="nombreComprador"
                placeholder="Ingrese un nombre"
                onChange={handleInputChange}
                className="shadow-lg border border-zinc-600 pl-1"
              />
            </div>
            <div className="flex flex-col">
              <p class="text-gray-700 text-base">Apellidos del comprador</p>
              <input
                type="text"
                name="apellidosComprador"
                id="apellidosComprador"
                placeholder="Ingrese un apellido"
                onChange={handleInputChange}
                className="shadow-lg border border-zinc-600 pl-1"
              />
            </div>
            <div className="flex flex-col ">
              <p class="text-gray-700 text-base">Tipo de comprador</p>
              <select
                name="tipoComprador"
                id="tipoComprador"
                className="shadow-lg border border-zinc-600 pl-1"
                onChange={handleInputChange}
              >
                <option value="Seleccionar" disabled selected>
                  Seleccionar
                </option>
                {tiposDeCompradores?.map((tipoDeComprador) => (
                  <option value={tipoDeComprador?.Tipo_Comprador}>
                    {tipoDeComprador?.Tipo_Comprador}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div class="py-4 flex justify-center items-center">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCostumer;
