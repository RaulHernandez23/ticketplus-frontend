import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";

export default function Sidebar({ isOpen, onClose }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await apiFetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "x-token": token,
                },
            });

            localStorage.clear();
            navigate("/search-event");
            window.location.reload();
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            alert("No se pudo cerrar sesión.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop que detecta clics fuera */}
            <div
                className="absolute inset-0 bg-black bg-opacity-30"
                onClick={onClose}
            />

            {/* Panel lateral */}
            <div
                className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="font-bold text-blue-700 text-xl">Mi cuenta</h2>
                    <button
                        onClick={onClose}
                        className="p-0 m-0 bg-transparent border-none text-blue-600 text-2xl hover:scale-125 transition"
                        style={{ lineHeight: 1 }}
                    >
                        ☰
                    </button>
                </div>

                <div className="p-4 text-[1.05rem] text-blue-700">
                    <section className="mb-6">
                        <h3 className="text-base font-semibold text-gray-600 mb-3">
                            Mis boletos
                        </h3>
                        <ul className="space-y-1">
                            <li>
                                <button
                                    className="w-full text-left bg-transparent border-none px-0 py-0.5 text-sm font-normal text-blue-700 hover:underline rounded"
                                    style={{ fontFamily: "inherit" }}
                                    onClick={() => {
                                        // Por ahora no navega a ningún lado
                                    }}
                                >
                                    🎟️ Ver boletos
                                </button>
                            </li>
                            <li>
                                <button
                                    className="w-full text-left bg-transparent border-none px-0 py-0.5 text-sm font-normal text-blue-700 hover:underline rounded"
                                    style={{ fontFamily: "inherit" }}
                                    onClick={() => {
                                        navigate("/transferir-boleto");
                                        onClose();
                                    }}
                                >
                                    🔁 Transferencias
                                </button>
                            </li>
                            <li>
                                <button
                                    className="w-full text-left bg-transparent border-none px-0 py-0.5 text-sm font-normal text-blue-700 hover:underline rounded"
                                    style={{ fontFamily: "inherit" }}
                                    onClick={() => {
                                        navigate("/solicitar-reembolso");
                                        onClose();
                                    }}
                                >
                                    💸 Reembolsos
                                </button>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h3 className="text-base font-semibold text-gray-600 mb-3">
                            Mi cuenta
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/mi-perfil"
                                    className="block text-sm font-normal text-blue-700 hover:underline rounded"
                                    style={{ fontFamily: "inherit" }}
                                >
                                    👤 Datos de la cuenta
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block text-sm font-normal text-blue-700 hover:underline rounded"
                                    style={{ fontFamily: "inherit" }}
                                >
                                    💳 Métodos de pago
                                </a>
                            </li>
                        </ul>
                    </section>

                    <button
                        onClick={handleLogout}
                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded text-base font-semibold hover:bg-blue-700 transition"
                        style={{ fontFamily: "inherit" }}
                    >
                        🔒 Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}