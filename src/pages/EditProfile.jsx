import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import { useAuthValidation } from "../hooks/useAuthValidation";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import CountrySelect from "../components/ui/CountrySelect";
import TopBar from "../components/ui/TopBar";

export default function EditProfile() {
    const navigate = useNavigate();
    const authStatus = useAuthValidation();
    const [formData, setFormData] = useState(null);
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        if (authStatus === "no-token" || authStatus === "invalid") {
            localStorage.clear();
            navigate("/iniciar-sesion");
        } else if (authStatus === "valid") {
            const usuario = JSON.parse(localStorage.getItem("usuario"));
            setFormData({
                name: usuario.nombre,
                lastNameFather: usuario.apellido_paterno,
                lastNameMother: usuario.apellido_materno || "",
                country: usuario.id_pais,
                postalCode: usuario.codigo_postal,
                email: usuario.correo,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        }
    }, [authStatus, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };
            if (
                (name === "newPassword" || name === "confirmPassword") &&
                updated.newPassword !== updated.confirmPassword
            ) {
                setPasswordError("Las nuevas contraseñas no coinciden.");
            } else {
                setPasswordError("");
            }
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!token || !usuario) return;

        const changingPassword =
            formData.currentPassword || formData.newPassword || formData.confirmPassword;

        if (changingPassword && (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword)) {
            setPasswordError("Debes completar todos los campos de contraseña.");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setPasswordError("Las nuevas contraseñas no coinciden.");
            return;
        }

        const payload = {
            id_usuario: usuario.id_usuario,
            nombre: formData.name,
            apellido_paterno: formData.lastNameFather,
            apellido_materno: formData.lastNameMother || "",
            correo: formData.email,
            codigo_postal: formData.postalCode,
            id_pais: formData.country,
        };

        if (changingPassword) {
            payload.contraseña_actual = formData.currentPassword;
            payload.nueva_contraseña = formData.newPassword;
            payload.confirmar_contraseña = formData.confirmPassword;
        }

        try {
            await apiFetch("/api/usuarios/actualizar-perfil", {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: {
                    "x-token": token,
                    "Content-Type": "application/json",
                },
            });

            const usuarioActualizado = await apiFetch(`/api/usuarios/recuperar-perfil/${usuario.id_usuario}`, {
                method: "GET",
                headers: {
                    "x-token": token,
                },
            });

            localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
            alert("Perfil actualizado correctamente.");
            navigate("/mi-perfil");
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            alert("No se pudo actualizar el perfil.");
        }
    };

    const handleCancel = () => {
        navigate("/mi-perfil");
    };

    if (!formData) {
        return <p className="text-center py-20">Cargando datos del usuario...</p>;
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

                {/* Formulario */}
                <div className="w-full md:w-3/5 px-6 sm:px-10 py-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">
                        Editar perfil
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Nombre y Apellido paterno */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Nombre</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Nombre"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastNameFather">Apellido paterno</Label>
                                <Input
                                    id="lastNameFather"
                                    name="lastNameFather"
                                    placeholder="Apellido paterno"
                                    value={formData.lastNameFather}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Apellido materno */}
                        <div className="w-full sm:w-1/2">
                            <Label htmlFor="lastNameMother">Apellido materno</Label>
                            <Input
                                id="lastNameMother"
                                name="lastNameMother"
                                placeholder="Apellido materno"
                                value={formData.lastNameMother}
                                onChange={handleChange}
                            />
                        </div>

                        {/* País y Código Postal */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <CountrySelect
                                    value={formData.country}
                                    onChange={(id_pais) =>
                                        setFormData((prev) => ({ ...prev, country: id_pais }))
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="postalCode">Código Postal</Label>
                                <Input
                                    id="postalCode"
                                    name="postalCode"
                                    placeholder="Código Postal"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Correo electrónico */}
                        <div>
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Correo"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Contraseñas */}
                        <div>
                            <Label htmlFor="currentPassword">Contraseña actual:</Label>
                            <Input
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                placeholder="Contraseña actual"
                                autoComplete="new-password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="newPassword">Nueva contraseña:</Label>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                placeholder="Nueva contraseña"
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword">Confirmar nueva contraseña:</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirmar nueva contraseña"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {passwordError && (
                                <p className="text-sm text-red-600 mt-1">{passwordError}</p>
                            )}
                        </div>

                        {/* Botones */}
                        <div className="flex gap-4 mt-6">
                            <PrimaryButton type="submit">Guardar cambios</PrimaryButton>
                            <SecondaryButton type="button" onClick={handleCancel}>
                                Cancelar
                            </SecondaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
