import { useEffect, useState } from "react";
import TopBar from "../../components/ui/TopBar";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import { apiFetch } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function TransferSummary() {
  const [boletos, setBoletos] = useState([]);
  const [boletosInfo, setBoletosInfo] = useState([]);
  const [receptor, setReceptor] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = JSON.parse(
      localStorage.getItem("boletos_transferencia") || "[]"
    );
    const receptorData = JSON.parse(
      localStorage.getItem("receiver_transfer_data") || "null"
    );
    setBoletos(ids);
    setReceptor(receptorData);

    // Cargar info de los boletos seleccionados
    const fetchBoletosInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || ids.length === 0) return;
        const detalles = await Promise.all(
          ids.map((id) =>
            apiFetch(`/api/boletos/${id}/detalle`, {
              headers: { "x-token": token },
            })
          )
        );
        setBoletosInfo(detalles);
      } catch {
        setBoletosInfo([]);
      }
    };
    fetchBoletosInfo();
  }, []);

  const handleSend = async () => {
    setEnviando(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await apiFetch("/api/boletos/transferir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
        body: JSON.stringify({
          boletos,
          receptor,
        }),
      });
      localStorage.removeItem("boletos_transferencia");
      localStorage.removeItem("receiver_transfer_data");
      navigate("/transferir-boleto/exito", {
        state: { receptor },
      });
    } catch (err) {
      if (err && err.message) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado al transferir los boletos.");
      }
    } finally {
      setEnviando(false);
      setShowConfirm(false);
    }
  };

  const handleCancel = () => {
    navigate("/transferir-boleto");
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <TopBar />
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h2 className="text-4xl font-bold text-blue-700 mb-2 mt-2 leading-tight">
          Resumen
        </h2>
        <div className="text-lg text-black mb-4">Boletos a enviar:</div>
        <div className="space-y-6 mb-8">
          {boletosInfo.map((boleto, idx) => (
            <div
              key={boleto.id_boleto || idx}
              className="border border-black bg-white"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th
                      colSpan={3}
                      className="text-left font-bold text-xl px-4 pt-3 pb-2 border-b border-black text-black"
                    >
                      {boleto.evento}
                    </th>
                  </tr>
                  <tr>
                    <th className="border-b border-black text-center py-2 font-bold text-black">
                      Sección
                    </th>
                    <th className="border-b border-black text-center py-2 font-bold text-black">
                      Fila
                    </th>
                    <th className="border-b border-black text-center py-2 font-bold text-black">
                      Asiento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-r border-black text-center py-4 text-black font-normal">
                      {boleto.seccion}
                    </td>
                    <td className="border-r border-black text-center py-4 text-black font-normal">
                      {boleto.fila}
                    </td>
                    <td className="text-center py-4 text-black font-normal">
                      {boleto.asiento}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <div className="mb-8">
          <div className="text-2xl font-semibold text-black mb-2">
            Receptor:
          </div>
          {receptor && (
            <div className="ml-2 text-black text-lg">
              <div>
                <span className="font-bold">Nombre:</span> {receptor.nombre}
              </div>
              <div>
                <span className="font-bold">Apellidos:</span>{" "}
                {receptor.apellidos}
              </div>
              <div>
                <span className="font-bold">Correo:</span> {receptor.correo}
              </div>
            </div>
          )}
        </div>
        {error && (
          <div className="mb-4">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded font-semibold"
              role="alert"
            >
              {
                // error
                (() => {
                  const match =
                    typeof error === "string" &&
                    error.match(/"mensaje":"(.*?)"/);
                  if (match) return match[1];
                  // Si el error es un string tipo Error 404: {"mensaje":"..."},
                  const match2 =
                    typeof error === "string" &&
                    error.match(/\{"mensaje":"(.*?)"\}/);
                  if (match2) return match2[1];
                  // Si el error es un string plano
                  return typeof error === "string"
                    ? error.replace(/^Error\s*\d*:\s*/, "")
                    : "Ocurrió un error inesperado.";
                })()
              }
            </div>
          </div>
        )}
        <div className="flex gap-8 justify-center mt-8">
          <PrimaryButton
            type="button"
            className={`w-56 text-lg ${
              enviando ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setShowConfirm(true)}
            disabled={enviando}
          >
            Enviar
          </PrimaryButton>
          <SecondaryButton
            type="button"
            className="w-56 text-lg"
            onClick={handleCancel}
            disabled={enviando}
          >
            Cancelar
          </SecondaryButton>
        </div>
        {/* Modal de confirmación */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white border-2 border-black rounded p-8 max-w-sm w-full text-center">
              <h3 className="text-xl font-bold mb-4 text-black">
                ¿Estás seguro?
              </h3>
              <p className="mb-6 text-black">
                ¿Deseas transferir estos boletos a {receptor?.nombre}{" "}
                {receptor?.apellidos}?<br />
                Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-center gap-4">
                <PrimaryButton
                  type="button"
                  onClick={handleSend}
                  disabled={enviando}
                >
                  Sí, transferir
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
      </div>
      <div className="w-full h-32 bg-white" />
    </div>
  );
}
