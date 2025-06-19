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
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-80"
            />
            <FiltersSelect value={filtro} onChange={setFiltro} />
          </div>
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
