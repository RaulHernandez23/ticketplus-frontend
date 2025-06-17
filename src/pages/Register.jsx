import { useState } from "react";
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

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del formulario:", formData);
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
                                onChange={(codigo_iso_2) =>
                                    setFormData((prev) => ({ ...prev, country: codigo_iso_2 }))
                                }
                            />
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
