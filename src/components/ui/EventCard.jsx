import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultBanner = "/Soon.png";

export default function EventCard({ offset }) {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/eventos?limit=1&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setEvento(data[0]);
        else setEvento(null);
      })
      .catch(() => setEvento(null))
      .finally(() => setLoading(false));
  }, [offset]);

  if (loading) {
    return (
      <div className="border rounded p-4 flex items-center justify-center h-64">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="border rounded p-4 text-center">
        <img
          src={defaultBanner}
          alt="Evento por defecto"
          className="w-full h-40 object-cover mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">Próximamente...</h3>
        <button
          disabled
          className="bg-gray-400 cursor-not-allowed px-4 py-2 rounded"
        >
          Ver más
        </button>
      </div>
    );
  }

  return (
    <div className="border rounded p-4">
      <img
        src={evento.banner_base64}
        alt={evento.titulo}
        className="w-full h-40 object-cover mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{evento.titulo}</h3>
      <button
        onClick={() => navigate(`/event-details/${evento.id_evento}`)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Ver más
      </button>
    </div>
  );
}