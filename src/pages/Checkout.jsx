import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import TopBar from "../components/ui/TopBar";
import TicketSummary from "../components/ui/TicketSummary";
import PaymentMethods from "../components/ui/PaymentMethods";
import TermsAndConditions from "../components/ui/TermsAndConditions";
import { apiFetch } from "../services/api";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  // Recibe los datos desde ChooseSeat
  const { asientos, zona } = location.state || {};
  const asiento = asientos?.[0];
  const id_funcion = asiento?.id_funcion;
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // Si no hay datos, regresar
  if (!asiento || !zona) {
    navigate("/choose-seat/" + id_funcion);
    return null;
  }

  const handleBuy = async () => {
    setLoading(true);
    try {
      await apiFetch("/api/boletos/registrar-venta", {
        method: "POST",
        body: JSON.stringify({
          id_funcion,
          id_zona: asiento.id_zona,
          id_asiento: asiento.id_asiento,
          id_metodo_pago: selectedPayment,
        }),
      });
      // Redirige a éxito o resumen
      navigate("/compra-exitosa");
    } catch (err) {
      alert("Error al realizar la compra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8ff]">
      <TopBar />
      <h1 className="text-4xl font-bold text-[#2D3FBD] text-center mt-8 mb-10">
        Comprar Entradas
      </h1>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start max-w-6xl mx-auto">
        <TicketSummary asiento={asiento} zona={zona} id_funcion={id_funcion} />
        <PaymentMethods
          selected={selectedPayment}
          onSelect={setSelectedPayment}
        />
        <TermsAndConditions
          accepted={acceptedTerms}
          onChange={setAcceptedTerms}
        />
      </div>
      <div className="flex justify-center mt-10">
        <button
          className={`px-10 py-3 rounded-lg font-bold text-lg shadow transition
            ${!selectedPayment || !acceptedTerms || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#2D3FBD] text-white hover:bg-blue-900"}
          `}
          disabled={!selectedPayment || !acceptedTerms || loading}
          onClick={handleBuy}
        >
          {loading ? "Procesando..." : "Confirmar Compra"}
        </button>
      </div>
    </div>
  );
}