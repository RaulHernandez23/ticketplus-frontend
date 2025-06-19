import { useEffect, useState } from "react";
import TopBar from "../../components/ui/TopBar";
import { RiRefund2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";

export default function SelectTicketForRefund() {
  const [boletos, setBoletos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoletos = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No hay sesión activa.");
          setLoading(false);
          return;
        }
        const data = await apiFetch("/api/boletos/reembolsables", {
          headers: {
            "x-token": token,
          },
        });
        setBoletos(data);
      } catch (err) {
        setError("No se pudieron cargar los boletos reembolsables.");
      } finally {
        setLoading(false);
      }
    };
    fetchBoletos();
  }, []);

  return (
    <div className="min-h-screen w-full bg-white">
      <TopBar />
      <div className="max-w-6xl mx-auto mt-10 px-4">
        {/* Breadcrumb */}
        <a
          href="#"
          className="text-xs text-[#2D3FBD] underline mb-2 inline-block font-bold"
        >
          Reembolso
        </a>
        {/* Título principal */}
        <h1 className="text-5xl font-bold text-[#2D3FBD] mb-2 mt-2 leading-tight">
          Solicitar reembolso
        </h1>
      </div>
      {/* Línea divisoria*/}
      <div className="w-full border-b-2 border-black mb-10 mt-4" />

      {/* Caja de boletos */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-2 border-black bg-white p-8">
          <h2 className="text-2xl font-bold mb-1 text-black">Tus boletos</h2>
          <p className="mb-8 text-base text-black font-normal">
            Selecciona el boleto en el que deseas solicitar un reembolso
          </p>
          {loading ? (
            <p className="text-center text-black">Cargando boletos...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : boletos.length === 0 ? (
            <p className="text-center text-black">
              No tienes boletos reembolsables.
            </p>
          ) : (
            <div className="space-y-4">
              {boletos.map((boleto) => (
                <div
                  key={boleto.id_boleto}
                  className="flex items-center border border-black px-0 py-0 justify-between bg-white"
                >
                  {/* Datos del boleto en formato tabla */}
                  <div className="flex-1 grid grid-cols-5 divide-x divide-black">
                    <div className="flex items-center justify-center py-6">
                      <span className="font-bold text-lg text-black text-center">
                        {boleto.evento}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-6">
                      <span className="text-sm font-bold text-black">
                        Sección
                      </span>
                      <span className="text-base font-normal text-black">
                        {boleto.seccion}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-6">
                      <span className="text-sm font-bold text-black">Fila</span>
                      <span className="text-base font-normal text-black">
                        {boleto.fila}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-6">
                      <span className="text-sm font-bold text-black">
                        Asiento
                      </span>
                      <span className="text-base font-normal text-black">
                        {boleto.asiento}
                      </span>
                    </div>
                    {/* Botón de reembolso */}
                    <div className="flex items-center justify-center py-2">
                      <button
                        className="w-16 h-16 flex items-center justify-center border-2 border-black bg-white hover:bg-gray-100 transition"
                        style={{ borderRadius: "0", padding: 0 }}
                        onClick={() =>
                          navigate(`/solicitar-reembolso/${boleto.id_boleto}`)
                        }
                        aria-label="Solicitar reembolso"
                      >
                        <RiRefund2Line size={45} color="#2D3FBD" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Bloque en blanco al final */}
      <div className="w-full h-32 bg-white" />
    </div>
  );
}
