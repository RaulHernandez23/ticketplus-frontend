import { useState } from "react";
import TopBar from "../components/ui/TopBar";
import Input from "../components/ui/Input";
import { apiFetch } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPaymentMethod() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const tipo_metodo = "tarjeta";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    numero_tarjeta: "",
    titular_tarjeta: "",
    vencimiento_mes: "",
    vencimiento_ano: "",
    alias: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!usuario?.id_usuario) {
    return (
      <div>
        <TopBar />
        <div className="max-w-xl mx-auto mt-20 text-center text-red-600">
          Debes iniciar sesión para registrar un método de pago.
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validación básica
    if (
      !form.numero_tarjeta.match(/^\d{16}$/) ||
      !form.titular_tarjeta ||
      !form.vencimiento_mes.match(/^\d{2}$/) ||
      !form.vencimiento_ano.match(/^\d{4}$/)
    ) {
      setError("Por favor, completa todos los campos correctamente.");
      return;
    }

    const ultimos_cuatro = form.numero_tarjeta.slice(-4);

    setLoading(true);
    try {
      await apiFetch("/api/boletos/metodos-pago/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-token": localStorage.getItem("token") },
        body: JSON.stringify({
            alias: form.alias,
            tipo_metodo,
            datos: {
                numero_tarjeta: form.numero_tarjeta,
                titular_tarjeta: form.titular_tarjeta,
                vencimiento_mes: form.vencimiento_mes,
                vencimiento_ano: form.vencimiento_ano,
                ultimos_cuatro,
            },
            id_usuario: usuario.id_usuario,
        }),
      });
      setSuccess(true);
      setTimeout(() => navigate("/search-event"), 1500);
    } catch (err) {
      setError("No se pudo registrar la tarjeta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8ff]">
      <TopBar />
      <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Registrar Método de Pago
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            name="numero_tarjeta"
            placeholder="Número de tarjeta (16 dígitos)"
            maxLength={16}
            value={form.numero_tarjeta}
            onChange={handleChange}
            required
            type="text"
            pattern="\d{16}"
          />
          <Input
            name="titular_tarjeta"
            placeholder="Titular de la tarjeta"
            value={form.titular_tarjeta}
            onChange={handleChange}
            required
            type="text"
          />
          <Input
            name="alias"
            placeholder="Alias (ej. Mi tarjeta Banamex)"
            value={form.alias}
            onChange={handleChange}
            type="text"
          />
          <div className="flex gap-4">
            <Input
              name="vencimiento_mes"
              placeholder="Mes (MM)"
              maxLength={2}
              value={form.vencimiento_mes}
              onChange={handleChange}
              required
              type="text"
              pattern="\d{2}"
            />
            <Input
              name="vencimiento_ano"
              placeholder="Año (YYYY)"
              maxLength={4}
              value={form.vencimiento_ano}
              onChange={handleChange}
              required
              type="text"
              pattern="\d{4}"
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && (
            <div className="text-green-600 text-sm">
              Tarjeta registrada correctamente. Redirigiendo...
            </div>
          )}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-bold text-lg shadow transition ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#2D3FBD] text-white hover:bg-blue-900"
            }`}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar Tarjeta"}
          </button>
        </form>
      </div>
    </div>
  );
}