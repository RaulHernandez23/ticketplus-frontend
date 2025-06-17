import { useState, useEffect, useRef } from "react";
import RequiredLabel from "./RequiredLabel";
import { apiFetch } from "../../services/api";

export default function CountrySelect({ value, onChange }) {
    const [countries, setCountries] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await apiFetch("/api/paises/");
                setCountries(data);
            } catch (error) {
                console.error("Error al cargar países:", error);
            }
        };

        fetchCountries();
    }, []);

    const selected = countries.find((c) => c.codigo_iso_2 === value);

    const handleBlur = (e) => {
        if (!dropdownRef.current?.contains(e.relatedTarget)) {
            setShowDropdown(false);
            setHighlightedIndex(-1);
        }
    };

    const handleKeyDown = (e) => {
        if (!showDropdown) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev < countries.length - 1 ? prev + 1 : 0
            );
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : countries.length - 1
            );
        }

        if (e.key === "Enter") {
            e.preventDefault();
            const country = countries[highlightedIndex];
            if (country) {
                onChange(country.codigo_iso_2);
                setShowDropdown(false);
                setHighlightedIndex(-1);
            }
        }

        if (e.key === "Escape") {
            e.preventDefault();
            setShowDropdown(false);
            setHighlightedIndex(-1);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <RequiredLabel htmlFor="country">País</RequiredLabel>

            <button
                type="button"
                onClick={() => {
                    setShowDropdown(!showDropdown);
                    setHighlightedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className="w-full flex items-center justify-between border border-blue-700 px-3 py-2 rounded-md text-gray-900 bg-white font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {selected ? (
                    <div className="flex items-center gap-2">
                        <img
                            src={selected.bandera_base64}
                            alt={`Bandera de ${selected.pais}`}
                            className="w-5 h-4 object-cover rounded-sm"
                        />
                        <span className="text-gray-900 font-normal">{selected.pais}</span>
                    </div>
                ) : (
                    <span className="text-gray-400 font-normal">
                        Seleccione un país
                    </span>
                )}
                <span className="text-sm text-gray-500">▼</span>
            </button>

            {showDropdown && (
                <ul
                    tabIndex={0}
                    onMouseLeave={() => {
                        setShowDropdown(false);
                        setHighlightedIndex(-1);
                    }}
                    className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto shadow"
                >
                    {countries.map((c, index) => (
                        <li
                            key={c.codigo_iso_2}
                            onClick={() => {
                                onChange(c.codigo_iso_2);
                                setShowDropdown(false);
                                setHighlightedIndex(-1);
                            }}
                            className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-blue-100 text-gray-900 font-normal ${index === highlightedIndex ? "bg-blue-100" : ""
                                }`}
                        >
                            <img
                                src={c.bandera_base64}
                                alt=""
                                className="w-5 h-4 object-cover rounded-sm"
                            />
                            <span>{c.pais}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
