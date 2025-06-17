export default function Input({ className = "", ...props }) {
    return (
        <input
            className={`w-full border border-blue-700 px-3 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    );
}
