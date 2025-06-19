export default function SeatTable() {
  const seats = [
    { type: "VIP+", availability: 5000, price: "$4,500 MXN" },
    { type: "VIP", availability: 1500, price: "$2,800 MXN" },
    { type: "Estándar", availability: 5000, price: "$1,200 MXN" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-blue-500">
      <table className="min-w-full text-sm text-center bg-blue-100">
        <thead className="bg-blue-300 text-blue-900 font-semibold">
          <tr>
            <th className="p-2">Tipo de Asiento</th>
            <th className="p-2">Disponibilidad</th>
            <th className="p-2">Precios</th>
          </tr>
        </thead>
        <tbody>
          {seats.map((seat, index) => (
            <tr key={index} className="border-t border-blue-200">
              <td className="p-2">{seat.type}</td>
              <td className="p-2">{seat.availability}</td>
              <td className="p-2">{seat.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

