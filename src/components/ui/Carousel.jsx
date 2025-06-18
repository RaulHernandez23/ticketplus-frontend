export default function Carousel() {
  return (
    <div className="relative w-full h-[300px]">
      <img
        src="/images/electronic-banner.jpg"
        alt="Electronic"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-4 py-2 rounded shadow w-80"
          />
          <button className="bg-white px-3 py-2 rounded shadow text-sm hover:bg-gray-100">
            Agregar Filtro
          </button>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <span className="w-3 h-3 bg-gray-700 rounded-full" />
        <span className="w-3 h-3 bg-gray-400 rounded-full" />
        <span className="w-3 h-3 bg-gray-400 rounded-full" />
      </div>
    </div>
  );
}