import { useState } from "react";
import TopBar from "../../components/ui/TopBar";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import { useNavigate } from "react-router-dom";

export default function ReceiverData() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid =
    nombre.trim() !== "" && apellidos.trim() !== "" && isEmailValid(correo);

  const handleContinue = () => {
    setTouched(true);
    if (!isFormValid) return;
    localStorage.setItem(
      "receiver_transfer_data",
      JSON.stringify({ nombre, apellidos, correo })
    );
    navigate("/transferir-boleto/resumen");
  };

  const handleBack = () => {
    navigate("/transferir-boleto");
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <TopBar />
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <span className="text-xs text-[#2D3FBD] underline mb-2 inline-block font-bold">
          Transferencia de boletos
        </span>
        <h1 className="text-5xl font-bold text-[#2D3FBD] mb-2 mt-2 leading-tight">
          Transferencia de boletos
        </h1>
      </div>
      <div className="w-full border-b-2 border-black mb-10 mt-4" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="border-2 border-black bg-white p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <div className="border border-black p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-black">
                Ingresa los datos del receptor
              </h2>
              <div className="w-full flex flex-col items-center">
                <table className="w-full mb-2">
                  <tbody>
                    <tr>
                      <td className="font-bold text-black w-56 align-middle py-2">
                        Nombre
                      </td>
                      <td>
                        <input
                          type="text"
                          className="border border-black px-3 py-2 w-full text-black mb-3"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          autoComplete="off"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold text-black w-56 align-middle py-2">
                        Apellidos
                      </td>
                      <td>
                        <input
                          type="text"
                          className="border border-black px-3 py-2 w-full text-black mb-3"
                          value={apellidos}
                          onChange={(e) => setApellidos(e.target.value)}
                          autoComplete="off"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold text-black w-56 align-middle py-2">
                        Correo electrónico
                      </td>
                      <td>
                        <input
                          type="email"
                          className="border border-black px-3 py-2 w-full text-black mb-3"
                          value={correo}
                          onChange={(e) => setCorreo(e.target.value)}
                          autoComplete="off"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                {touched && !isFormValid && (
                  <div className="text-red-600 mt-2 w-full text-left">
                    Por favor, completa todos los campos y verifica el correo
                    electrónico.
                  </div>
                )}
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 text-black">
                Términos y condiciones
              </h3>
              <p className="text-black text-base">
                Al transferir boletos en TicketPlus, confirmas que el receptor
                es de tu confianza y que los datos proporcionados son correctos.
                La transferencia es irreversible y el receptor debe tener una
                cuenta activa en TicketPlus. TicketPlus no se hace responsable
                por errores en los datos del receptor o por transferencias a
                usuarios incorrectos. Para más detalles sobre el proceso y las
                políticas de transferencia, consulta nuestra sección de{" "}
                <span
                  className="underline text-[#2D3FBD] cursor-pointer"
                  onClick={() =>
                    window.open("http://localhost:5173/ayuda/cuenta", "_blank")
                  }
                >
                  ayuda
                </span>
                .
              </p>
            </div>
            <div className="flex gap-6 justify-end">
              <SecondaryButton type="button" onClick={handleBack}>
                Atrás
              </SecondaryButton>
              <PrimaryButton
                type="submit"
                className={`w-40 text-lg ${
                  !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isFormValid}
              >
                Continuar
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full h-32 bg-white" />
    </div>
  );
}
