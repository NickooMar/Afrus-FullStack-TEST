import React, { useState } from "react";

import axios from "axios";

const SearchEvent = () => {
  const [eventsResponse, setEventsResponse] = useState();

  const handleSubmit = async () => {
    const response = await axios.get("http://localhost:4000/events");
    setEventsResponse(response.data);
  };

  return (
    <div className="bg-slate-100 h-screen overflow-x-auto w-full">
      <div className="flex flex-col justify-center items-center mt-24">
        <div class="max-w-7xl rounded overflow-hidden shadow-lg bg-white">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-center">
              Listar eventos relacionados con compradores
            </div>
            <p class="text-gray-700 text-base">
              Aquí podra listar a todos los eventos de acuerdo a los respectivos
              compradores que hayan realizado el evento.
            </p>
          </div>
          {/* Inputs */}

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
      {!eventsResponse ? (
        <p className="text-gray-700 text-center mt-4 text-lg">
          Realice una búsqueda
        </p>
      ) : (
        <ShowResultsComponent eventsResponse={eventsResponse} />
      )}
    </div>
  );
};

const ShowResultsComponent = ({ eventsResponse }) => {
  console.log(eventsResponse);

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
              ID Evento
            </th>
            <th scope="col" class="px-6 py-3">
              ID Compra - Evento
            </th>
            <th scope="col" class="px-6 py-3">
              ID Consulta - Evento
            </th>
            <th scope="col" class="px-6 py-3">
              ID Descarga Datos - Evento
            </th>
            <th scope="col" class="px-6 py-3">
              ID Devolución - Evento
            </th>
            <th scope="col" class="px-6 py-3">
              ID Visita - Evento
            </th>
            <th scope="col" class="px-6 py-3">
              ID Actualización Datos - Evento
            </th>
          </tr>
        </thead>
        <tbody>
          {eventsResponse.map((evento) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {evento.Nombre}
              </th>
              <td class="px-6 py-4">{evento.ID_Comprador}</td>
              <td class="px-6 py-4">{evento.Apellidos}</td>
              <td class="px-6 py-4">{evento.ID_Evento}</td>
              <td class="px-6 py-4">{evento.Compra}</td>
              <td class="px-6 py-4">{evento.Consulta}</td>
              <td class="px-6 py-4">{evento.Descarga_Datos}</td>
              <td class="px-6 py-4">{evento.Devolucion}</td>
              <td class="px-6 py-4">{evento.Visita}</td>
              <td class="px-6 py-4">{evento.Actualizacion_Datos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchEvent;
