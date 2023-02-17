import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const SearchCostumers = () => {
  function getCurrentDate(separator) {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
  }

  const initialState = {
    cantidadCompra: 0,
    propiedadBusquedaCantidad: "MENOR",
    fechaCompra: getCurrentDate("-"),
  };

  const [filtroCompra, setFiltroCompra] = useState(initialState);
  const [listadoCompras, setListadoCompras] = useState([]);

  const handleInputChange = (e) => {
    setFiltroCompra({ ...filtroCompra, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      filtroCompra.cantidadCompra === 0 ||
      !filtroCompra.propiedadBusquedaCantidad ||
      !filtroCompra.fechaCompra
    ) {
      console.log("error");

      return toast.error("Ingrese datos validos");
    }
    try {
      filtroCompra.cantidadCompra = Number(filtroCompra.cantidadCompra);
      const response = await axios.post(
        "http://localhost:4000/costumers/filter",
        { filtroCompra }
      );
      setListadoCompras(response?.data);
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
              Búsqueda de un comprador
            </div>
            <p class="text-gray-700 text-base">
              Aquí podra filtrar entre los distintos compradores y sus
              respectivas compras que se encuentren en nuestra base de datos.
            </p>
          </div>
          {/* Inputs */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex flex-col ">
              <p class="text-gray-700 text-base">Filtrar propiedad</p>
              <select
                name="propiedadBusquedaCantidad"
                id="propiedadBusquedaCantidad"
                onChange={handleInputChange}
                className="shadow-lg border border-zinc-600 pl-1"
              >
                <option value="MENOR" selected>
                  Menor que
                </option>
                <option value="MAYOR">Mayor que</option>
              </select>
            </div>
            <div className="flex flex-col">
              <p class="text-gray-700 text-base">
                Filtrar por cantidad de compras realizadas
              </p>
              <input
                type="number"
                name="cantidadCompra"
                id="cantidadCompra"
                value={filtroCompra.cantidadCompra}
                onChange={handleInputChange}
                className="shadow-lg border border-zinc-600 pl-1"
              />
            </div>
            <div className="flex flex-col">
              <p class="text-gray-700 text-base">Filtrar por Fecha</p>
              <input
                type="date"
                name="fechaCompra"
                id="fechaCompra"
                value={filtroCompra.fechaCompra}
                onChange={handleInputChange}
                className="shadow-lg border border-zinc-600 pl-1"
              />
            </div>
          </div>

          <div class="py-4 flex justify-center items-center">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      {listadoCompras.length === 0 ? (
        <p className="text-gray-700 text-center mt-4 text-lg">
          Realice una búsqueda
        </p>
      ) : (
        <ShowResultsComponent listaCompras={listadoCompras} />
      )}
    </div>
  );
};

const ShowResultsComponent = ({ listaCompras }) => {
  const compras = listaCompras?.response;
  console.log(compras);

  return (
    <div class="relative overflow-x-auto mt-12">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Nombre Comprador
            </th>
            <th scope="col" class="px-6 py-3">
              ID_Comprador
            </th>
            <th scope="col" class="px-6 py-3">
              Apellidos
            </th>
            <th scope="col" class="px-6 py-3">
              Tipo
            </th>
            <th scope="col" class="px-6 py-3">
              Fecha de Compra
            </th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            console.log(compra),
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {compra.Nombre}
              </th>
              <td class="px-6 py-4">{compra.idComprador}</td>
              <td class="px-6 py-4">{compra.Apellidos}</td>
              <td class="px-6 py-4">{compra.Tipo}</td>
              <td class="px-6 py-4">{compra.fechaDeCompra}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchCostumers;
