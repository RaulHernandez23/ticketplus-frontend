import { RiCheckboxCircleLine } from "react-icons/ri";
import TopBar from "../../components/ui/TopBar";

export default function RefundSuccess() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <TopBar />
      <div className="flex flex-1 flex-col items-center justify-center">
        <RiCheckboxCircleLine size={120} color="#2D3FBD" className="mb-6" />
        <h2 className="text-4xl font-bold text-[#2D3FBD] mb-4 text-center">
          Solicitud enviada con éxito
        </h2>
        <p className="text-xl text-gray-700 text-center">
          Recibirás tu reembolso en un plazo
          <br />
          máximo de 24 hrs
        </p>
      </div>
    </div>
  );
}
