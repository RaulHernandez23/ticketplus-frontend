export default function Label({ htmlFor, children }) {
    return (
        <label htmlFor={htmlFor} className="block mb-1 font-medium text-gray-800">
            {children}
        </label>
    );
}
