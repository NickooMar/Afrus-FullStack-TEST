import axios from "axios";
import React, { useEffect, useState } from "react";

import { BsFillPersonPlusFill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CostumersList = () => {
  const navigate = useNavigate();
  const [listaCompradores, setListaCompradores] = useState();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(false);
  }, []);

  const handleSubmit = async () => {
    try {
      setisLoading(true);
      const response = await axios.get("http://localhost:4000/costumers/list");
      setListaCompradores(response.data);
    } catch (error) {
      throw Error("Error Submiting");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 h-screen overflow-x-auto w-full">
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-full justify-center items-center gap-4">
          <div
            className="py-4 pl-2 my-4 bg-gray-900 text-white w-1/6 flex items-center justify-center rounded-xl shadow-md cursor-pointer"
            onClick={() => navigate("/costumers/new")}
          >
            <BsFillPersonPlusFill size={36} />
            <h1 className="hidden lg:flex text-md xl:text-lg px-2 font-semibold ">
              Agregar Comprador
            </h1>
          </div>
          <div
            className="py-4 pl-2 my-4 bg-gray-900 text-white w-1/6 flex items-center justify-center rounded-xl shadow-md cursor-pointer"
            onClick={() => navigate("/costumers")}
          >
            <FiFilter size={36} />
            <h1 className="hidden lg:flex text-md xl:text-lg pt-2 px-2 font-semibold ">
              Filtrar comprador
            </h1>
          </div>
        </div>

        <div class="max-w-7xl rounded overflow-hidden shadow-lg bg-white">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-center">
              Listar compradores con sus compras
            </div>
            <p class="text-gray-700 text-base">
              Aquí podra listar a todos los compradores de acuerdo a las
              respectivas compras realizadas por cada uno, la petición traera
              los datos ordenados ascendentemente por el ID del comprador.
            </p>
          </div>
          {/* Inputs */}

          <div class="py-4 flex justify-center items-center">
            <button
              type="button"
              class="bg-blue-500 disabled:opacity-25 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
              disabled={isLoading ? true : false}
            >
              Obtener
            </button>
          </div>
        </div>
      </div>
      {!listaCompradores ? (
        <p className="text-gray-700 text-center mt-4 text-lg">
          Realice una búsqueda
        </p>
      ) : (
        <ShowResultsComponent listaCompradores={listaCompradores} />
      )}
    </div>
  );
};

const ShowResultsComponent = ({ listaCompradores }) => {
  return (
    <div class="relative overflow-x-auto mt-12">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Nombre Comprador
            </th>
            <th scope="col" class="px-6 py-3">
              ID Comprador
            </th>
            <th scope="col" class="px-6 py-3">
              Apellidos
            </th>
            <th scope="col" class="px-6 py-3">
              Tipo Comprador
            </th>
            <th scope="col" class="px-6 py-3">
              ID Transacción
            </th>
            <th scope="col" class="px-6 py-3">
              Fecha de Compra
            </th>
            <th scope="col" class="px-6 py-3">
              Total Pagado
            </th>
          </tr>
        </thead>
        <tbody>
          {listaCompradores.map((compradores) => (
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={compradores.ID_Comprador}
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {compradores.Nombre}
              </th>
              <td class="px-6 py-4">{compradores.ID_Comprador}</td>
              <td class="px-6 py-4">{compradores.Apellidos}</td>
              <td class="px-6 py-4">{compradores.Tipo_Comprador}</td>
              <td class="px-6 py-4">{compradores.ID_Transaccion}</td>
              <td class="px-6 py-4">{compradores.Fecha_Compra}</td>
              <td class="px-6 py-4">{compradores.Precio_Pagado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CostumersList;
