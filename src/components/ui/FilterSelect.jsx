import { useState, useEffect } from "react";
import { apiFetch } from "../../services/api"; // asegúrate de tener esta función

export default function SelectFiltro({ value, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await apiFetch("/api/categorias");
        const opciones = data.map((cat) => ({
          value: cat.id_categoria,
          label: cat.categoria,
        }));
        setOptions(opciones);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <div className="w-60">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 px-3 py-2 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Categorias</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}