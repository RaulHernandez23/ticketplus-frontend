// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";
import SearchEvent from "./pages/SearchEvent";
import PasswordRecover from "./pages/PasswordRecover";
import ValidateToken from "./pages/ValidateToken";
import ChangePassword from "./pages/ChangePassword";
import ViewProfile from "./pages/ViewProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registro" element={<Register />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/editar-perfil" element={<EditProfile />} />
        <Route path="/search-event" element={<SearchEvent />} />
        <Route path="/recuperar-contrasena" element={<PasswordRecover />} />
        <Route path="/validate-token" element={<ValidateToken />} />
        <Route path="/cambiar-contrasena" element={<ChangePassword />} />
        <Route path="/mi-perfil" element={<ViewProfile />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<div>404 - Página no encontrada</div>} />

      </Routes>
    </Router>
  );
}

export default App;
