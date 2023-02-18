import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";

const SearchCostumers = () => {
  const navigate = useNavigate();
  function getCurrentDate(separator) {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  }

  const initialState = {
    cantidadCompra: 0,
    propiedadBusquedaCantidad: "MENOR",
    fechaCompra: getCurrentDate("-"),
  };

  const [filtroCompra, setFiltroCompra] = useState(initialState);
  const [listadoCompras, setListadoCompras] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFiltroCompra({ ...filtroCompra, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (
        filtroCompra.cantidadCompra === 0 ||
        !filtroCompra.propiedadBusquedaCantidad ||
        !filtroCompra.fechaCompra
      ) {
        console.log("error");

        return toast.error("Ingrese datos validos");
      }
      filtroCompra.cantidadCompra = Number(filtroCompra.cantidadCompra);
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/costumers/filter",
        { filtroCompra }
      );
      setListadoCompras(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
            <h1 className="hidden lg:flex text-md xl:text-lg pt-2 px-2 font-semibold ">
              Agregar Comprador
            </h1>
          </div>
          <div
            className="py-4 pl-2 my-4 bg-gray-900 text-white w-1/6 flex items-center justify-center rounded-xl shadow-md cursor-pointer"
            onClick={() => navigate("/costumers/list")}
          >
            <FaRegListAlt size={36} />
            <h1 className="hidden lg:flex text-md xl:text-lg pt-2 px-2 font-semibold ">
              Listar Compradores
            </h1>
          </div>
        </div>
        <div class="max-w-7xl rounded overflow-hidden shadow-lg bg-white">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-center">
              Búsqueda de un comprador
            </div>
            <p class="text-gray-700 text-base">
              Aquí podra filtrar entre los distintos compradores y la cantidad
              de compras realizadas por ese comprador que se encuentren en
              nuestra base de datos.
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
              type="button"
              class="bg-blue-500 disabled:opacity-25 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
              disabled={isLoading ? true : false}
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

  if (compras.length === 0)
    return (
      <p class="text-gray-700 font-semibold text-center mt-4">
        No se encontraron productos relacionados a la busqueda
      </p>
    );

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
              Cantidad de compras
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
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {compra.Nombre}
              </th>
              <td class="px-6 py-4">{compra.idComprador}</td>
              <td class="px-6 py-4">{compra.cantidadCompras}</td>
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
