import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SeatTable from "../components/ui/SeatTable";
import TopBar from "../components/ui/TopBar";

export default function EventDetails() {
  const { id_evento } = useParams();
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
    <div className="bg-white min-h-screen text-black">
      <TopBar />
      <div className="max-w-screen-2xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          {titulo}
        </h2>

        {banner_base64 && (
          <div className="flex justify-center mb-6">
            <img
              src={banner_base64}
              alt={`Banner de ${titulo}`}
              className="max-h-96 rounded shadow-lg"
            />
          </div>
        )}

        <p className="text-lg mb-4"><strong>Descripción:</strong> {descripcion}</p>

        <p className="text-lg mb-4">
          <strong>Fecha del evento:</strong>{" "}
          {new Date(fecha_funcion).toLocaleString("es-MX", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        {recinto && (
          <>
            <p className="text-lg mb-2"><strong>Recinto:</strong> {recinto.nombre}</p>
            <p className="text-lg mb-2">
              <strong>Dirección:</strong> {recinto.calle} {recinto.numero}, {recinto.ciudad}, {recinto.estado}
            </p>
          </>
        )}

        <div className="mt-10 mb-10">
          <h3 className="text-2xl font-semibold text-center mb-4 text-gray-700">
            Selecciona tus asientos
          </h3>
          <SeatTable idEvento={id_evento} />
        </div>
      </div>
    </div>
  );
}
