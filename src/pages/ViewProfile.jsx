import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/ui/TopBar";
import PrimaryButton from "../components/ui/PrimaryButton";
import { apiFetch } from "../services/api";

export default function ViewProfile() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [pais, setPais] = useState(null);


    useEffect(() => {
        document.title = "TicketPlus - Mi perfil";

        const storedUser = localStorage.getItem("usuario");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUsuario(parsedUser);

            if (parsedUser.id_pais) {
                fetchCountry(parsedUser.id_pais);
            }
        }
    }, []);

    const fetchCountry = async (id) => {
        try {
            const data = await apiFetch(`/api/paises/${id}`);
            setPais(data.pais);
        } catch (error) {
            console.error("Error al obtener país:", error);
            setPais("—");
        }
    };

    if (!usuario) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Cargando datos del usuario...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <TopBar />

            <div className="flex flex-1">
                {/* Imagen lateral */}
                <div className="w-2/5 hidden md:block">
                    <img
                        src="/fondo-registro.jpg"
                        alt="Concierto"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Datos del usuario */}
                <div className="w-full md:w-3/5 px-6 sm:px-10 py-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6">
                        Mi perfil
                    </h1>

                    <div className="space-y-4 text-gray-800">
                        <p><strong>Nombre:</strong> {usuario.nombre}</p>
                        <p><strong>Apellido paterno:</strong> {usuario.apellido_paterno}</p>
                        <p><strong>Apellido materno:</strong> {usuario.apellido_materno || "—"}</p>
                        <p><strong>Correo electrónico:</strong> {usuario.correo}</p>
                        <p><strong>Código postal:</strong> {usuario.codigo_postal}</p>
                        <p><strong>País:</strong> {pais}</p>
                    </div>

                    <div className="mt-8">
                        <PrimaryButton onClick={() => navigate("/editar-perfil")}>
                            Editar perfil
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
