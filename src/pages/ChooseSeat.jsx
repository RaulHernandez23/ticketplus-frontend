import TopBar from "../components/ui/TopBar";
import SeatMap from "../components/ui/SeatMap";
import { useParams } from "react-router-dom";

export default function ChooseSeat() {
  // Supón que recibes el id_funcion por la URL, por ejemplo: /elegir-asiento/:id_funcion
  const { id_funcion } = useParams();

  return (
    <div className="min-h-screen bg-[#f8f8ff]">
      <TopBar />
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2D3FBD] text-center mb-10">
          Escoge tus Entradas
        </h1>
        <div className="flex flex-col md:flex-row gap-12 w-full justify-center items-start">
          <div className="flex-1 flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[340px]">
              <SeatMap id_funcion={id_funcion} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}