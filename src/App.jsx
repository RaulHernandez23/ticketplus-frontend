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
import SelectTicketForRefund from "./pages/refundRequest/SelectTicketForRefund";
import RefundForm from "./pages/refundRequest/RefundForm";
import RefundSuccess from "./pages/refundRequest/RefundSuccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registro" element={<Register />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/editar-perfil" element={<EditProfile />} />
        <Route path="/search-event" element={<SearchEvent />} />
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
        <Route
          path="/solicitar-reembolso"
          element={<SelectTicketForRefund />}
        />
        <Route path="/solicitar-reembolso/:id" element={<RefundForm />} />
        <Route path="/solicitar-reembolso/exito" element={<RefundSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
