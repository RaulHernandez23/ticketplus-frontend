import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "../components/ui/TopBar";
import TicketSummary from "../components/ui/TicketSummary";
import PaymentMethods from "../components/ui/PaymentMethods";
import TermsAndConditions from "../components/ui/TermsAndConditions";
import { apiFetch } from "../services/api";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { asientos, zona } = location.state || {};
  const asiento = asientos?.[0];
  const id_funcion = asiento?.id_funcion;
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!asiento || !zona) {
    navigate("/choose-seat/" + id_funcion);
    return null;
  }

  const handleBuy = async () => {
    setLoading(true);
    try {
      await apiFetch("/api/boletos/registrar-venta", {
        headers: {
          "Content-Type": "application/json",
          "x-token": `${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: JSON.stringify({
          id_funcion,
          id_zona: asiento.id_zona,
          id_asiento: asiento.id_asiento,
          id_metodo_pago: selectedPayment,
        }),
      });
      setShowSuccess(true);
    } catch (err) {
      alert("Error al realizar la compra");
    } finally {
      setLoading(false);
    }
  };

  // Modal de éxito
  const SuccessModal = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
      onClick={() => navigate("/search-event")}
      style={{ cursor: "pointer" }}
    >
      <div className="bg-[#2D3FBD] rounded-2xl shadow-xl px-12 py-10 flex flex-col items-center justify-center max-w-md w-full">
        <div className="flex flex-col items-center">
          <svg width="90" height="90" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#fff" />
            <path d="M7 13l3 3 7-7" stroke="#2D3FBD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 className="text-2xl font-bold text-white mt-4 mb-2 text-center">
            Compra Realizada<br />Exitosamente
          </h2>
          <p className="text-white text-lg text-center mt-2">
            Da clic en la pantalla para salir
          </p>
        </div>
      </div>
    </div>
  );

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
          {loading ? "Procesando..." : "Enviar Orden"}
        </button>
      </div>
      {showSuccess && <SuccessModal />}
    </div>
  );
}