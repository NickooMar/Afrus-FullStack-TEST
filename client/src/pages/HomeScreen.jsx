import React from "react";

import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div className="h-screen w-full overflow-auto bg-slate-100">
      <div className="flex flex-col justify-center items-center mt-24">
        <div class="max-w-md rounded overflow-hidden shadow-lg bg-white hover:opacity-75">
          <Link
            to="https://github.com/NickooMar"
            className="cursor-pointer"
            target="_blank"
          >
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 text-center">
                Examen Técnico Afrus
              </div>
              <p class="text-gray-700 text-base">
                Bienvenido a la presentación del examen técnico. <br />
                En la parte superior encontrara los distintos {' '}
                <span className="italic">Links</span> que lo redireccionaran a
                las pestañas que ejecutarán la funcionalidad solicitada en el
                documento.
              </p>
              <br />
              <p className="text-sm font-semibold">
                Desde ya gracias por la oportunidad y espero haber cumplido con
                los objetivos propuestos
              </p>
            </div>
            <div class="px-6 pt-4 pb-2 text-end">
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Nicolás A. Marsili
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
