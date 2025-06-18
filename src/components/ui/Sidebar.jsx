export default function Sidebar({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop que detecta clics fuera */}
            <div
                className="absolute inset-0 bg-black bg-opacity-30"
                onClick={onClose}
            />

            {/* Panel lateral */}
            <div
                className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="font-bold text-blue-700 text-xl">Mi cuenta</h2>
                    <button
                        onClick={onClose}
                        className="p-0 m-0 bg-transparent border-none text-blue-600 text-2xl hover:scale-125 transition"
                        style={{ lineHeight: 1 }}
                    >
                        ☰
                    </button>
                </div>

                <div className="p-4 text-[1.05rem] text-blue-700">
                    <section className="mb-6">
                        <h3 className="text-base font-semibold text-gray-600 mb-3">Mis boletos</h3>
                        <ul className="space-y-2">
                            <li><a href="#">🎟️ Ver boletos</a></li>
                            <li><a href="#">🔁 Transferencias</a></li>
                            <li><a href="#">💸 Reembolsos</a></li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h3 className="text-base font-semibold text-gray-600 mb-3">Mi cuenta</h3>
                        <ul className="space-y-2">
                            <li><a href="#">👤 Datos de la cuenta</a></li>
                            <li><a href="#">💳 Métodos de pago</a></li>
                        </ul>
                    </section>

                    <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded text-base hover:bg-blue-700">
                        🔒 Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}
