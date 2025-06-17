export default function Button({ children, className = "", ...props }) {
    return (
        <button
            className={`py-2 px-4 rounded font-semibold transition duration-200 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
