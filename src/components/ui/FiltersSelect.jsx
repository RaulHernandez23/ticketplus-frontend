export default function FiltersSelect({ value, onChange }) {
  const options = ['Título', 'Artista', 'Categoría'];

  return (
    <div className="w-60">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 px-3 py-2 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}