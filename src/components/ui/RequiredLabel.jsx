export default function RequiredLabel({ htmlFor, children, required = true }) {
    return (
        <label htmlFor={htmlFor} className="block mb-1 font-medium text-gray-800">
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
}
