import { useEffect } from "react";
import TopBar from "../components/ui/TopBar";
import Carousel from "../components/ui/Carousel";
import EventCard from "../components/ui/EventCard";
import { useAuthValidation } from "../hooks/useAuthValidation";

export default function SearchEvent() {
  const authStatus = useAuthValidation();

  useEffect(() => {
    if (authStatus === "no-token" || authStatus === "invalid") {
      localStorage.clear();
    }
  }, [authStatus]);

  return (
    <div className="min-h-screen w-full bg-[#f8f8ff] flex flex-col">
      <TopBar />
      <div className="max-w-screen-2xl mx-auto bg-white min-h-screen rounded-md overflow-hidden text-black">

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

        {/* Carrusel con props de filtrado */}
        <div className="mt-10">
          <Carousel search={search} filtro={filtro} />
        </div>

        {/* Recomendaciones */}
        <div className="mt-12 px-6">
          <h2 className="text-xl font-bold mb-4 text-center">Recomendaciones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => (
              <EventCard key={offset} offset={offset} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}