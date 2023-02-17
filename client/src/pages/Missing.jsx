import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Missing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return (
    <div className="bg-slate-100 h-screen overflow-x-auto w-full">
      <div className="flex flex-col justify-center items-center mt-24">
        <div class="max-w-7xl rounded overflow-hidden shadow-lg bg-white">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-center text-blue-900">
              Oops! Lo sentimos esta página no existe
            </div>
            <p class="text-gray-700 text-lg">
              Podrías navegar hacia la página principal o quizas seleccionar
              alguna de las distintas opciones que se encuentran en la parte
              superior
            </p>
          </div>
          <div class="px-6 pt-4 pb-2 text-end">
            <span
              class="inline-block bg-sky-600 rounded-full px-3 py-1 font-semibold text-white mr-8 mb-2 cursor-pointer"
              onClick={() => {
                navigate(from, { replace: true });
              }}
            >
              Volver
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missing;
