import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";

export default function PaymentMethods({ selected, onSelect }) {
  const [metodos, setMetodos] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    apiFetch(`/api/boletos/metodos-pago/${usuario.id_usuario}`)
      .then(setMetodos)
      .catch(() => setMetodos([]));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 min-w-[300px] max-w-xs">
      <h2 className="font-bold text-lg text-blue-900 mb-4">Método de Pago</h2>
      <div className="flex flex-col gap-4">
        {metodos.map((m) => (
          <button
            key={m.id_metodo_pago}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition
              ${selected === m.id_metodo_pago
                ? "border-blue-700 bg-blue-100 font-bold"
                : "border-gray-300 bg-gray-100"}
            `}
            onClick={() => onSelect(m.id_metodo_pago)}
            type="button"
          >
            {m.logo_base64 && (
              <img
                src={`data:image/png;base64,${m.logo_base64}`}
                alt={m.nombre}
                className="w-10 h-10 object-contain"
              />
            )}
            <span>{m.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  );
}