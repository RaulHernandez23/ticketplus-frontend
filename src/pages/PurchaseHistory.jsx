import TopBar from "../components/ui/TopBar";

export default function PurchaseHistory() {
  return (
    <div className="min-h-screen w-full bg-[#f6f8fc]">
      <TopBar />
      <div className="max-w-7xl mx-auto pt-6 px-6">
        {/* Breadcrumb y controles */}
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex items-center gap-1">
            <a href="#" className="text-xs text-[#1d1f70] underline font-bold">
              Boletos
            </a>
            <span className="text-xs text-[#1d1f70]">{">"}</span>
            <span className="text-xs text-[#1d1f70] underline font-bold">
              Historial de Compras
            </span>
          </div>
          <button className="text-[#1d1f70] text-xs underline hover:text-[#3a3ee6] transition w-fit">
            &lt; Volver
          </button>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold text-[#1d1f70]">
              Eventos Asistidos
            </span>
            <div className="relative">
              <input type="checkbox" id="asistidos" className="peer sr-only" />
              <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-[#1d1f70] transition"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 transition"></div>
            </div>
          </div>
        </div>
        {/* Título */}
        <h1 className="text-5xl font-bold text-[#1d1f70] text-center my-6">
          Historial de Compras
        </h1>
        {/* Contenido principal */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Tabla de historial */}
          <div className="flex-1">
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-[#1d1f70] rounded-t-2xl rounded-b-2xl bg-white shadow-lg">
                <thead>
                  <tr>
                    <th className="py-3 px-4 bg-[#1d1f70] text-white font-bold text-center border-b-2 border-[#1d1f70] rounded-tl-2xl">
                      Función
                    </th>
                    <th className="py-3 px-4 bg-[#1d1f70] text-white font-bold text-center border-b-2 border-[#1d1f70]">
                      Sede
                    </th>
                    <th className="py-3 px-4 bg-[#1d1f70] text-white font-bold text-center border-b-2 border-[#1d1f70]">
                      Sección
                    </th>
                    <th className="py-3 px-4 bg-[#1d1f70] text-white font-bold text-center border-b-2 border-[#1d1f70]">
                      Fila
                    </th>
                    <th className="py-3 px-4 bg-[#1d1f70] text-white font-bold text-center border-b-2 border-[#1d1f70] rounded-tr-2xl">
                      Asiento(s)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white text-[#1d1f70] border-b-2 border-[#1d1f70] hover:bg-[#f0f2ff] transition">
                    <td className="py-2 px-4 border-r-2 border-[#1d1f70] font-medium">
                      Pelusa Caligari
                    </td>
                    <td className="py-2 px-4 border-r-2 border-[#1d1f70]">
                      Teatro Nacional
                    </td>
                    <td className="py-2 px-4 border-r-2 border-[#1d1f70]">
                      Orquesta
                    </td>
                    <td className="py-2 px-4 border-r-2 border-[#1d1f70]">B</td>
                    <td className="py-2 px-4">B8</td>
                  </tr>
                  {/* ...más filas */}
                </tbody>
              </table>
            </div>
          </div>
          {/* Panel lateral de resumen */}
          <div className="w-full lg:w-[350px] min-w-[300px] bg-white border-2 border-[#1d1f70] rounded-2xl shadow-lg flex flex-col items-center px-0 py-0">
            {/* Encabezado del panel */}
            <div className="w-full flex rounded-t-2xl overflow-hidden">
              <div className="flex-1 py-2 px-3 bg-[#1d1f70] text-white font-bold text-center border-r-2 border-[#1d1f70]">
                Sección
                <div className="font-normal text-xs mt-1">Preferencial 1</div>
              </div>
              <div className="flex-1 py-2 px-3 bg-[#1d1f70] text-white font-bold text-center border-r-2 border-[#1d1f70]">
                Fila
                <div className="font-normal text-xs mt-1">M</div>
              </div>
              <div className="flex-1 py-2 px-3 bg-[#1d1f70] text-white font-bold text-center rounded-tr-2xl">
                Asiento(s)
                <div className="font-normal text-xs mt-1">M6-M7</div>
              </div>
            </div>
            {/* Contenido del panel */}
            <div className="w-full flex flex-col items-center px-4 py-4">
              <div className="flex w-full items-center gap-4 mb-2">
                <img
                  src="/ruta/imagen.jpg"
                  alt="Evento"
                  className="w-24 h-24 object-cover rounded-lg border border-[#1d1f70]"
                />
                <img
                  src="/ruta/qr.png"
                  alt="QR"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="w-full text-[#1d1f70] font-bold text-base mb-1">
                Pelusa Caligari
              </div>
              <div className="w-full text-xs text-[#1d1f70] mb-1">
                28 de Abril de 2025
              </div>
              <div className="w-full text-xs text-[#1d1f70] mb-2">
                Auditorio Nacional
              </div>
              <div className="w-full text-xs text-[#1d1f70] mb-2">
                Boleto Estándar x2{" "}
                <span className="float-right font-bold">$2050.00 MXN</span>
                <br />
                <span className="text-[10px] text-[#1d1f70]">
                  ($1025.00 MXN c/u)
                </span>
              </div>
              <div className="w-full text-xs text-[#1d1f70] mb-2">
                Cargos{" "}
                <span className="float-right font-bold">$650.00 MXN</span>
                <br />
                <span className="text-[10px] text-[#1d1f70]">
                  ($500.00 MXN Cargo por servicio, $150.00 MXN Cargo por Envío)
                </span>
              </div>
              <div className="w-full text-xs text-[#1d1f70] mb-4 font-bold">
                Cargos Totales <span className="float-right">$2700.00 MXN</span>
              </div>
              <button className="w-11/12 mt-2 py-2 bg-[#1d1f70] text-white font-bold rounded-xl hover:bg-[#3a3ee6] transition">
                Descargar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
