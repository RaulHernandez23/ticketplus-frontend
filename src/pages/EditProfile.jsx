import { useState, useEffect } from "react";
import Input from "../components/ui/Input";
import RequiredLabel from "../components/ui/RequiredLabel";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import CountrySelect from "../components/ui/CountrySelect";
import TopNavbar from "../components/ui/TopNavBar";

export default function EditProfile() {
    useEffect(() => {
        document.title = "TicketPlus - Editar perfil";
    }, []);

    const [formData, setFormData] = useState({
        name: "Miguel",
        lastName: "Villa",
        country: 1,
        postalCode: "91155",
        email: "soyunpokemonytunoloeres@gmail.com",
        currentPassword: "",
        newPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
        // Aquí podrías hacer un apiFetch para actualizar
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Barra superior reutilizable */}
            <TopNavbar />

            {/* Contenido principal */}
            <div className="flex flex-1">
                {/* Imagen lateral */}
                <div className="w-1/2 hidden md:block">
                    <img
                        src="/fondo-registro.jpg"
                        alt="Concierto"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Formulario */}
                <div className="w-full md:w-1/2 px-6 sm:px-10 py-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6">
                        Editar datos
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Nombre y Apellido */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <RequiredLabel htmlFor="name">Nombre</RequiredLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <RequiredLabel htmlFor="lastName">Apellido</RequiredLabel>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
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
                                <RequiredLabel htmlFor="postalCode">Código Postal</RequiredLabel>
                                <Input
                                    id="postalCode"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Correo electrónico */}
                        <div>
                            <RequiredLabel htmlFor="email">Correo electrónico</RequiredLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Contraseñas */}
                        <div>
                            <RequiredLabel htmlFor="currentPassword">Contraseña actual:</RequiredLabel>
                            <Input
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <RequiredLabel htmlFor="newPassword">Nueva contraseña:</RequiredLabel>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Botones */}
                        <div className="flex gap-4 mt-6">
                            <PrimaryButton type="submit">Guardar cambios</PrimaryButton>
                            <SecondaryButton type="button">Cancelar</SecondaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
