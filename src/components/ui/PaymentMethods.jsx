import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";

export default function PaymentMethods({ selected, onSelect }) {
  const [metodos, setMetodos] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!usuario?.id_usuario) return;
    apiFetch(`/api/boletos/metodos-pago/${usuario.id_usuario}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "x-token": `${token}`,
      },
      
    })
      .then(setMetodos)
      .catch(() => setMetodos([]));
  }, [usuario?.id_usuario]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 min-w-[300px] max-w-xs">
      <h2 className="font-bold text-lg text-blue-900 mb-4">Método de Pago</h2>
      <div className="flex flex-col gap-4">
        {metodos.length === 0 && (
          <div className="text-gray-500 text-center">
            No tienes métodos de pago registrados.<br />
            <a
              href="/payment-methods"
              className="text-blue-700 font-semibold text-xs hover:text-blue-900 no-underline pt-2"
            >
              Registrar método de pago
            </a>
          </div>
        )}
        {metodos.map((m) => (
          <button
            key={m.id_metodo_pago}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg border transition text-left
              ${selected === m.id_metodo_pago
                ? "border-blue-700 bg-blue-100 font-bold shadow"
                : "border-gray-300 bg-gray-100"}
            `}
            onClick={() => onSelect(m.id_metodo_pago)}
            type="button"
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2
              ${selected === m.id_metodo_pago ? "border-blue-700" : "border-gray-400"}
            `}>
              {selected === m.id_metodo_pago && (
                <div className="w-3 h-3 bg-blue-700 rounded-full" />
              )}
            </div>
            <div className="flex-1">
              <div className="text-base text-blue-900">
                **** **** **** {m.ultimos_cuatro}
              </div>
              <div className="text-xs text-gray-600">
                {m.titular_tarjeta} &middot; Vence {String(m.vencimiento_mes).padStart(2, "0")}/{m.vencimiento_ano}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}