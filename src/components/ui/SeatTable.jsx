import { useEffect, useState } from "react";

export default function SeatTable({ idEvento }) {
  const [zonas, setZonas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idEvento) return;

    fetch(`http://localhost:3000/api/eventos/zonas-precios/${idEvento}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setZonas(data);
        } else {
          setZonas([]); // en caso de error o estructura inesperada
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al obtener zonas y precios:", err);
        setZonas([]);
        setLoading(false);
      });
  }, [idEvento]);

  if (loading) {
    return <p className="text-center my-4">Cargando precios...</p>;
  }

  if (zonas.length === 0) {
    return <p className="text-center my-4 text-gray-500">No hay información de zonas para este evento.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-blue-500 mt-4">
      <table className="min-w-full text-sm text-center bg-blue-100">
        <thead className="bg-blue-300 text-blue-900 font-semibold">
          <tr>
            <th className="p-3">Tipo de Asiento</th>
            <th className="p-3">Precio</th>
          </tr>
        </thead>
        <tbody>
          {zonas.map((zona, index) => (
            <tr key={index} className="border-t border-blue-200">
              <td className="p-3">{zona.tipo || zona.nombre_zona}</td>
              <td className="p-3">{zona.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


