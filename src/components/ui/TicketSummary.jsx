import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";

export default function TicketSummary({ asiento, zona, id_funcion, onCancel }) {
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    apiFetch(`/api/eventos/${id_funcion}`)
      .then(setEvento)
      .catch(() => setEvento(null));
  }, [id_funcion]);

  // Datos de cargos
  const precio = Number(zona.precio);
  const cargosServicio = 300;
  const cargosEnvio = 50;
  const total = precio + cargosServicio * 1 + cargosEnvio;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-0 min-w-[320px] max-w-xs border-2 border-[#2D3FBD] overflow-hidden flex flex-col">
      {/* Encabezado */}
      <div className="bg-[#2D3FBD] text-white flex rounded-t-2xl">
        <div className="flex-1 text-center py-2 font-semibold border-r border-white">Sección</div>
        <div className="flex-1 text-center py-2 font-semibold border-r border-white">Fila</div>
        <div className="flex-1 text-center py-2 font-semibold">Asiento(s)</div>
      </div>
      <div className="flex text-[#2D3FBD] font-semibold border-b border-[#2D3FBD]">
        <div className="flex-1 text-center py-2">{zona.nombre_zona}</div>
        <div className="flex-1 text-center py-2">{asiento.fila}</div>
        <div className="flex-1 text-center py-2">{asiento.numero}</div>
      </div>
      {/* Imagen */}
      <div className="flex justify-center my-4">
        {evento?.banner_base64 && (
          <img
            src={evento.banner_base64}
            alt={evento.titulo}
            className="rounded-lg w-60 h-56 object-cover"
          />
        )}
      </div>
      {/* Cancelar compra */}
      {onCancel && (
        <button
          className="text-[#2D3FBD] text-sm underline mb-2"
          onClick={onCancel}
        >
          Cancelar Compra
        </button>
      )}
      {/* Detalle de cargos */}
      <div className="px-6 pb-4 text-sm text-[#222]">
        <div className="flex justify-between mb-1">
          <span>Boleto Estándar x1</span>
          <span className="font-bold">${precio.toLocaleString("es-MX")}.00 MXN</span>
        </div>
        <div className="flex flex-col mb-1">
          <div className="flex justify-between">
            <span>Cargos</span>
            <span className="font-bold">${(cargosServicio * 1 + 50).toLocaleString("es-MX")}.00 MXN</span>
          </div>
          <span className="text-xs text-gray-500 ml-2">
            ${cargosServicio}.00 MXN (Cargo por servicio) x1<br />
            ${cargosEnvio}.00 MXN (Cargo por Envío)
          </span>
        </div>
        <div className="flex justify-between font-bold border-t border-gray-300 pt-2 mt-2 text-base">
          <span>Cargos Totales</span>
          <span>${total.toLocaleString("es-MX")}.00 MXN</span>
        </div>
      </div>
    </div>
  );
}