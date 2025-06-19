import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar"; // asegúrate de importar correctamente

export default function TopNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="bg-blue-700 text-white flex justify-between items-center px-6 py-3">
        <h2 className="text-lg font-bold">TicketPlus</h2>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/eventos" className="hover:underline">
            Eventos
          </Link>
          <Link to="/artistas" className="hover:underline">
            Artistas
          </Link>
          <Link to="/soporte" className="hover:underline">
            Soporte
          </Link>

          <button
            onClick={() => setSidebarOpen(true)}
            className="w-8 h-8 bg-white text-blue-700 rounded-full flex items-center justify-center font-bold"
          >
            👤
          </button>
        </nav>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
