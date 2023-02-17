import React, { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const SearchTransactions = () => {
  const navigate = useNavigate();

  const [informeCompras, setInformeCompras] = useState();

  const handleSubmit = async () => {
    const response = await axios.get("http://localhost:4000/transactions");
    setInformeCompras(response.data);
  };

  return (
    <div className="bg-slate-100 h-screen overflow-x-auto w-full">
      <div className="flex flex-col justify-center items-center">
        <div
          className="py-4 pl-2 my-4 bg-gray-900 text-white w-1/6 flex items-center justify-center rounded-xl shadow-md cursor-pointer"
          onClick={() => navigate("/transactions/new")}
        >
          <BsCartPlus size={48} />
          <h1 className="hidden lg:flex text-md xl:text-lg pt-2 px-2 font-semibold ">
            Realizar Compra
          </h1>
        </div>
        <div class="max-w-7xl rounded overflow-hidden shadow-lg bg-white">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-center">
              Informe de Transacciones
            </div>
            <p class="text-gray-700 text-base">
              Aquí podra encontrar todas las transacciones realizadas filtrando
              los datos
            </p>
          </div>
          <div className="flex justify-center items-center gap-4">
            {/* En caso de que se necesiten ingresar inputs para filtrar la información. En este caso el enunciado no lo pide */}
          </div>

          <div class="py-4 flex justify-center items-center">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Obtener
            </button>
          </div>
        </div>
      </div>

      {!informeCompras ? (
        <p className="text-gray-700 text-center mt-4 text-lg">
          Realice una búsqueda
        </p>
      ) : (
        <ShowResultsComponent informeCompras={informeCompras} />
      )}
    </div>
  );
};

const ShowResultsComponent = ({ informeCompras }) => {
  return (
    <div class="relative overflow-x-auto mt-12">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Nombre Comprador
            </th>
            <th scope="col" class="px-6 py-3">
              Apellidos Comprador
            </th>
            <th scope="col" class="px-6 py-3">
              ID Comprador
            </th>
            <th scope="col" class="px-6 py-3">
              ID Transaccion
            </th>
            <th scope="col" class="px-6 py-3">
              Valor Total de la Transaccion
            </th>
            <th scope="col" class="px-6 py-3">
              Fecha de la Transaccion
            </th>
            <th scope="col" class="px-6 py-3">
              ID Evento
            </th>
          </tr>
        </thead>
        <tbody>
          {informeCompras.map((compra) => {
            const newDate = moment
              .utc(compra.Fecha_Compra)
              .format("MMM Do, YYYY");
            return (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {compra.Nombre}
                </th>
                <td class="px-6 py-4">{compra.Apellidos}</td>
                <td class="px-6 py-4">{compra.ID_Comprador}</td>
                <td class="px-6 py-4">{compra.ID_Transaccion}</td>
                <td class="px-6 py-4">{compra.Precio_Pagado}</td>
                <td class="px-6 py-4">{newDate}</td>
                <td class="px-6 py-4">{compra.ID_Evento}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SearchTransactions;
