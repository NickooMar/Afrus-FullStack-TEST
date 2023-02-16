import React, { useState, useEffect } from "react";
import axios from "axios";

import { FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const [contadorCompradores, setContadorCompradores] = useState(0);
  const [contadorProductos, setContadorProductos] = useState(0);

  const Impuestos = [
    "IVA",
    "Monotributo",
    "Impuesto a las ganancias",
    "Impuesto de Sellado",
  ];
  const [cantidad, setCantidad] = useState(1);
  const [inputNumberComprador, setInputNumberComprador] = useState(1);
  const [inputNumberProducto, setInputNumberProducto] = useState(1);
  const [impuestoSeleccionado, setImpuestoSeleccionado] = useState("");
  const [montoImpuesto, setMontoImpuesto] = useState(0);

  const [productoCalculado, setProductoCalculado] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      const result = await axios.get("http://localhost:4000/costumers/count");
      setContadorCompradores(result.data);
    };

    const fetchProducts = async () => {
      const result = await axios.get("http://localhost:4000/products/count");
      setContadorProductos(result.data);
    };

    fetchClients();
    fetchProducts();
  }, []);

  const handleInputCompradorChange = (e) => {
    const value = Math.max(
      1,
      Math.min(contadorCompradores, Number(e.target.value))
    );
    setInputNumberComprador(value);
  };

  const handleInputProductosChange = (e) => {
    const value = Math.max(
      1,
      Math.min(contadorProductos, Number(e.target.value))
    );
    setInputNumberProducto(value);
  };

  const handleSelectImpuestosChange = (e) => {
    setImpuestoSeleccionado(e.target.value);
  };

  const handleCalculate = () => {
    const fetchSingleProduct = async () => {
      const result = await axios.post(
        "http://localhost:4000/products/find-one",
        { id: inputNumberProducto }
      );
      setProductoCalculado(result.data[0]);
    };

    document.getElementById("idComprador").disabled = true;
    fetchSingleProduct();
  };

  return (
    <>
      <div className="h-screen overflow-x-auto bg-gray-100">
        <div className="flex justify-center items-center pt-12">
          <div className="h-3/4 w-4/6 rounded-xl bg-slate-900">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-semibold text-white text-center pt-4 font-mono">
                REALIZAR COMPRA
              </h1>
              <div className="w-1/2 h-0.5 bg-slate-800 mt-4" />
            </div>

            <div className="grid grid-cols-2 h-[300px] place-items-center px-8">
              <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-lg font-semibold text-center text-white">Identificación de Comprador (ID)</h1>
                <input
                  type="number"
                  name="idComprador"
                  id="idComprador"
                  value={inputNumberComprador}
                  onChange={handleInputCompradorChange}
                  className='rounded-lg mt-2 shadow-md shadow-slate-800 w-1/2 text-xl pl-2'
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-lg font-semibold text-center text-white">Identificador de Producto (ID)</h1>
                <input
                  type="number"
                  name="idProducto"
                  id="idProducto"
                  value={inputNumberProducto}
                  onChange={handleInputProductosChange}
                  className='rounded-lg mt-2 shadow-md shadow-slate-800 w-1/2 text-xl pl-2'
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-lg font-semibold text-center text-white">Cantidad</h1>
                <input
                  type="number"
                  name="cantidad"
                  id="cantidad"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  className='rounded-lg mt-2 shadow-md shadow-slate-800 w-1/2 text-xl pl-2'
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-lg font-semibold text-center text-white">Impuesto</h1>
                <select
                  name="impuestos"
                  id="impuestos"
                  onChange={handleSelectImpuestosChange}
                  className='rounded-lg mt-2 shadow-md shadow-slate-800 w-1/2 text-xl pl-2'
                >
                  <option value="Seleccionar" disabled selected >
                    Seleccionar
                  </option>
                  {Impuestos.map((impuesto) => (
                    <option value={impuesto} key={impuesto}>
                      {impuesto}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-lg font-semibold text-center text-white">Total Impuesto ($)</h1>
                <input
                  type="number"
                  name="montoImpuesto"
                  id="montoImpuesto"
                  value={montoImpuesto}
                  onChange={(e) => setMontoImpuesto(e.target.value)}
                  className='rounded-lg mt-2 shadow-md shadow-slate-800 w-1/2 text-xl pl-2'
                />
              </div>
            </div>
              <div className="flex justify-center w-full my-4">
                <button onClick={handleCalculate} className='py-2 px-4 w-2/5 bg-blue-600 rounded-xl text-2xl text-white'>Calcular</button>
              </div>
          </div>
        </div>
        {!productoCalculado ? (
          <h1 className="text-center text-2xl mt-4 pb-4">
            Todavía no se ingresaron productos
          </h1>
        ) : (
          <ShowCalculateComponent
            resultado={productoCalculado}
            cantidad={cantidad}
            montoImpuesto={montoImpuesto}
            idComprador={inputNumberComprador}
            impuesto={impuestoSeleccionado}
          />
        )}
      </div>
    </>
  );
};

const ShowCalculateComponent = ({
  resultado,
  cantidad,
  montoImpuesto,
  idComprador,
  impuesto,
}) => {
  const { ID_Producto, Nombre, Descripcion, Precio, Cantidad_Stock } =
    resultado;
  const totalFinal =
    Number(cantidad) * Number(resultado.Precio) + Number(montoImpuesto);

  const descripcionUltimoProductoIngresado = {
    ID_Producto,
    Nombre,
    Precio,
    Cantidad_Stock,
    cantidad,
    totalFinal,
    montoImpuesto,
    impuesto,
    idComprador,
  };

  const [order, setOrder] = useState([]);

  const handleAddProduct = (e) => {
    setOrder((current) => [...current, descripcionUltimoProductoIngresado]);
  };

  return (
    <>
      <div class="relative overflow-x-auto mt-12 pb-12">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Nombre Prod.
              </th>
              <th scope="col" class="px-6 py-3">
                ID Comprador
              </th>
              <th scope="col" class="px-6 py-3">
                ID_Producto
              </th>
              <th scope="col" class="px-6 py-3">
                Precio Unitario
              </th>
              <th scope="col" class="px-6 py-3">
                Stock
              </th>
              <th scope="col" class="px-6 py-3">
                Cantidad solicitada
              </th>
              <th scope="col" class="px-6 py-3">
                Impuesto
              </th>
              <th scope="col" class="px-6 py-3">
                Impuesto Monto
              </th>
              <th scope="col" class="px-6 py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {Nombre}
              </th>
              <td class="px-6 py-4">{idComprador}</td>
              <td class="px-6 py-4">{ID_Producto}</td>
              <td class="px-6 py-4">{Precio}</td>
              <td class="px-6 py-4">{Cantidad_Stock}</td>
              <td class="px-6 py-4">{cantidad}</td>
              <td class="px-6 py-4">{impuesto}</td>
              <td class="px-6 py-4">{montoImpuesto}</td>
              <td class="px-6 py-4">{totalFinal}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleAddProduct}
            className="text-white p-2 rounded-lg bg-green-600 disabled:opacity-50"
            disabled={cantidad > Cantidad_Stock ? true : false}
          >
            Ingresar producto
          </button>
        </div>
      </div>
      {order.length !== 0 && (
        <ShowFinalOrder order={order} setOrder={setOrder} />
      )}
    </>
  );
};

const ShowFinalOrder = ({ order, setOrder }) => {
  const navigate = useNavigate();
  var totalFinalTransaction = 0;

  const handleDeleteItem = (i) => {
    order.splice(i, 1);
    setOrder([...order]);
  };

  const handleNewBuy = async () => {
    const result = await axios.post("http://localhost:4000/transactions", {
      order,
      totalFinalTransaction,
    });
    toast.success("Compra Realizada correctamente");
    navigate("/");
    console.log(result);
  };

  return (
    <div class="relative overflow-x-auto mt-12 pb-12">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Nombre Prod.
            </th>
            <th scope="col" class="px-6 py-3">
              ID Comprador
            </th>
            <th scope="col" class="px-6 py-3">
              ID_Producto
            </th>
            <th scope="col" class="px-6 py-3">
              Precio Unitario
            </th>
            <th scope="col" class="px-6 py-3">
              Stock
            </th>
            <th scope="col" class="px-6 py-3">
              Cantidad solicitada
            </th>
            <th scope="col" class="px-6 py-3">
              Impuesto
            </th>
            <th scope="col" class="px-6 py-3">
              Impuesto Monto
            </th>
            <th scope="col" class="px-6 py-3">
              Total
            </th>
            <th scope="col" class="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {order.map(
            (item, indice) => (
              (totalFinalTransaction += item.totalFinal),
              (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.Nombre}
                  </th>
                  <td class="px-6 py-4">{item.idComprador}</td>
                  <td class="px-6 py-4">{item.ID_Producto}</td>
                  <td class="px-6 py-4">{item.Precio}</td>
                  <td class="px-6 py-4">{item.Cantidad_Stock}</td>
                  <td class="px-6 py-4">{item.cantidad}</td>
                  <td class="px-6 py-4">{item.impuesto}</td>
                  <td class="px-6 py-4">{item.montoImpuesto}</td>
                  <td class="px-6 py-4">{item.totalFinal}</td>
                  <td class="px-6 py-4">
                    <FiDelete
                      className="cursor-pointer ml-3"
                      size={34}
                      onClick={() => handleDeleteItem(indice)}
                    />
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
      <div className="flex justify-center p-4 bg-slate-600 rounded-xl text-white">
        <h1>Total Final: $</h1>
        <p>{totalFinalTransaction}</p>
      </div>
      <div className="flex justify-center w-full">
        <button
          className="p-3 bg-green-600 rounded-xl text-white mt-6"
          onClick={handleNewBuy}
        >
          Realizar Compra
        </button>
      </div>
    </div>
  );
};

export default AddTransaction;
