import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/ui/TopBar';
import ListCardEvent from '../components/ui/ListCardEvent';
import FiltersSelect from '../components/ui/FiltersSelect';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Search } from 'lucide-react';

export default function Events() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filtro, setFiltro] = useState('Título');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  // Obtener eventos al montar el componente
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/eventos');
        const eventsData = await res.json();

        let favoriteIds = [];
        const token = localStorage.getItem("token");

        if (token) {
          const id_usuario = JSON.parse(atob(token.split('.')[1])).uid;
          const favRes = await fetch(`http://localhost:3000/api/eventos/favoritos/${id_usuario}`);
          const favData = await favRes.json();
          favoriteIds = favData.eventosFavoritos || [];
        }

        const formatted = eventsData.map(evt => ({
          id: evt.id_evento,
          title: evt.titulo,
          artist: evt.artista || '',
          category: evt.categoria || '',
          image: evt.banner_base64 || 'https://via.placeholder.com/250x250?text=Sin+imagen',
          isFavorite: favoriteIds.includes(evt.id_evento)
        }));

        setAllEvents(formatted);
      } catch (err) {
        console.error('Error al obtener eventos:', err);
      }
    };

    fetchEvents();
  }, []);

  // Filtrar eventos en tiempo real
  useEffect(() => {
    const query = search.trim().toLowerCase();

    if (query === "") {
      setFilteredEvents([]);
      return;
    }

    let result = [];

    if (filtro === 'Título') {
      result = allEvents.filter(e => e.title.toLowerCase().includes(query));
    } else if (filtro === 'Artista') {
      result = allEvents.filter(e => e.artist.toLowerCase().includes(query));
    } else if (filtro === 'Categoría') {
      result = allEvents.filter(e => e.category.toLowerCase().includes(query));
    }

    setFilteredEvents(result);
  }, [search, filtro, allEvents]);

  const eventsToRender = filteredEvents.length > 0 ? filteredEvents : allEvents;

  return (
    <div className="bg-white min-h-screen text-black w-full">
      <TopBar />

      <div className="w-full px-8 py-6">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Explora Eventos
        </h2>

        {/* Buscador */}
        <div className="w-full max-w-lg mx-auto mt-4">
        <form
    onSubmit={handleSearchClick}
    className="relative flex items-center"
    role="search"
  >
    <input
      type="text"
      placeholder="Buscar evento..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-12 pr-4 py-3 rounded-full border border-blue-300 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 bg-white text-gray-900 shadow transition placeholder-gray-400 text-base sm:text-lg"
      aria-label="Buscar"
    />
    <span className="absolute left-4 text-blue-600">
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </span>
    <button
      type="submit"
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-full shadow transition text-sm sm:text-base"
    >
      Buscar
    </button>
  </form>
</div>

        {/* Grid de eventos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 place-items-center mt-6">
          {eventsToRender.map((event, idx) => (
            <ListCardEvent
              key={idx}
              id_evento={event.id}
              image={event.image}
              title={event.title}
              isFavorite={event.isFavorite}
            />
          ))}
        </div>

        {/* Botón de regreso */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate('/search-event')}
            className="px-6 py-2 bg-[#6C63FF] hover:bg-[#574fd1] text-white font-semibold rounded-lg shadow-md transition"
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
}
