import { useParams, useNavigate } from "react-router-dom";
import { helpCategories } from "./helpData";
import { useState } from "react";
import TopBar from "../../components/ui/TopBar";

export default function HelpCategory() {
  const { categoryKey } = useParams();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);

  const category = helpCategories.find((cat) => cat.key === categoryKey);

  if (!category) {
    return (
      <div className="p-8 text-center text-red-600">
        No se pudo cargar la información de ayuda. Verifica tu conexión a
        internet e inténtalo de nuevo más tarde.
      </div>
    );
  }

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
          {category.label}
        </div>
        {/* Título principal */}
        <h1 className="text-5xl font-bold text-[#2D3FBD] mb-2 mt-2 leading-tight">
          {category.label}
        </h1>
      </div>
      {/* Línea divisoria */}
      <div className="w-full border-b-2 border-black mb-10 mt-4" />

      {/* Secciones de ayuda */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white border border-[#222] overflow-hidden">
          {category.sections.map((section, idx) => (
            <div
              key={section.title}
              className="border-b border-[#222] last:border-b-0"
            >
              <button
                className="w-full text-left px-6 py-5 font-bold text-xl flex justify-between items-center focus:outline-none"
                style={{
                  background: openSection === idx ? "#fff" : "#fff",
                  borderBottom:
                    openSection === idx
                      ? "2px solid #19c2c2"
                      : "1px solid #222",
                  color: "#222",
                  transition: "background 0.2s, border-bottom 0.2s",
                  borderRadius: 0,
                }}
                onClick={() => setOpenSection(openSection === idx ? null : idx)}
              >
                {section.title}
                <span className="text-2xl" style={{ color: "#111" }}>
                  {openSection === idx ? "▲" : "▼"}
                </span>
              </button>
              {openSection === idx && (
                <ul className="px-8 py-4 space-y-2 bg-white">
                  {section.questions.map((q) => (
                    <li key={q.id}>
                      <button
                        type="button"
                        className="underline text-base font-semibold hover:text-[#2D3FBD] text-left"
                        style={{
                          color: "#111",
                          background: "none",
                          border: "none",
                          padding: 0,
                          margin: 0,
                          cursor: "pointer",
                          boxShadow: "none",
                        }}
                        onClick={() =>
                          navigate(`/ayuda/${category.key}/${q.id}`)
                        }
                      >
                        {q.question}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Espacio al final */}
      <div className="h-12" />
    </div>
  );
}
