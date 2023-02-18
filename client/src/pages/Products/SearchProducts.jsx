import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { AiOutlineAppstoreAdd, AiOutlineFileSearch } from "react-icons/ai";

const SearchProducts = () => {
  const navigate = useNavigate();

  const initialState = {
    precioProducto: null,
    cantidadProducto: null,
    propiedadBusquedaPrecio: "MENOR",
    propiedadBusquedaCantidad: "MENOR",
  };

  const [filtroProducto, setFiltroProducto] = useState(initialState);
  const [listadoProductos, setListadoProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFiltroProducto({
      ...filtroProducto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/products/filtered",
        { filtroProducto }
      );
      setListadoProductos(response.data);
    } catch (error) {
      console.log(error);
      setFiltroProducto(initialState);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 h-screen overflow-x-auto">
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-full justify-center items-center gap-4">
          <div
            className="py-4 pl-2 my-4 bg-gray-900 text-white w-1/6 flex items-center justify-center rounded-xl shadow-md cursor-pointer"
            onClick={() => navigate("/products/new")}
          >
            <AiOutlineAppstoreAdd size={36} />
            <h1 className="hidden lg:flex text-md pt-1 px-2 font-semibold ">
              Agregar Producto
            </h1>
          </div>
          <div
            className="py-4 pl-2 my-4 bg-gray-900 text-white w-1/6 flex items-center justify-center rounded-xl shadow-md cursor-pointer"
            onClick={() => navigate("/products/list")}
          >
            <AiOutlineFileSearch size={36} />
            <h1 className="hidden lg:flex text-md pt-1 px-2 font-semibold ">
              Administrar Productos
            </h1>
          </div>
        </div>
        <div class="max-w-7xl rounded overflow-hidden shadow-lg bg-white">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-center">
              Búsqueda de producto
            </div>
            <p class="text-gray-700 text-base">
              Aquí podra filtrar entre los distintos productos que se encuentren
              en nuestra base de datos.
            </p>
          </div>
          {/* Inputs */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex flex-col ">
              <p class="text-gray-700 text-base">Filtrar por precio</p>
              <select
                name="propiedadBusquedaPrecio"
                id="propiedadBusquedaPrecio"
                onChange={handleInputChange}
                className="my-2"
              >
                <option value="MENOR" selected>
                  Menor que
                </option>
                <option value="MAYOR">Mayor que</option>
              </select>
              <input
                type="number"
                name="precioProducto"
                id="precioProducto"
                value={filtroProducto.precioProducto}
                onChange={handleInputChange}
                className="shadow-lg border border-zinc-600 pl-1"
              />
            </div>
            <div className="flex flex-col">
              <p class="text-gray-700 text-base">Filtrar por cantidad</p>
              <select
                name="propiedadBusquedaCantidad"
                id="propiedadBusquedaCantidad"
                onChange={handleInputChange}
                className="my-2"
              >
                <option value="MENOR" selected>
                  Menor que
                </option>
                <option value="MAYOR">Mayor que</option>
              </select>
              <input
                type="number"
                name="cantidadProducto"
                id="cantidadProducto"
                value={filtroProducto.cantidadProducto}
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

      {listadoProductos.length === 0 ? (
        <p className="text-gray-700 text-center mt-4 text-lg">
          Realice una búsqueda
        </p>
      ) : (
        <ShowResultsComponent listaProductos={listadoProductos} />
      )}
    </div>
  );
};

const ShowResultsComponent = ({ listaProductos }) => {
  const productos = listaProductos?.result;
  if (listaProductos?.result.length === 0)
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
              Nombre Producto
            </th>
            <th scope="col" class="px-6 py-3">
              ID_Producto
            </th>
            <th scope="col" class="px-6 py-3">
              Descripción
            </th>
            <th scope="col" class="px-6 py-3">
              Precio
            </th>
            <th scope="col" class="px-6 py-3">
              Stock
            </th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {producto.Nombre}
              </th>
              <td class="px-6 py-4">{producto.ID_Producto}</td>
              <td class="px-6 py-4">{producto.Descripcion}</td>
              <td class="px-6 py-4">{producto.Precio}</td>
              <td class="px-6 py-4">{producto.Cantidad_Stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchProducts;
