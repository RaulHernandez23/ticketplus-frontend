import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, HeartOff } from 'lucide-react';

export default function ListCardEvent({ image, title }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

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

  const toggleHeart = () => {
    if (handleUserAction()) {
      setLiked(!liked);
    }
  };

  const handleValorarClick = () => {
    if (handleUserAction()) {
      alert("Gracias por valorar :)");
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden w-64 m-4 border hover:shadow-lg transition duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <button
        className="absolute top-3 right-3 text-red-500 text-xl"
        onClick={toggleHeart}
      >
        {liked ? <Heart fill="red" /> : <HeartOff />}
      </button>

      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-center">{title}</h3>
        <button
          onClick={handleValorarClick}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Valorar Evento
        </button>
      </div>
    </div>
  );
}

