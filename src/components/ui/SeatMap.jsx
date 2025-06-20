import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function SeatMap({ id_funcion: idFuncionProp }) {
  // Permite recibir id_funcion por prop o por URL
  const params = useParams();
  const id_funcion = idFuncionProp || params.id_funcion;

  const [zonas, setZonas] = useState([]);
  const [asientosPorZona, setAsientosPorZona] = useState({});
  const [vendidos, setVendidos] = useState([]);
  const [zonaActiva, setZonaActiva] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null); // Solo uno
  const navigate = useNavigate();

  // 1. Cargar zonas
  useEffect(() => {
    if (!id_funcion) return;
    apiFetch(`/api/boletos/zonas/${id_funcion}`)
      .then(setZonas)
      .catch(() => setZonas([]));
  }, [id_funcion]);

  // 2. Cargar boletos vendidos
  useEffect(() => {
    if (!id_funcion) return;
    apiFetch(`/api/boletos/pagados/${id_funcion}`)
      .then(setVendidos)
      .catch(() => setVendidos([]));
  }, [id_funcion]);

  // 3. Cargar asientos de todas las zonas al inicio
  useEffect(() => {
    zonas.forEach((zona) => {
      if (!asientosPorZona[zona.id_zona]) {
        apiFetch(`/api/boletos/mapa?id_funcion=${id_funcion}&id_zona=${zona.id_zona}`)
          .then((asientos) => {
            setAsientosPorZona((prev) => ({ ...prev, [zona.id_zona]: asientos }));
          })
          .catch(() => {
            setAsientosPorZona((prev) => ({ ...prev, [zona.id_zona]: [] }));
          });
      }
    });
    // eslint-disable-next-line
  }, [zonas]);

  // IDs de asientos ocupados
  const asientosOcupados = new Set(vendidos.map(b => b.id_asiento));

  // Helper: ¿Zona sin asientos disponibles?
  const zonaSinDisponibles = (zona) => {
    const asientos = asientosPorZona[zona.id_zona] || [];
    return asientos.filter(a => !asientosOcupados.has(a.id_asiento)).length === 0;
  };

  // Handler selección/deselección de asiento (solo uno)
  const toggleAsiento = (asiento) => {
    setSeleccionado((prev) =>
      prev && prev.id_asiento === asiento.id_asiento ? null : asiento
    );
  };

  // Agrupar asientos por fila (para la zona activa)
  const filasZonaActiva = zonaActiva
    ? Array.from(
        new Set((asientosPorZona[zonaActiva.id_zona] || []).map(a => a.fila))
      ).sort()
    : [];

  // --- Render ---
  return (
    <div className="w-full flex flex-row gap-8 items-start">
      {/* Escenario rotado */}
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <div
          className="bg-gray-800 text-white text-lg font-bold py-2 px-10 rounded-xl shadow mb-2"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(-180deg)",
            height: "200px",
            minWidth: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ESCENARIO
        </div>
      </div>

      {/* Zonas rotadas en fila */}
      <div className="flex flex-row items-center justify-center gap-4 min-h-[200px]">
        {zonas.map((zona) => {
          const sinDisponibles = zonaSinDisponibles(zona);
          const isActive = zonaActiva && zonaActiva.id_zona === zona.id_zona;
          return (
            <div
              key={zona.id_zona}
              className={`rounded-xl shadow cursor-pointer transition flex items-center justify-center`}
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(-180deg)",
                height: "120px",
                minWidth: "48px",
                fontWeight: 600,
                fontSize: "1.1rem",
                opacity: sinDisponibles ? 0.6 : 1,
                border: isActive ? "3px solid #2D3FBD" : "2px solid #bfcfff",
                background: sinDisponibles
                  ? "#d1d5db"
                  : isActive
                  ? "#1e40af"
                  : "#bfdbfe",
                color: sinDisponibles
                  ? "#6b7280"
                  : isActive
                  ? "#fff"
                  : "#1e3a8a",
                cursor: sinDisponibles ? "not-allowed" : "pointer",
                marginRight: "8px"
              }}
              onClick={() => {
                if (!sinDisponibles) setZonaActiva(isActive ? null : zona);
              }}
            >
              {zona.nombre_zona}
              <span className="ml-2 text-xs" style={{ fontSize: "0.9em" }}>
                (${zona.precio})
              </span>
            </div>
          );
        })}
      </div>

      {/* Asientos de la zona activa */}
      <div className="flex-1 flex flex-col items-center">
        {zonaActiva && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6 min-w-[340px] w-full max-w-lg">
            <div className="flex items-center mb-6">
              {/* Botón volver tipo flecha */}
              <button
                className="mr-4 bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow"
                onClick={() => {
                  setZonaActiva(null);
                  setSeleccionado(null);
                }}
                aria-label="Volver"
                type="button"
              >
                <span className="text-2xl text-blue-900 font-bold">&larr;</span>
              </button>
              <h3 className="text-xl font-bold text-blue-800 flex-1">
                Selecciona tu asiento en {zonaActiva.nombre_zona}
              </h3>
            </div>
            {filasZonaActiva.length === 0 ? (
              <p>No hay asientos disponibles en esta zona.</p>
            ) : (
              <div className="flex gap-8">
                {filasZonaActiva.map((fila) => {
                  const asientosFila = (asientosPorZona[zonaActiva.id_zona] || [])
                    .filter(a => a.fila === fila)
                    .sort((a, b) => a.numero - b.numero);
                  return (
                    <div key={fila} className="flex flex-col items-center">
                      <div className="font-semibold mb-2 text-blue-900 text-lg">Fila {fila}</div>
                      <div className="flex flex-col gap-2">
                        {asientosFila.map((asiento) => {
                          const ocupado = asientosOcupados.has(asiento.id_asiento);
                          const seleccionadoActivo = seleccionado && seleccionado.id_asiento === asiento.id_asiento;
                          return (
                            <button
                              key={asiento.id_asiento}
                              className={`w-10 h-10 rounded border font-bold
                                ${ocupado
                                  ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                                  : seleccionadoActivo
                                  ? "bg-green-500 text-white border-green-700"
                                  : "bg-blue-200 text-blue-900 hover:bg-blue-400"}
                              `}
                              disabled={ocupado}
                              onClick={() => toggleAsiento(asiento)}
                              type="button"
                            >
                              {asiento.numero}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Botón de compra */}
        <div className="flex justify-center mt-6 w-full">
          <button
            className={`px-8 py-3 rounded-lg font-bold text-lg shadow transition
              ${!seleccionado
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#2D3FBD] text-white hover:bg-blue-900"}
            `}
            disabled={!seleccionado}
            onClick={() => {
              if (!seleccionado || !zonaActiva) return;
              // Asegúrate de pasar id_funcion e id_zona en el asiento
              const asientoConFuncion = {
                ...seleccionado,
                id_funcion,
                id_zona: zonaActiva.id_zona,
              };
              navigate("/checkout", {
                state: {
                  asientos: [asientoConFuncion],
                  zona: zonaActiva,
                },
              });
            }}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}