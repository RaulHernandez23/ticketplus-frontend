export default function TermsAndConditions({ accepted, onChange }) {
  return (
    <div className="bg-gray-200 rounded-xl shadow-lg p-6 min-w-[320px] max-w-md flex flex-col">
      <h2 className="font-bold text-lg text-black text-center mb-4">Términos y Condiciones</h2>
      <p className="text-sm text-black mb-6 text-justify">
        Por favor presta atención a los términos y condiciones que se encuentran debajo. Debes leer y ACEPTAR estos términos antes de completar tu compra de boleto(s). Tu compra está sujeta a la autorización de la tarjeta de crédito o débito físico o digital y verificación de datos de tu Banco. No existen cambios, reembolsos ni cancelaciones. La orden de compra de boletos no deberá de exceder el límite de boletos permitido. La compra de boletos a través de TicketPlus generará un cargo por servicio y un cargo por entrega de boletos.
        <br /><br />
        Tu compra está sujeta a la autorización de la tarjeta de crédito o débito físico o digital y verificación de datos de tu Banco. No existen cambios, reembolsos ni cancelaciones. La orden de compra de boletos no deberá de exceder el límite de boletos permitido. La compra de boletos a través de TicketPlus generará un cargo por servicio y un cargo por entrega de boletos.
      </p>
      <label className="flex items-center gap-2 mt-auto">
        <input
          type="checkbox"
          checked={accepted}
          onChange={e => onChange(e.target.checked)}
        />
        <span className="text-black">Aceptar Términos y Condiciones</span>
      </label>
    </div>
  );
}