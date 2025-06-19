import { useNavigate } from "react-router-dom";
import { helpCategories } from "./helpData";
import { useState } from "react";
import TopBar from "../../components/ui/TopBar";
import { FaUser } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import { RiRefund2Line } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";

export default function HelpCenter() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanSearch = search.trim().replace(/\s+/g, " ");
    if (cleanSearch) {
      navigate(`/ayuda/buscar?q=${encodeURIComponent(cleanSearch)}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <TopBar />
      <div className="max-w-6xl mx-auto mt-10 px-4">
        {/* Breadcrumb */}
        <div className="text-xs text-[#2D3FBD] underline mb-2 inline-block font-bold">
          Centro de ayuda
        </div>
        {/* Título principal */}
        <h1 className="text-5xl font-bold text-[#2D3FBD] mb-2 mt-2 leading-tight">
          Consulta de ayuda
        </h1>
      </div>
      {/* Línea divisoria */}
      <div className="w-full border-b-2 border-black mb-10 mt-4" />

      {/* Saludo y buscador */}
      <div className="max-w-2xl mx-auto flex flex-col items-center mb-16 mt-8">
        <h2
          className="text-2xl md:text-3xl font-bold text-[#234] text-center mb-3"
          style={{ letterSpacing: "-1px" }}
        >
          Hola, <span className="font-bold">¿Cómo podemos ayudarte?</span>
        </h2>
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar..."
              className="border-2 border-[#234] rounded-[8px] w-full py-2 pl-4 pr-10 font-bold text-black outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ fontSize: "1.15rem" }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#234] hover:text-[#2D3FBD] p-0 m-0 bg-transparent border-none"
              aria-label="Buscar"
              tabIndex={-1}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      {/* Categorías */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpCategories.map((cat) => (
            <button
              key={cat.key}
              className="flex flex-col items-center justify-center bg-[#2D3FBD] hover:bg-[#1d297a] transition rounded-[14px] py-10 w-full"
              onClick={() => navigate(`/ayuda/${cat.key}`)}
              style={{
                minHeight: "170px",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.03)",
              }}
            >
              {cat.key === "cuenta" ? (
                <FaUser className="w-24 h-24 mb-4" color="white" />
              ) : cat.key === "boletos" ? (
                <FaTicket className="w-24 h-24 mb-4" color="white" />
              ) : cat.key === "devoluciones" ? (
                <RiRefund2Line className="w-24 h-24 mb-4" color="white" />
              ) : cat.key === "compra" ? (
                <FaShoppingCart className="w-24 h-24 mb-4" color="white" />
              ) : (
                <img
                  src={cat.icon}
                  alt={cat.label}
                  className="w-24 h-24 mb-4"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              )}
              <span className="text-white font-bold text-lg mt-2">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
        {/* Espacio al final */}
        <div className="h-12" />
      </div>
    </div>
  );
}
