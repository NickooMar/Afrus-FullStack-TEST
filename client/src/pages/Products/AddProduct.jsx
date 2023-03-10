import React, { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { AiOutlineFileSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";

const AddProduct = () => {
  const navigate = useNavigate();
  const initialState = {
    nombreProducto: "",
    descripcionProducto: "",
    cantidadProducto: 0,
    precioProducto: 1,
  };

  const [nuevoProducto, setNuevoProducto] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    if (typeof e === "number") {
      setNuevoProducto({
        ...nuevoProducto,
        [e.target.name]: Number(e.target.value),
      });
    } else {
      setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (
        !nuevoProducto.nombreProducto ||
        !nuevoProducto.descripcionProducto ||
        !nuevoProducto.cantidadProducto ||
        !nuevoProducto.precioProducto
      ) {
        return toast.error("Ingrese datos validos");
      }
      await axios.post("http://localhost:4000/products", { nuevoProducto });
      setNuevoProducto(initialState);
      toast.success("Producto Agregado Satisfactoriamente");
      navigate("/products");
    } catch (error) {
      console.log(error);
      setNuevoProducto(initialState);
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
            onClick={() => navigate("/products")}
          >
            <FiFilter size={36} />
            <h1 className="hidden lg:flex text-md xl:text-lg pt-2 px-2 font-semibold ">
              Filtrar Producto
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
              Agregar un producto
            </div>
            <p class="text-gray-700 text-base">
              Aqu?? podra agregar cualquier producto que desee, ingresando el
              nombre, descripci??n, stock y precio, el producto generado contar??
              con un ID unico.
            </p>
          </div>
          {/* Inputs */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex flex-col ">
              <p class="text-gray-700 text-base">Nombre del Producto</p>
              <input
                type="text"
                name="nombreProducto"
                id="nombreProducto"
                placeholder="Ingrese un nombre"
                onChange={handleInputChange}
                className="shadow-lg border border-zinc-600 pl-1"
              />
            </div>
            <div className="flex flex-col">
              <p class="text-gray-700 text-base">Descripci??n del producto</p>
              <textarea
                name="descripcionProducto"
                id="descripcionProducto"
                placeholder="Ingrese una descripci??n"
                cols="24"
                rows="1"
                onChange={handleInputChange}
                className="shadow-lg border border-zinc-600 pl-1"
              ></textarea>
            </div>
            <div className="flex flex-col ">
              <p class="text-gray-700 text-base">Cantidad del Producto</p>
              <input
                type="number"
                name="cantidadProducto"
                id="cantidadProducto"
                value={nuevoProducto.cantidadProducto}
                onChange={handleInputChange}
                className="shadow-lg border border-zinc-600 pl-1"
              />
            </div>
            <div className="flex flex-col ">
              <p class="text-gray-700 text-base">Precio del Producto</p>
              <input
                type="number"
                name="precioProducto"
                id="precioProducto"
                value={nuevoProducto.precioProducto}
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
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
