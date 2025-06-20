import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, HeartOff } from 'lucide-react';

export default function ListCardEvent({ image, title, id_evento, isFavorite }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFavorite) setLiked(true);
  }, [isFavorite]);

  const handleUserAction = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      alert("Debes iniciar sesión para realizar esta acción");
      navigate("/iniciar-sesion");
      return false;
    }
  };

  const toggleHeart = async () => {
    if (!handleUserAction()) return;

    const token = localStorage.getItem("token");
    const id_usuario = JSON.parse(atob(token.split('.')[1])).uid;

    try {
      if (!liked) {
        await fetch("http://localhost:3000/api/eventos/favorito", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id_evento, id_usuario })
        });
        alert("Se ha agregado a favoritos correctamente");
      } else {
        await fetch("http://localhost:3000/api/eventos/favorito", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id_evento, id_usuario })
        });
        alert("Se ha eliminado de favoritos");
      }

      setLiked(!liked);
    } catch (error) {
      console.error("Error al actualizar favorito:", error);
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden w-96 m-4 border hover:shadow-lg transition duration-300">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      
      <button
        className="absolute top-3 right-3 text-red-500 text-xl"
        onClick={toggleHeart}
      >
        {liked ? <Heart fill="red" /> : <HeartOff />}
      </button>

      <div className="p-4 flex flex-col items-center">
        <h3 className="text-xl font-semibold text-center">{title}</h3>

        <button
          onClick={() => navigate(`/event-details/${id_evento}`)}
          className="mt-4 px-4 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition"
        >
          Ver más
        </button>
      </div>
    </div>
  );
}
