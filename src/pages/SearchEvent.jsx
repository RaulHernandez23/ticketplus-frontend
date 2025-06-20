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
    <div className="min-h-screen w-full bg-gray-900 text-white p-4">
      <div className="max-w-screen-2xl mx-auto bg-white min-h-screen rounded-md overflow-hidden text-black">
        <TopBar />

        {/* Carrusel */}
        <div className="mt-4 px-6">
          <Carousel />
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