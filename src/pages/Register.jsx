import { useState } from "react";
import { apiFetch } from "../services/api";
import Input from "../components/ui/Input";
import RequiredLabel from "../components/ui/RequiredLabel";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import CountrySelect from "../components/ui/CountrySelect";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        lastNameFather: "",
        lastNameMother: "",
        country: "",
        postalCode: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validaciones
        if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
        if (!formData.lastNameFather.trim())
            newErrors.lastNameFather = "El apellido paterno es obligatorio.";
        if (!formData.email.trim()) {
            newErrors.email = "El correo es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "El correo no tiene un formato válido.";
        }
        if (!formData.password) {
            newErrors.password = "La contraseña es obligatoria.";
        } else if (formData.password.length < 8) {
            newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Debes confirmar la contraseña.";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden.";
        }
        if (!formData.postalCode.trim())
            newErrors.postalCode = "El código postal es obligatorio.";
        if (!formData.country)
            newErrors.country = "Debes seleccionar un país.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Preparar el body para el backend
            const payload = {
                nombre: formData.name,
                apellido_paterno: formData.lastNameFather,
                apellido_materno: formData.lastNameMother || "",
                correo: formData.email,
                contrasena: formData.password,
                confirmar_contrasena: formData.confirmPassword,
                codigo_postal: formData.postalCode,
                id_pais: formData.country,
            };

            console.log("Payload para registro:", payload);

            try {
                const result = await apiFetch("/api/usuarios/registro", {
                    method: "POST",
                    body: JSON.stringify(payload),
                });

                alert("Registro exitoso.");
                setFormData({
                    name: "",
                    lastNameFather: "",
                    lastNameMother: "",
                    country: "",
                    postalCode: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setErrors({});
            } catch (error) {
                console.error("Error en registro:", error);
                alert("Error al conectar con el servidor.");
            }
        }
    };


    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row">
            {/* Imagen lateral */}
            <div className="w-full md:w-1/2 hidden md:block">
                <img
                    src="/fondo-registro.jpg"
                    alt="Concierto"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Formulario */}
            <div className="w-full md:w-1/2 flex flex-col px-6 sm:px-10 py-10">
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
                        Registrar cuenta
                    </h1>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    Todos los campos marcados con <span className="text-red-500">*</span> son obligatorios
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nombre + Apellido paterno */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <RequiredLabel htmlFor="name">Nombre</RequiredLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Nombre"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div>
                            <RequiredLabel htmlFor="lastNameFather">Apellido paterno</RequiredLabel>
                            <Input
                                id="lastNameFather"
                                name="lastNameFather"
                                placeholder="Apellido paterno"
                                value={formData.lastNameFather}
                                onChange={handleChange}
                            />
                            {errors.lastNameFather && <p className="text-red-500 text-sm">{errors.lastNameFather}</p>}
                        </div>
                    </div>

                    {/* Apellido materno */}
                    <div className="w-full sm:w-1/2">
                        <RequiredLabel htmlFor="lastNameMother" required={false}>
                            Apellido materno
                        </RequiredLabel>
                        <Input
                            id="lastNameMother"
                            name="lastNameMother"
                            placeholder="Apellido materno"
                            value={formData.lastNameMother}
                            onChange={handleChange}
                        />
                    </div>

                    {/* País + Código postal */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <CountrySelect
                                value={formData.country}
                                onChange={(id_pais) =>
                                    setFormData((prev) => ({ ...prev, country: id_pais }))
                                }
                            />
                            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                        </div>
                        <div>
                            <RequiredLabel htmlFor="postalCode">Código Postal</RequiredLabel>
                            <Input
                                id="postalCode"
                                name="postalCode"
                                placeholder="Código Postal"
                                value={formData.postalCode}
                                onChange={handleChange}
                            />
                            {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
                        </div>
                    </div>

                    {/* Correo */}
                    <div>
                        <RequiredLabel htmlFor="email">Correo electrónico</RequiredLabel>
                        <Input
                            id="email"
                            name="email"
                            placeholder="ejemplo@correo.com"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Contraseñas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <RequiredLabel htmlFor="password">Contraseña</RequiredLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <div>
                            <RequiredLabel htmlFor="confirmPassword">Confirmar contraseña</RequiredLabel>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <PrimaryButton type="submit">Registrar</PrimaryButton>
                        <SecondaryButton type="button">Cancelar</SecondaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
