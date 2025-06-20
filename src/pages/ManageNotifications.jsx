import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/ui/TopBar"; 
import { apiFetch } from "../services/api";

export default function ManageNotifications() {
  const [notificaciones, setNotificaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    apiFetch("/api/notificaciones", {
      headers: { "x-token": token }
    })
      .then((res) => setNotificaciones(res))
      .catch((err) => console.error("Error cargando notificaciones:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-blue-800">
      <TopBar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">🔔 Notificaciones</h1>
        <p className="text-sm text-gray-600 mb-6">
          Aquí puedes ver las notificaciones recientes de tus eventos.
        </p>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Evento</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Mensaje</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {notificaciones.map((n, i) => (
                <tr key={i} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4">{n.nombre_evento || "Sin nombre"}</td>
                  <td className="px-6 py-4">{n.mensaje}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/event-details/${n.id_evento}`)}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Ir a ver
                    </button>
                  </td>
                </tr>
              ))}
              {notificaciones.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500 py-6">
                    No tienes notificaciones por ahora.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}