import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "../components/ui/TopBar";
import StarRating from "../components/ui/StarRating";
import ReviewTextarea from "../components/ui/ReviewTextarea";

export default function EventReview() {
  const { id_evento } = useParams();
  const navigate = useNavigate();

  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(1);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState(false);
  const [yaValorado, setYaValorado] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventoRes = await fetch(
          `http://localhost:3000/api/eventos/${id_evento}`
        );
        const eventoData = await eventoRes.json();
        setEvento(eventoData);

        const token = localStorage.getItem("token");
        if (token) {
          const id_usuario = JSON.parse(atob(token.split(".")[1])).uid;

          const valRes = await fetch(
            `http://localhost:3000/api/eventos/valoracion/${id_evento}/${id_usuario}`
          );
          const valData = await valRes.json();
          setYaValorado(valData.valorado);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id_evento]);

  const handleSubmit = () => {
    if (!review.trim()) {
      setError(true);
      return;
    }

    setError(false);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para valorar.");
      navigate("/iniciar-sesion");
      return;
    }

    const id_usuario = JSON.parse(atob(token.split(".")[1])).uid;

    fetch("http://localhost:3000/api/eventos/valoracion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_evento,
        id_usuario,
        calificacion: rating,
        comentario: review,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("¡Gracias por tu valoración!");
          navigate("/search-event");
        } else {
          alert("Error al enviar valoración.");
        }
      })
      .catch((err) => {
        console.error("Error al enviar valoración:", err);
        alert("Error de red.");
      });
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!evento) return <p className="text-center mt-10">Evento no encontrado</p>;

  const { titulo, banner_base64, fecha_funcion, recinto } = evento;

  return (
    <div className="bg-white min-h-screen text-black">
      <TopBar />

      <div className="w-full max-w-6xl mx-auto px-10 py-10">
        <h2 className="text-5xl font-bold text-center text-blue-800 mb-10">
          Valorar Evento
        </h2>

        <div className="flex flex-col lg:flex-row gap-16 items-center justify-center">
          {/* Info del evento */}
          <div className="w-full max-w-sm text-center">
            <img
              src={banner_base64}
              alt={`Banner de ${titulo}`}
              className="w-full rounded-xl shadow-md object-cover h-72"
            />
            <h3 className="text-3xl font-bold text-blue-800 mt-6">{titulo}</h3>

            <div className="mt-4 text-base text-gray-800 space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span>📍</span>
                <span>
                  {recinto?.nombre}, {recinto?.ciudad}
                </span>
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

          {/* Valoración */}
          <div className="w-full max-w-2xl">
            {yaValorado ? (
              <div className="text-center text-xl font-medium text-green-700 mt-4">
                ✅ Usted ya valoró este evento. ¡Gracias por su participación!
              </div>
            ) : (
              <>
                <h4 className="text-2xl font-bold text-blue-800 mb-4">
                  Calificación
                </h4>

                <StarRating
                  rating={rating}
                  setRating={setRating}
                  hovered={hovered}
                  setHovered={setHovered}
                />

                <ReviewTextarea
                  review={review}
                  setReview={(value) => {
                    setReview(value);
                    if (value.trim()) setError(false);
                  }}
                  error={error}
                />

                {error && (
                  <p className="text-red-600 text-sm mt-2">
                    Por favor, escribe tu reseña antes de enviar.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row justify-between gap-6 mt-10">
                  <button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto py-3 px-8 bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold rounded-lg shadow-md transition"
                  >
                    Enviar Valoración
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
