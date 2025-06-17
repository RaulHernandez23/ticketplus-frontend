export default function PrimaryButton({ children, className = "", ...props }) {
    return (
        <button
            className={`bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-32 py-2 px-4 rounded font-semibold transition ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
