import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "../../components/ui/TopBar";
import { useState, useEffect } from "react";
import { getAllQuestions } from "./HelpData";

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita tildes
}

export default function HelpSearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  // Obtener el query de búsqueda desde la URL (?q=...)
  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";

  // Buscar preguntas que coincidan
  const [results, setResults] = useState([]);

  useEffect(() => {
    const allQuestions = getAllQuestions();
    const nq = normalize(q);
    const filtered = allQuestions.filter(
      (item) =>
        normalize(item.question).includes(nq) ||
        (item.answer && normalize(item.answer).includes(nq))
    );
    setResults(filtered);
  }, [q]);

  return (
    <div className="min-h-screen w-full bg-white">
      <TopBar />
      <div className="max-w-6xl mx-auto mt-10 px-4">
        {/* Breadcrumb */}
        <div className="text-xs text-[#2D3FBD] underline mb-2 font-bold">
          <span className="cursor-pointer" onClick={() => navigate("/ayuda")}>
            Centro de ayuda
          </span>
          {" > "}
          Resultados de búsqueda
        </div>
        {/* Título principal */}
        <h1 className="text-5xl font-bold text-[#2D3FBD] mb-2 mt-2 leading-tight">
          Resultados para: <span className="text-black">{q}</span>
        </h1>
      </div>
      {/* Línea divisoria */}
      <div className="w-full border-b-2 border-black mb-10 mt-4" />

      {/* Resultados */}
      <div className="max-w-4xl mx-auto px-4">
        {results.length === 0 ? (
          <div className="text-lg text-black">
            No se encontraron resultados.
          </div>
        ) : (
          <ul className="space-y-6">
            {results.map((item) => (
              <li
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 px-6 py-4 transition hover:shadow-md"
                style={{ boxShadow: "0 2px 8px 0 rgba(44,62,80,0.04)" }}
              >
                <button
                  className="text-[#2D3FBD] text-lg font-semibold underline hover:text-blue-900 transition-colors p-0 bg-transparent border-none shadow-none outline-none"
                  style={{ background: "none" }}
                  onClick={() =>
                    navigate(`/ayuda/${item.category.key}/${item.id}`)
                  }
                >
                  {item.question}
                </button>
                <div className="text-xs text-gray-500 mt-1">
                  {item.category.label} &gt; {item.section.title}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Espacio al final */}
      <div className="h-12" />
    </div>
  );
}
