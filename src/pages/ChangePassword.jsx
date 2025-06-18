import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import RequiredLabel from "../components/ui/RequiredLabel";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { apiFetch } from "../services/api";

export default function ChangePassword() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "TicketPlus - Cambiar contraseña";
    }, []);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.password || formData.password.length < 8) {
            newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden.";
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const id_usuario = localStorage.getItem("id_recuperacion");
            const token = localStorage.getItem("token");

            if (!id_usuario || !token) {
                alert("Sesión de recuperación no válida. Intenta nuevamente.");
                return navigate("/recuperar-contrasena");
            }

            try {
                setLoading(true);
                await apiFetch("/api/auth/cambiar-contrasena", {
                    method: "POST",
                    body: JSON.stringify({
                        id_usuario: id_usuario,
                        codigo: token,
                        nueva_contrasena: formData.password,
                        confirmar_contrasena: formData.confirmPassword,
                    }),
                });

                localStorage.removeItem("id_recuperacion");
                localStorage.removeItem("token");

                alert("Contraseña actualizada con éxito.");
                navigate("/iniciar-sesion");
            } catch (error) {
                let msg = "No se pudo actualizar la contraseña.";
                try {
                    const parsed = JSON.parse(error.message.replace(/^Error \d+:\s*/, ""));
                    if (parsed.mensaje) msg = parsed.mensaje;
                } catch { }
                alert(msg);
            } finally {
                setLoading(false);
            }
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
                        Cambiar contraseña
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5 text-left">
                        <div>
                            <RequiredLabel htmlFor="password">Nueva contraseña</RequiredLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Nueva contraseña"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <RequiredLabel htmlFor="confirmPassword">Confirmar contraseña</RequiredLabel>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirma la nueva contraseña"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <div className="flex flex-col items-center gap-4 mt-4">
                            <PrimaryButton
                                type="submit"
                                className="w-full whitespace-nowrap min-w-[200px]"
                                disabled={loading}
                            >
                                {loading ? "Actualizando..." : "Actualizar contraseña"}
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
