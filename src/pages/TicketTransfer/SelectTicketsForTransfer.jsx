import { useEffect, useState } from "react";
import TopBar from "../../components/ui/TopBar";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import { apiFetch } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function SelectTicketsForTransfer() {
  const [boletos, setBoletos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState([]);
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
        const data = await apiFetch("/api/boletos/transferibles", {
          headers: { "x-token": token },
        });
        setBoletos(data);
      } catch (err) {
        setError("No se pudieron cargar los boletos transferibles.");
      } finally {
        setLoading(false);
      }
    };
    fetchBoletos();
  }, []);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelected(boletos.map((b) => b.id_boleto));
  };

  const handleDeselectAll = () => {
    setSelected([]);
  };

  const handleContinue = () => {
    // Guarda la selección para la siguiente pantalla (puedes usar localStorage o contexto)
    localStorage.setItem("boletos_transferencia", JSON.stringify(selected));
    navigate("/transferir-boleto/recibir-datos");
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <TopBar />
      <div className="max-w-6xl mx-auto mt-10 px-4">
        {/* Breadcrumb */}
        <span className="text-xs text-[#2D3FBD] underline mb-2 inline-block font-bold">
          Transferencia de boletos
        </span>
        {/* Título principal */}
        <h1 className="text-5xl font-bold text-[#2D3FBD] mb-2 mt-2 leading-tight">
          Transferencia de boletos
        </h1>
      </div>
      {/* Línea divisoria */}
      <div className="w-full border-b-2 border-black mb-10 mt-4" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="border-2 border-black bg-white p-8">
          <p className="mb-8 text-base text-black font-normal">
            Envía boletos a tus amigos de manera fácil y segura, más información
            en{" "}
            <span className="underline text-[#2D3FBD] cursor-pointer">
              Transferencia de boletos
            </span>
            .
          </p>
          <h2 className="text-2xl font-bold mb-1 text-black">
            Selecciona los boletos a transferir
          </h2>
          <div className="flex gap-6 mb-6 mt-2">
            <button
              type="button"
              className="text-[#2D3FBD] underline font-bold bg-transparent border-none p-0"
              onClick={handleSelectAll}
              disabled={boletos.length === 0}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              Seleccionar todo
            </button>
            <button
              type="button"
              className="text-[#2D3FBD] underline font-bold bg-transparent border-none p-0"
              onClick={handleDeselectAll}
              disabled={selected.length === 0}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              Anular selección
            </button>
          </div>
          {loading ? (
            <p className="text-center text-black">Cargando boletos...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : boletos.length === 0 ? (
            <p className="text-center text-black">
              No tienes boletos transferibles.
            </p>
          ) : (
            <div className="space-y-4">
              {boletos.map((boleto) => (
                <div
                  key={boleto.id_boleto}
                  className="flex items-center border border-black px-0 py-0 justify-between bg-white"
                >
                  <div className="flex items-center px-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(boleto.id_boleto)}
                      onChange={() => handleSelect(boleto.id_boleto)}
                      className="w-5 h-5 mr-4 accent-[#2D3FBD] border-2 border-black"
                      style={{ borderRadius: 0 }}
                    />
                  </div>
                  <div className="flex-1 grid grid-cols-4 divide-x divide-black">
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
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end mt-8">
            <PrimaryButton
              type="button"
              className={`w-40 text-lg ${
                selected.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleContinue}
              disabled={selected.length === 0}
            >
              Continuar
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className="w-full h-32 bg-white" />
    </div>
  );
}
