import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import RequiredLabel from "../components/ui/RequiredLabel";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Link } from "react-router-dom";
import { apiFetch } from "../services/api";

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "TicketPlus - Iniciar sesión";
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const newErrors = { ...errors };

        if (name === "email") {
            if (!value.trim()) {
                newErrors.email = "El correo es obligatorio.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                newErrors.email = "Formato de correo inválido.";
            } else {
                delete newErrors.email;
            }
        } else if (name === "password") {
            if (!value.trim()) {
                newErrors.password = "La contraseña es obligatoria.";
            } else {
                delete newErrors.password;
            }
        }

        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "El correo es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Formato de correo inválido.";
        }
        if (!formData.password.trim()) {
            newErrors.password = "La contraseña es obligatoria.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                setLoading(true);
                const res = await apiFetch("/api/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        correo: formData.email,
                        contraseña: formData.password,
                    }),
                });

                localStorage.setItem("token", res.token);
                localStorage.setItem("usuario", JSON.stringify(res.usuario));

                navigate("/search-event");
            } catch (error) {
                let msg = "No se pudo iniciar sesión.";
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

    return (
        <div className="relative w-screen h-screen">
            {/* Fondo con imagen */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/fondo-login.png')" }}
            />

            {/* Capa oscura */}
            <div className="absolute inset-0 bg-black bg-opacity-60" />

            {/* Contenedor del formulario */}
            <div className="relative z-10 flex items-center justify-center w-full h-full">
                <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-md text-center">
                    <h1 className="text-3xl font-bold text-blue-700 mb-6">Iniciar sesión</h1>

                    <form onSubmit={handleSubmit} className="space-y-5 text-left">
                        <div>
                            <RequiredLabel htmlFor="email">Correo</RequiredLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Ingresa tu correo"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div>
                            <RequiredLabel htmlFor="password">Contraseña</RequiredLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div className="text-right text-sm">
                            <Link to="/recuperar-contrasena" className="text-blue-700 hover:underline font-medium">
                                Olvidé mi contraseña
                            </Link>
                        </div>

                        <div className="flex justify-center mt-4">
                            <PrimaryButton type="submit" className="w-40" disabled={loading}>
                                {loading ? "Ingresando..." : "Iniciar sesión"}
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mt-4 text-sm text-center text-gray-900">
                        ¿No tienes cuenta?{" "}
                        <Link to="/registro" className="text-blue-700 hover:underline font-medium">
                            Crear cuenta
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
