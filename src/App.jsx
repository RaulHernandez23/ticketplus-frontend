// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";
import SearchEvent from "./pages/SearchEvent";
import PasswordRecover from "./pages/PasswordRecover";
import ValidateToken from "./pages/ValidateToken";
import ChangePassword from "./pages/ChangePassword";
import SelectTicketForRefund from "./pages/refundRequest/SelectTicketForRefund";
import RefundForm from "./pages/refundRequest/RefundForm";
import RefundSuccess from "./pages/refundRequest/RefundSuccess";
import SelectTicketsForTransfer from "./pages/TicketTransfer/SelectTicketsForTransfer";
import ReceiverData from "./pages/TicketTransfer/ReceiverData";
import TransferSummary from "./pages/TicketTransfer/TransferSummary";
import TransferSuccess from "./pages/TicketTransfer/TransferSuccess";
import HelpCenter from "./pages/help/HelpCenter";
import HelpCategory from "./pages/help/HelpCategory";
import HelpQuestion from "./pages/help/HelpQuestion";
import HelpSearchResults from "./pages/help/HelpSearchResults";
import EventDetails from "./pages/EventDetails";
import Events from "./pages/Events";
import ViewProfile from "./pages/ViewProfile";
import PurchaseHistory from "./pages/PurchaseHistory";
import EventReview from "./pages/EventReview";
import ChooseSeat from "./pages/ChooseSeat";
import Checkout from "./pages/Checkout";
import RegisterPaymentMethod from "./pages/RegisterPaymentMethod";
import ManageNotifications from "./pages/ManageNotifications";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirección de "/" hacia "/search-events" */}
        <Route path="/" element={<Navigate to="/search-event" replace />} />

        <Route path="/registro" element={<Register />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/editar-perfil" element={<EditProfile />} />
        <Route path="/search-event" element={<SearchEvent />} />
        <Route path="/recuperar-contrasena" element={<PasswordRecover />} />
        <Route path="/validate-token" element={<ValidateToken />} />
        <Route path="/cambiar-contrasena" element={<ChangePassword />} />
        <Route path="/event-details/:id_evento" element={<EventDetails />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event-review/:id_evento" element={<EventReview />} />
        <Route path="/manage-notifications" element={<ManageNotifications />} />
        <Route path="/mi-perfil" element={<ViewProfile />} />
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
        <Route
          path="/solicitar-reembolso"
          element={<SelectTicketForRefund />}
        />
        <Route path="/solicitar-reembolso/:id" element={<RefundForm />} />
        <Route path="/solicitar-reembolso/exito" element={<RefundSuccess />} />
        <Route
          path="/transferir-boleto"
          element={<SelectTicketsForTransfer />}
        />
        <Route
          path="/transferir-boleto/recibir-datos"
          element={<ReceiverData />}
        />
        <Route
          path="/transferir-boleto/resumen"
          element={<TransferSummary />}
        />
        <Route path="/transferir-boleto/exito" element={<TransferSuccess />} />
        <Route path="/ayuda" element={<HelpCenter />} />
        <Route path="/ayuda/buscar" element={<HelpSearchResults />} />
        <Route path="/ayuda/:categoryKey" element={<HelpCategory />} />
        <Route
          path="/ayuda/:categoryKey/:questionId"
          element={<HelpQuestion />}
        />

        <Route path="/choose-seat/:id_funcion" element={<ChooseSeat />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/purchase-history" element={<PurchaseHistory />} />
        <Route path="/payment-methods" element={<RegisterPaymentMethod />} />
        <Route path="/historial-compras" element={<PurchaseHistory />} />
        <Route path="/choose-seat/:id_funcion" element={<ChooseSeat />} />
        <Route path="/checkout/" element={<Checkout />} />
        <Route
          path="/boleto/:id_boleto/descargar-pdf"
          element={<div>Descargando PDF...</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
