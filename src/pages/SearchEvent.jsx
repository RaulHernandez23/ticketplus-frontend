import { useState } from "react";
import { useEffect } from "react";
import TopBar from "../components/ui/TopBar";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Carousel from "../components/ui/Carousel";
import EventCard from "../components/ui/EventCard";
import SelectFiltro from "../components/ui/FilterSelect";
import { Search } from "lucide-react";
import { useAuthValidation } from "../hooks/useAuthValidation";

export default function SearchEvent() {

  const authStatus = useAuthValidation();

  useEffect(() => {
		if (authStatus === "no-token" || authStatus === "invalid") {
			localStorage.clear();
		}
	}, [authStatus]);

  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("");

  const handleSearchClick = () => {
    console.log("Buscar:", search, filtro);
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-4">
      <div className="max-w-screen-2xl mx-auto bg-white min-h-screen rounded-md overflow-hidden text-black">
        <TopBar />

        {/* Buscador */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-80"
            />
            <Button onClick={handleSearchClick}>
              <Search size={20} />
            </Button>
            <SelectFiltro value={filtro} onChange={setFiltro} />
          </div>
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