import { useEffect, useState } from "react";
import TopBar from "../../components/ui/TopBar";
import { useParams, useNavigate } from "react-router-dom";
import { RiCheckboxCircleLine } from "react-icons/ri";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import { apiFetch } from "../../services/api";

const MOTIVOS = [
  "Conflicto en mis tiempos",
  "Problema técnico en la compra",
  "Cambie de opinión con el evento",
  "Otro",
];

export default function RefundForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [boleto, setBoleto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [motivo, setMotivo] = useState("");
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchDetalle = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No hay sesión activa.");
          setLoading(false);
          return;
        }
        const data = await apiFetch(`/api/boletos/${id}/detalle`, {
          headers: { "x-token": token },
        });
        setBoleto(data);
      } catch (err) {
        setError("No se pudo cargar el detalle del boleto.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetalle();
  }, [id]);

  function getTiempoRestante(fecha) {
    if (!fecha) return "";
    const evento = new Date(fecha);
    const ahora = new Date();
    const diff = evento - ahora;
    if (diff <= 0) return "El evento ya ocurrió";
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    return `faltan  ${dias} días y ${horas} horas para el evento`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!motivo) return;
    setShowConfirm(true);
  };

  const handleConfirmRefund = async () => {
    setEnviando(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await apiFetch(`/api/boletos/${id}/reembolso`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
        body: JSON.stringify({
          motivo,
          comentario,
        }),
      });
      navigate("/solicitar-reembolso/exito");
    } catch (err) {
      setError("Ocurrió un error al enviar la solicitud.");
    } finally {
      setEnviando(false);
      setShowConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white">
        <TopBar />
        <div className="flex justify-center items-center h-96">
          <span className="text-black text-xl">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <TopBar />
      <div className="max-w-6xl mx-auto mt-10 px-4">
        {/* Breadcrumb */}
        <button
          type="button"
          onClick={() => navigate("/solicitar-reembolso")}
          className="text-xs text-[#2D3FBD] underline mb-2 inline-block font-bold focus:outline-none"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          Reembolso
        </button>
        {/* Título principal */}
        <h1 className="text-5xl font-bold text-[#2D3FBD] mb-2 mt-2 leading-tight">
          Solicitar reembolso
        </h1>
      </div>
      {/* Línea */}
      <div className="w-full border-b-2 border-black mb-10 mt-4" />

      {/* Contenedor principal*/}
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="border-2 border-black bg-white p-8"
          style={{ borderRadius: 0 }}
        >
          {/* Aviso de reembolso disponible */}
          {boleto && (
            <div
              className="flex items-center border-2 border-black bg-white px-4 py-3 mb-8"
              style={{ borderRadius: 0 }}
            >
              <RiCheckboxCircleLine
                size={28}
                color="#2D3FBD"
                className="mr-2"
              />
              <span className="font-bold text-[#2D3FBD] mr-2">
                Reembolso disponible:
              </span>
              <span className="text-black">
                {getTiempoRestante(boleto.fecha)}
              </span>
            </div>
          )}

          {/* Detalle de la solicitud */}
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-black">
              Detalle de la solicitud
            </h2>
            <div className="mb-8">
              <span className="block font-bold mb-2 text-black">
                Motivo de la solicitud
              </span>
              <div className="space-y-2">
                {MOTIVOS.map((m) => (
                  <label key={m} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={motivo === m}
                      onChange={() => setMotivo(m)}
                      className="w-5 h-5 mr-3 accent-[#2D3FBD] border-2 border-black"
                      disabled={enviando}
                      style={{ borderRadius: 0 }}
                    />
                    <span className="text-black">{m}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <label className="block font-bold mb-2 text-black">
                Comentario:{" "}
                <span className="font-normal text-gray-700">(Opcional)</span>
              </label>
              <textarea
                className="w-full border-2 border-black p-3 text-black"
                rows={4}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                disabled={enviando}
                placeholder="Agrega un comentario si lo deseas"
                style={{ borderRadius: 0 }}
              />
            </div>
            {/* Resumen del boleto */}
            {boleto && (
              <div className="mt-10">
                <h3 className="text-2xl font-bold mb-2 text-black">
                  Resumen del boleto
                </h3>
                <div className="flex flex-wrap mb-2">
                  <span className="font-bold mr-4 text-black">Concierto:</span>
                  <span className="mr-8 text-black">{boleto.evento}</span>
                  <span className="font-bold mr-2 text-black">Fecha:</span>
                  <span className="text-black">
                    {new Date(boleto.fecha).toLocaleDateString()}
                  </span>
                </div>
                <div
                  className="border-2 border-black mb-4 grid grid-cols-3 divide-x-2 divide-black"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex flex-col items-center py-3">
                    <span className="text-sm font-bold text-black">
                      Sección
                    </span>
                    <span className="text-base font-normal text-black">
                      {boleto.seccion}
                    </span>
                  </div>
                  <div className="flex flex-col items-center py-3">
                    <span className="text-sm font-bold text-black">Fila</span>
                    <span className="text-base font-normal text-black">
                      {boleto.fila}
                    </span>
                  </div>
                  <div className="flex flex-col items-center py-3">
                    <span className="text-sm font-bold text-black">
                      Asiento
                    </span>
                    <span className="text-base font-normal text-black">
                      {boleto.asiento}
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="font-bold text-black">
                    Detalle de compra:
                  </span>
                  <div className="flex justify-between mt-2">
                    <span className="text-black">1 boleto digital</span>
                    <span className="text-black">
                      {boleto.precio_boleto != null
                        ? Number(boleto.precio_boleto).toLocaleString("es-MX", {
                            style: "currency",
                            currency: "MXN",
                            minimumFractionDigits: 2,
                          })
                        : "--"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black">Cargos por orden</span>
                    <span className="text-black">
                      {boleto.cargos_por_orden != null
                        ? Number(boleto.cargos_por_orden).toLocaleString(
                            "es-MX",
                            {
                              style: "currency",
                              currency: "MXN",
                              minimumFractionDigits: 2,
                            }
                          )
                        : "--"}
                    </span>
                  </div>
                  <hr className="my-2 border-black" />
                  <div className="flex justify-between font-bold">
                    <span className="text-black">Total devolución</span>
                    <span className="text-black">
                      {boleto.total_devolucion != null
                        ? "MX " +
                          Number(boleto.total_devolucion).toLocaleString(
                            "es-MX",
                            {
                              minimumFractionDigits: 2,
                            }
                          )
                        : "--"}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {error && <p className="text-red-600 mt-4">{error}</p>}
            <div className="flex gap-6 mt-10">
              <PrimaryButton
                type="submit"
                className={`w-40 text-lg ${
                  !motivo || enviando ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!motivo || enviando}
              >
                Confirmar
              </PrimaryButton>
              <SecondaryButton
                type="button"
                className="w-40 text-lg"
                onClick={() => navigate("/solicitar-reembolso")}
                disabled={enviando}
              >
                Cancelar
              </SecondaryButton>
            </div>
            {showConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white border-2 border-black rounded p-8 max-w-sm w-full text-center">
                  <h3 className="text-xl font-bold mb-4 text-black">
                    ¿Estás seguro?
                  </h3>
                  <p className="mb-6 text-black">
                    ¿Deseas solicitar el reembolso de este boleto?
                    <br />
                    Esta acción no se puede deshacer.
                  </p>
                  <div className="flex justify-center gap-4">
                    <PrimaryButton
                      type="button"
                      onClick={handleConfirmRefund}
                      disabled={enviando}
                    >
                      Sí, solicitar reembolso
                    </PrimaryButton>
                    <SecondaryButton
                      type="button"
                      onClick={() => setShowConfirm(false)}
                      disabled={enviando}
                    >
                      Cancelar
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      {/* Bloque en blanco al final */}
      <div className="w-full h-32 bg-white" />
    </div>
  );
}
