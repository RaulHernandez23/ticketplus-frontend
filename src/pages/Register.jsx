import { useState } from "react";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import Button from "../components/ui/Button";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
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
        // Aquí va la lógica para registrar
        console.log("Datos:", formData);
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Lado izquierdo: Imagen */}
            <div className="w-1/2 hidden md:block">
                <img
                    src="/fondo-registro.jpg" // Asegúrate de tener esta imagen en public/
                    alt="Concierto"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Lado derecho: Formulario */}
            <div className="w-full md:w-1/2 flex flex-col px-10 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-blue-700">Registrar cuenta</h1>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Apellido</Label>
                            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="country">País</Label>
                            <Input id="country" name="country" value={formData.country} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="postalCode">Código Postal</Label>
                            <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                    </div>

                    <div>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="flex gap-4 mt-6">
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-32">
                            Registrar
                        </Button>
                        <Button type="button" className="border border-black text-black w-32 bg-white">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
