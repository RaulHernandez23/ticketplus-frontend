import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImTicket } from "react-icons/im";
import { FaQuestion, FaUser } from "react-icons/fa";
import Sidebar from "./Sidebar";

export default function TopBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Solo muestra "Eventos" si hay token
  const buttons = [
    ...(token
      ? [{ label: "Eventos", icon: <ImTicket size={20} color="#2D3FBD" />, route: "/events" }]
      : []),
    { label: "Soporte", icon: <FaQuestion size={20} color="#2D3FBD" /> },
  ];

  const handleUserClick = () => {
    setSidebarOpen(true);
  };

  const handleLogoClick = () => {
    navigate("/search-event");
  };

  const handleSupportClick = () => {
    navigate("/ayuda");
  };

  const handleLoginClick = () => {
    navigate("/iniciar-sesion");
  };

  return (
    <>
      <header className="flex flex-wrap justify-between items-center px-2 sm:px-4 md:px-6 py-3 bg-[#2D3FBD] text-white w-full">
        <img
          src="/TicketPlus_Logotipo.png"
          alt="TicketPlus Logo"
          className="h-10 sm:h-12 cursor-pointer"
          onClick={handleLogoClick}
        />
        <nav className="flex items-center">
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12 mr-0 md:mr-10">
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
                <span className="relative flex items-center justify-center w-8 h-8">
                  <span className="absolute w-8 h-8 rounded-full bg-white"></span>
                  <span className="relative z-10 flex items-center justify-center">
                    {icon}
                  </span>
                </span>
                <span className="text-xs mt-1 font-bold text-white">
                  {label}
                </span>
              </div>
            ))}
          </div>
          {/* Botón de perfil o iniciar sesión */}
          {token ? (
            <button
              className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-transparent ml-2"
              onClick={handleUserClick}
              type="button"
              aria-label="Abrir menú de usuario"
            >
              <span className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white"></span>
              <span className="relative z-10 flex items-center justify-center">
                <FaUser size={24} color="#2D3FBD" className="sm:w-7 sm:h-7" />
              </span>
            </button>
          ) : (
            <button
              className="ml-4 px-5 py-2 rounded-full bg-white text-[#2D3FBD] font-bold shadow hover:bg-blue-100 transition text-sm sm:text-base"
              onClick={handleLoginClick}
              type="button"
            >
              Iniciar sesión
            </button>
          )}
        </nav>
      </header>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}