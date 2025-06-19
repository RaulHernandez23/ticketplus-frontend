import { useParams, useNavigate } from "react-router-dom";
import { helpCategories } from "./helpData";
import TopBar from "../../components/ui/TopBar";

export default function HelpQuestion() {
  const { categoryKey, questionId } = useParams();
  const navigate = useNavigate();

  const category = helpCategories.find((cat) => cat.key === categoryKey);
  const question =
    category &&
    category.sections
      .flatMap((sec) => sec.questions)
      .find((q) => q.id === questionId);

  if (!category || !question) {
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
          <span
            className="cursor-pointer"
            onClick={() => navigate(`/ayuda/${category.key}`)}
          >
            {category.label}
          </span>
          {" > "}
          {question.question}
        </div>
        {/* Título principal */}
        <h1 className="text-5xl font-bold text-[#2D3FBD] mb-2 mt-2 leading-tight">
          {category.label}
        </h1>
      </div>
      {/* Línea divisoria */}
      <div className="w-full border-b-2 border-black mb-10 mt-4" />

      {/* Pregunta y respuesta */}
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#222] mb-6 mt-2 leading-tight">
          {question.question}
        </h2>
        <div className="text-lg text-black whitespace-pre-line">
          {question.answer}
        </div>
      </div>
      {/* Espacio al final */}
      <div className="h-12" />
    </div>
  );
}
