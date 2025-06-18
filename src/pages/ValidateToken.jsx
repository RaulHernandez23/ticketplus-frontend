import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import RequiredLabel from "../components/ui/RequiredLabel";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { apiFetch } from "../services/api";

export default function ValidateToken() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "TicketPlus - Verificar código";
    }, []);

    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setToken(e.target.value.toUpperCase()); // para que siempre sea mayúscula
        if (error) setError("");
    };

    const handleBlur = () => {
        if (!token.trim()) {
            setError("El código es obligatorio.");
        } else if (!/^[A-Z0-9]{6}$/.test(token)) {
            setError("El código debe tener 6 caracteres alfanuméricos.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token.trim()) {
            setError("El código es obligatorio.");
            return;
        }
        if (!/^[A-Z0-9]{6}$/.test(token)) {
            setError("El código debe tener 6 caracteres alfanuméricos.");
            return;
        }

        try {
            setLoading(true);

            const res = await apiFetch("/api/auth/verificar-codigo", {
                method: "POST",
                body: JSON.stringify({ codigo: token, correo: localStorage.getItem("correo_recuperacion") }),
            });

            console.log("Respuesta del backend:", res);

            // Asumiendo que el backend te responde con un usuario o con el correo
            localStorage.removeItem("correo_recuperacion");
            localStorage.setItem("id_recuperacion", res.id_usuario);
            localStorage.setItem("token", token);

            navigate("/cambiar-contrasena");
        } catch (error) {
            let msg = "No se pudo verificar el código.";
            try {
                const parsed = JSON.parse(error.message.replace(/^Error \d+:\s*/, ""));
                if (parsed.mensaje) msg = parsed.mensaje;
            } catch { }
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/iniciar-sesion");
    };

    return (
        <div className="relative w-screen h-screen">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/fondo-login.png')" }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60" />
            <div className="relative z-10 flex items-center justify-center w-full h-full">
                <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-md text-center">
                    <h1 className="text-2xl font-bold text-blue-700 mb-6">
                        Verificar código
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5 text-left">
                        <div>
                            <RequiredLabel htmlFor="token">Código de verificación</RequiredLabel>
                            <Input
                                id="token"
                                name="token"
                                placeholder="Ej: ABC123"
                                value={token}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>

                        <div className="flex flex-col items-center gap-4 mt-4">
                            <PrimaryButton
                                type="submit"
                                className="w-full whitespace-nowrap"
                                disabled={loading}
                            >
                                {loading ? "Verificando..." : "Verificar"}
                            </PrimaryButton>
                            <SecondaryButton
                                type="button"
                                className="w-full scale-90"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </SecondaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
