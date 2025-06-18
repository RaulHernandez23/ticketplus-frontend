export default function CircleButton({ imageSrc, alt = "", onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 ${className}`}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={alt} className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
      ) : (
        <span className="text-sm">{alt}</span>
      )}
    </button>
  );
}