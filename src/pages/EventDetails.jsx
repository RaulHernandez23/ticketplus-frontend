import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SeatTable from "../components/ui/SeatTable";
import TopBar from "../components/ui/TopBar";

export default function EventDetails() {
  const { id_evento } = useParams();
  const navigate = useNavigate();

  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/eventos/${id_evento}`)
      .then(res => res.json())
      .then(data => {
        setEvento(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id_evento]);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!evento) return <p className="text-center mt-10">Evento no encontrado</p>;

  const {
    titulo,
    descripcion,
    banner_base64,
    fecha_funcion,
    recinto
  } = evento;

  return (
    <div className="bg-white min-h-screen text-black w-full">
      <TopBar />

      <div className="w-full px-8 py-6">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Detalles del Evento
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 w-full">
          {/* Imagen + info lateral */}
          <div className="w-full lg:w-1/3 flex flex-col items-center">
            {banner_base64 && (
              <img
                src={banner_base64}
                alt={`Banner de ${titulo}`}
                className="w-full max-h-96 object-cover rounded-xl shadow-lg"
              />
            )}
            <h3 className="mt-4 text-2xl font-bold text-blue-900">{titulo}</h3>

            <div className="mt-4 text-center text-sm text-gray-800 space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span>📍</span>
                <span>{recinto?.nombre}, {recinto?.ciudad}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>📅</span>
                <span>
                  {new Date(fecha_funcion).toLocaleString("es-MX", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Info + asiento */}
          <div className="w-full lg:w-2/3">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">Descripción</h4>
              <p className="text-gray-800">{descripcion}</p>
            </div>

            <div className="mt-6">
              <SeatTable idEvento={id_evento} />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              <button
                className="w-full sm:w-auto py-2 px-6 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-lg shadow-md transition"
              >
                Comprar Boletos
              </button>

              <button
                onClick={() => navigate("/search-event")} // 👈 Acción de regreso
                className="w-full sm:w-auto py-2 px-6 bg-[#6C63FF] hover:bg-[#574fd1] text-white font-semibold rounded-lg shadow-md transition"
              >
                Regresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}