import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { FiDelete, FiFilter } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductList = () => {
  const navigate = useNavigate();

  const [idProducto, setIdProducto] = useState();
  const [contadorProductos, setContadorProductos] = useState();
  const [listadoProductos, setListadoProductos] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get("http://localhost:4000/products/count");
        setContadorProductos(result.data);
      } catch (error) {
        throw Error("Error getting products count");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const value = Math.max(
      0,
      Math.min(contadorProductos, Number(e.target.value))
    );
    setIdProducto(value);
  };

  const handleSubmit = async () => {
    if (typeof idProducto !== "number")
      return toast.error("Ingrese un valor valido");

    try {
      setIsLoading(true);
      if (idProducto === 0) {
        const result = await axios.get("http://localhost:4000/products");
        return setListadoProductos(result.data);
      } else {
        const result = await axios.post(
          "http://localhost:4000/products/find-one",
          { id: idProducto }
        );
        return setListadoProductos(result.data);
      }
    } catch (error) {
      toast.error({ error });
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
            <h1 className="hidden lg:flex text-md xl:text-lg pt-2 px-2 font-semibold ">
              Agregar Producto
            </h1>
          </div>
          <div
          className="py-4 pl-2 my-4 bg-gray-900 text-white w-1/6 flex items-center justify-center rounded-xl shadow-md cursor-pointer"
          onClick={() => navigate("/products")}
        >
          <FiFilter size={36} />
          <h1 className="hidden lg:flex text-md xl:text-lg pt-2 px-2 font-semibold ">
            Filtrar Producto
          </h1>
        </div>
        </div>

        <div class="max-w-7xl rounded overflow-hidden shadow-lg bg-white">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-center">
              Administrador productos
            </div>
            <p class="text-gray-700 text-base">
              Aquí podrá obtener todos los productos o buscar un unico producto
              por ID y eliminarlo de la base de datos
            </p>
          </div>
          {/* Inputs */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex flex-col ">
              <p class="text-gray-700 text-base">Buscar producto por ID</p>
              <input
                type="number"
                name="idProducto"
                id="idProducto"
                value={idProducto}
                onChange={handleInputChange}
                className="shadow-lg border border-zinc-600 pl-1"
              />
            </div>
          </div>
          <p className="text-gray-700 text-sm text-center mt-2 font-bold">
            Al ingresar 0 traera todos los productos
          </p>

          <div class="py-4 flex justify-center items-center">
            <button
              type="button"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-25"
              onClick={handleSubmit}
              disabled={isLoading ? true : false}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      {!listadoProductos ? (
        <p className="text-gray-700 text-center mt-4 text-lg">
          Realice una búsqueda
        </p>
      ) : (
        <ShowResultsComponent
          listadoProductos={listadoProductos}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

const ShowResultsComponent = ({ listadoProductos, handleSubmit }) => {
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete("http://localhost:4000/products", { data: { id } });
      handleSubmit();
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  if (listadoProductos.length === 0) {
    return (
      <p className="text-red-500 text-center mt-4 text-lg">
        El producto ingresado fue eliminado anteriomente
      </p>
    );
  }

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
            <th scope="col" class="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {listadoProductos?.map((producto) => (
            <tr
              key={producto?.ID_Producto}
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
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
              <td class="px-6 py-4">
                {
                  <FiDelete
                    onClick={() => handleDeleteItem(producto.ID_Producto)}
                    size={32}
                    className="text-red-500 cursor-pointer"
                  />
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
