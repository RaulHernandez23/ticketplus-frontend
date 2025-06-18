import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Carousel({ search = "", filtro = "" }) {
  const [eventos, setEventos] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/eventos?limit=100") 
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch(console.error);
  }, []);

  const filtrados = eventos.filter((e) => {
    const texto = e.titulo.toLowerCase();
    const cumpleSearch = search ? texto.includes(search.toLowerCase()) : true;
    const cumpleFiltro = filtro ? e.id_categoria === parseInt(filtro) : true;
    return cumpleSearch && cumpleFiltro;
  });

  const visible = filtrados.slice(0, 5);
  const hasItems = visible.length > 0;
  const current = hasItems ? visible[index % visible.length] : null;

  useEffect(() => {
    setIndex(0);
  }, [search, filtro, eventos]);

  useEffect(() => {
    if (!hasItems) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % visible.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [visible]);

  if (!hasItems) return <p className="text-center mt-6">No se encontraron eventos.</p>;

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="w-full h-[500px] md:h-[600px] relative rounded-xl overflow-hidden shadow-lg">
        <img
          src={current.banner_base64}
          alt={`Banner de ${current.titulo}`}
          className="w-full h-full object-cover"
        />
        <Link
          to={`/evento/${current.id_evento}`}
          className="absolute bottom-4 right-6 bg-black bg-opacity-40 text-white px-4 py-2 rounded hover:underline text-sm"
        >
          Ir al evento
        </Link>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {visible.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => setIndex(i)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
}