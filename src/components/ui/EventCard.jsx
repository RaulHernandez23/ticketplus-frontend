export default function EventCard({ image = "/images/event-placeholder.jpg" }) {
  return (
    <div className="relative">
      <img
        src={image}
        alt="Evento"
        className="w-full h-48 object-cover rounded-xl"
      />
      <div className="absolute bottom-4 right-4">
        <button className="bg-blue-600 text-white px-4 py-1 text-sm rounded hover:bg-blue-700">
          Ver más
        </button>
      </div>
    </div>
  );
}