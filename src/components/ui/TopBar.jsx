import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImTicket } from "react-icons/im";
import { GiMicrophone } from "react-icons/gi";
import { FaQuestion, FaUser } from "react-icons/fa";
import Sidebar from "./Sidebar";

export default function TopBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const buttons = [
    { label: "Eventos", icon: <ImTicket size={20} color="#2D3FBD" />, route: "/events" },
    { label: "Artistas", icon: <GiMicrophone size={20} color="#2D3FBD" /> },
    { label: "Soporte", icon: <FaQuestion size={20} color="#2D3FBD" /> },
  ];

  const handleUserClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setSidebarOpen(true);
    } else {
      navigate("/iniciar-sesion");
    }
  };

  const handleLogoClick = () => {
    navigate("/search-event");
  };

  const handleSupportClick = () => {
    navigate("/ayuda");
  };

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 bg-[#2D3FBD] text-white">
        {/* Logo con navegación */}
        <h1
          className="text-lg font-bold cursor-pointer select-none"
          onClick={handleLogoClick}
          title="Ir al menú principal"
        >
          TicketPlus
        </h1>
        <nav className="flex items-center">
          <div className="flex items-center space-x-12 mr-20">
            {buttons.map(({ label, icon }) => (
              <div
                key={label}
                className="flex flex-col items-center hover:opacity-80 transition cursor-pointer"
                onClick={
                  label === "Soporte"
                    ? handleSupportClick
                    : label === "Eventos"
                    ? () => navigate("/events")
                    : undefined
                }
                title={label}
              >
                <span className="relative flex items-center justify-center w-9 h-9">
                  <span className="absolute w-9 h-9 rounded-full bg-white"></span>
                  <span className="relative z-10 flex items-center justify-center">
                    {icon}
                  </span>
                </span>
                <span className="text-sm mt-1 font-bold text-white">
                  {label}
                </span>
              </div>
            ))}
          </div>
          {/* Botón de perfil con lógica de login/sidebar */}
          <button
            className="relative flex items-center justify-center w-12 h-12 bg-transparent"
            onClick={handleUserClick}
            type="button"
            aria-label="Abrir menú de usuario"
          >
            <span className="absolute w-12 h-12 rounded-full bg-white"></span>
            <span className="relative z-10 flex items-center justify-center">
              <FaUser size={28} color="#2D3FBD" />
            </span>
          </button>
        </nav>
      </header>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
