import { UserCircle } from "lucide-react";

export default function TopBar() {
  const buttons = [
    { label: "Eventos", icon: "/icons/evento.svg" },
    { label: "Artistas", icon: "/icons/artista.svg" },
    { label: "Soporte", icon: "/icons/deporte.svg" },
  ];

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#2D3FBD] text-white">
      <h1 className="text-lg font-bold">TicketPlus</h1>
      <nav className="flex items-center space-x-8">
        {buttons.map(({ label, icon }) => (
          <div key={label} className="flex flex-col items-center hover:opacity-80 transition">
            <img src={icon} alt={label} className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </div>
        ))}
        <div className="w-10 h-10 bg-white text-blue-800 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition">
          <UserCircle size={28} />
        </div>
      </nav>
    </header>
  );
}
