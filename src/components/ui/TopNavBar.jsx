import { Link } from "react-router-dom";

export default function TopNavbar() {
    return (
        <header className="bg-blue-700 text-white flex justify-between items-center px-6 py-3">
            <h2 className="text-lg font-bold">TicketPlus</h2>

            <nav className="flex items-center gap-6 text-sm font-medium">
                <Link to="/eventos" className="hover:underline text-white">
                    Eventos
                </Link>
                <Link to="/artistas" className="hover:underline text-white">
                    Artistas
                </Link>
                <Link to="/soporte" className="hover:underline text-white">
                    Soporte
                </Link>
                <Link
                    to="/perfil"
                    className="w-8 h-8 bg-white text-blue-700 rounded-full flex items-center justify-center font-bold"
                >
                    👤
                </Link>
            </nav>
        </header>
    );
}
