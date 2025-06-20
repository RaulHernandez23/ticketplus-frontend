import TopBar from "../components/ui/TopBar";
import TicketSummary from "../components/ui/TicketSummary";
import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function PurchaseHistory() {
  const [compras, setCompras] = useState([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [soloAsistidos, setSoloAsistidos] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoletos = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const data = await apiFetch("/api/boletos/transferibles", {
          headers: { "x-token": token },
        });
        const adaptados = (data || []).map((boleto) => ({
          funcion: boleto.evento || "",
          fecha: boleto.fecha || "",
          seccion: boleto.seccion || "",
          fila: boleto.fila || "",
          asientos: boleto.asiento || "",
          asiento: {
            fila: boleto.fila || "",
            numero: boleto.asiento || "",
          },
          zona: {
            nombre_zona: boleto.seccion || "",
            precio: boleto.precio || 0,
          },
          id_funcion: boleto.id_funcion || null,
          id_boleto: boleto.id_boleto,
        }));
        setCompras(adaptados);
      } catch (err) {
        setCompras([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBoletos();
  }, []);

  // Filtrar eventos asistidos (fecha pasada)
  const now = new Date();
  const comprasFiltradas = soloAsistidos
    ? compras.filter((c) => c.fecha && new Date(c.fecha) < now)
    : compras;

  // Ajustar el índice seleccionado si el filtro cambia
  useEffect(() => {
    if (comprasFiltradas.length === 0) {
      setSelected(-1);
    } else if (selected >= comprasFiltradas.length || selected < 0) {
      setSelected(0);
    }
    // eslint-disable-next-line
  }, [soloAsistidos, compras.length, comprasFiltradas.length]);

  const compraSeleccionada = selected >= 0 ? comprasFiltradas[selected] : null;

  return (
    <div className="min-h-screen w-full bg-[#f6f8fc]">
      <TopBar />
      <div className="max-w-7xl mx-auto pt-6 px-6">
        {/* Botón volver */}
        <button
          className="text-[#1d1f70] text-xs underline hover:text-[#3a3ee6] transition w-fit bg-transparent border-none p-0"
          style={{ boxShadow: "none" }}
          onClick={() => navigate("/search-event")}
        >
          &lt; Volver
        </button>
        {/* Título */}
        <h1 className="text-5xl font-bold text-[#1d1f70] text-center my-6">
          Historial de Compras
        </h1>
        {/* Checkbox de eventos asistidos */}
        <div className="flex items-center gap-2 mb-8 justify-start">
          <span className="text-xs font-bold text-[#1d1f70]">
            Eventos Asistidos
          </span>
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              id="asistidos"
              className="peer sr-only"
              checked={soloAsistidos}
              onChange={() => setSoloAsistidos((v) => !v)}
            />
            <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-[#1d1f70] transition"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition"></div>
          </label>
        </div>
        {/* Contenido principal */}
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center mt-2">
          {/* Tabla de historial */}
          <div className="flex-1">
            <div className="overflow-x-auto rounded-2xl shadow-lg border-4 border-[#1d1f70] bg-white">
              <table
                className="w-full rounded-2xl overflow-hidden"
                style={{ borderCollapse: "separate", borderSpacing: 0 }}
              >
                <thead>
                  <tr>
                    <th className="py-3 px-4 bg-[#1d1f70] text-white font-bold text-center rounded-tl-2xl">
                      Función
                    </th>
                    <th className="py-3 px-4 bg-[#1d1f70] text-white font-bold text-center">
                      Sección
                    </th>
                    <th className="py-3 px-4 bg-[#1d1f70] text-white font-bold text-center">
                      Fila
                    </th>
                    <th className="py-3 px-4 bg-[#1d1f70] text-white font-bold text-center">
                      Asiento(s)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-8 text-[#1d1f70]"
                      >
                        Cargando boletos...
                      </td>
                    </tr>
                  ) : comprasFiltradas.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-8 text-[#1d1f70]"
                      >
                        No tienes boletos{" "}
                        {soloAsistidos ? "asistidos" : "registrados"}.
                      </td>
                    </tr>
                  ) : (
                    comprasFiltradas.map((compra, idx) => (
                      <tr
                        key={compra.id_boleto}
                        className={`${
                          selected === idx
                            ? "bg-[#e6eaff] font-bold"
                            : "bg-white"
                        } text-[#1d1f70]`}
                        onClick={() => setSelected(idx)}
                        style={
                          idx === comprasFiltradas.length - 1
                            ? {
                                borderBottomLeftRadius: "16px",
                                borderBottomRightRadius: "16px",
                              }
                            : {}
                        }
                      >
                        <td className="py-2 px-4 border-t-4 border-[#1d1f70] border-r-4 border-[#1d1f70] first:rounded-bl-2xl">
                          {compra.funcion}
                        </td>
                        <td className="py-2 px-4 border-t-4 border-[#1d1f70] border-r-4 border-[#1d1f70]">
                          {compra.seccion}
                        </td>
                        <td className="py-2 px-4 border-t-4 border-[#1d1f70] border-r-4 border-[#1d1f70]">
                          {compra.fila}
                        </td>
                        <td className="py-2 px-4 border-t-4 border-[#1d1f70] last:rounded-br-2xl">
                          {compra.asientos}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Panel lateral de resumen usando TicketSummary con los datos completos */}
          <div className="w-full lg:w-[350px] min-w-[300px] flex flex-col items-center">
            {compraSeleccionada &&
            compraSeleccionada.asiento &&
            compraSeleccionada.zona &&
            compraSeleccionada.id_funcion ? (
              <>
                <TicketSummary
                  asiento={compraSeleccionada.asiento}
                  zona={compraSeleccionada.zona}
                  id_funcion={compraSeleccionada.id_funcion}
                />
                <div style={{ height: "18px" }} />
                {soloAsistidos && (
                  <button
                    className="w-11/12 py-2 bg-[#1d1f70] text-white font-bold rounded-xl text-lg shadow hover:bg-[#3a3ee6] transition"
                    style={{ maxWidth: 320 }}
                  >
                    Calificar
                  </button>
                )}
              </>
            ) : (
              <div className="text-[#1d1f70] font-bold text-lg text-center opacity-60 px-4 py-10">
                Selecciona una compra para ver el resumen
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Espacio en blanco al final de la página */}
      <div style={{ height: "40px" }} />
    </div>
  );
}
