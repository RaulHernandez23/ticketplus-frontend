export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            type="checkbox"
            className={`form-checkbox h-4 w-4 text-blue-600 ${className}`}
            {...props}
        />
    );
}
