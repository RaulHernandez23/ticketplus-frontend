export default function SecondaryButton({ children, className = "", ...props }) {
    return (
        <button
            className={`border border-black text-black bg-white w-full sm:w-32 py-2 px-4 rounded font-semibold transition hover:bg-gray-100 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
