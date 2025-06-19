import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import RequiredLabel from "../components/ui/RequiredLabel";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import { apiFetch } from "../services/api";

export default function PasswordRecover() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "TicketPlus - Recuperar contraseña";
    }, []);

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) setErrors({});
    };

    const handleBlur = () => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = "El correo es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Formato de correo inválido.";
        }
        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = "El correo es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Formato de correo inválido.";
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setLoading(true);
                const res = await apiFetch("/api/auth/recuperar-contrasena", {
                    method: "POST",
                    body: JSON.stringify({ correo: email }),
                });
                localStorage.setItem("correo_recuperacion", email);
                navigate("/validate-token");
            } catch (error) {
                let msg = "No se pudo procesar la solicitud.";
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
                        Recuperar contraseña
                    </h1>
                    <p className="text-sm text-gray-900 mb-6">
                        Se enviará un código de recuperación a tu correo electrónico registrado.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5 text-left">
                        <div>
                            <RequiredLabel htmlFor="email">Correo electrónico</RequiredLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Ingresa tu correo"
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>

                        <div className="flex flex-col items-center gap-4 mt-4">
                            <PrimaryButton type="submit" className="w-full whitespace-nowrap" disabled={loading}>
                                {loading ? "Enviando..." : "Enviar código"}
                            </PrimaryButton>
                            <SecondaryButton type="button" className="w-full scale-90" onClick={handleCancel}>
                                Cancelar
                            </SecondaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
