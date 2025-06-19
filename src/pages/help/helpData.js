export const helpCategories = [
  {
    key: "cuenta",
    label: "Mi cuenta",
    icon: "/icons/account.svg",
    sections: [
      {
        title: "Registro y acceso",
        questions: [
          {
            id: "registrar-cuenta",
            question: "¿Cómo me registro en TicketPlus?",
            answer: `Para registrarte:
1. Haz clic en “Registrarse” en la ventana de inicio de sesión.
2. Completa el formulario con tu nombre, apellidos, país, código postal, correo electrónico y contraseña.
3. Asegúrate de que todos los campos estén completos y la contraseña coincida en ambos campos.
4. Haz clic en “Registrarse”. Si el registro es exitoso, serás redirigido a la página de inicio de sesión y verás el mensaje “Registro exitoso”.`,
          },
          {
            id: "iniciar-sesion",
            question: "¿Cómo inicio sesión?",
            answer: `Para iniciar sesión:
1. Haz clic en “Iniciar sesión” en la página principal.
2. Ingresa tu correo electrónico y contraseña registrados.
3. Haz clic en “Iniciar sesión”. Si los datos son correctos, accederás a tu cuenta.`,
          },
          {
            id: "cerrar-sesion",
            question: "¿Cómo cierro mi sesión?",
            answer: `Haz clic en el botón “Cerrar sesión” en el menú de usuario. Esto eliminará tu token de sesión y te redirigirá a la página principal.`,
          },
          {
            id: "recuperar-contrasena",
            question: "¿Olvidé mi contraseña, cómo la recupero?",
            answer: `1. Haz clic en “¿Olvidaste tu contraseña?” en la página de inicio de sesión.
2. Ingresa tu correo electrónico y haz clic en “Enviar enlace de recuperación”.
3. Revisa tu correo y sigue el enlace para restablecer tu contraseña.`,
          },
        ],
      },
      {
        title: "Gestión de perfil",
        questions: [
          {
            id: "editar-perfil",
            question: "¿Cómo edito mis datos personales?",
            answer: `Accede a la sección “Perfil” y haz clic en “Editar”. Puedes modificar tu nombre, apellidos, país y código postal. El correo electrónico solo puede ser modificado por soporte.`,
          },
          {
            id: "cambiar-contrasena",
            question: "¿Cómo cambio mi contraseña?",
            answer: `En la sección “Editar perfil”, ingresa tu contraseña actual, la nueva contraseña y su confirmación. Haz clic en “Guardar cambios”.`,
          },
        ],
      },
      {
        title: "Seguridad y privacidad",
        questions: [
          {
            id: "seguridad-cuenta",
            question: "¿Cómo protege TicketPlus mi información?",
            answer: `TicketPlus utiliza conexiones seguras (SSL) y nunca almacena tu contraseña en texto plano. Si detectas actividad sospechosa, cambia tu contraseña y contacta a soporte.`,
          },
          {
            id: "privacidad",
            question: "¿Cómo se usan mis datos personales?",
            answer: `Tus datos personales se utilizan únicamente para gestionar tu cuenta, tus compras y brindarte soporte. Consulta nuestro aviso de privacidad para más detalles.`,
          },
        ],
      },
    ],
  },
  {
    key: "boletos",
    label: "Mis boletos",
    icon: "/icons/ticket.svg",
    sections: [
      {
        title: "Gestión de boletos",
        questions: [
          {
            id: "ver-boletos",
            question: "¿Dónde puedo ver mis boletos?",
            answer: `Tus boletos están disponibles en la sección “Mis boletos” después de iniciar sesión. Ahí puedes ver el código QR y los detalles del evento.`,
          },
          {
            id: "boleto-perdido",
            question: "¿Qué hago si pierdo el acceso a mi boleto?",
            answer: `Puedes volver a descargar tu boleto desde la sección “Mis boletos” en cualquier momento.`,
          },
          {
            id: "enviar-boleto",
            question: "¿Cómo recibo mi boleto por correo electrónico?",
            answer: `En la pantalla de detalle de tu compra, haz clic en “Enviar boleto”. Confirma tu correo y recibirás el boleto digital y el desglose de compra en tu bandeja de entrada.`,
          },
        ],
      },
      {
        title: "Transferencia de boletos",
        questions: [
          {
            id: "transferir-boletos",
            question: "¿Cómo transfiero un boleto a otra persona?",
            answer: `1. Ve a “Transferencias” en el menú principal.
2. Selecciona los boletos que deseas transferir y haz clic en “Continuar”.
3. Ingresa el nombre, apellidos y correo electrónico del receptor (debe tener cuenta en TicketPlus).
4. Revisa el resumen y haz clic en “Enviar”.
5. El receptor recibirá los boletos en su cuenta.`,
          },
        ],
      },
    ],
  },
  {
    key: "devoluciones",
    label: "Devoluciones",
    icon: "/icons/refund.svg",
    sections: [
      {
        title: "Solicitudes de devolución",
        questions: [
          {
            id: "solicitar-reembolso",
            question: "¿Cómo solicito un reembolso?",
            answer: `1. Ve a la sección “Devoluciones” en el menú principal.
2. Selecciona el boleto que deseas devolver.
3. Elige el motivo de la solicitud y, si lo deseas, agrega un comentario.
4. Haz clic en “Confirmar”. Recibirás una notificación por correo con el estado de tu solicitud.`,
          },
          {
            id: "motivos-reembolso",
            question: "¿En qué casos puedo pedir un reembolso?",
            answer: `Puedes solicitar un reembolso si el evento fue cancelado, pospuesto o si hubo un problema técnico en la compra.`,
          },
          {
            id: "estado-reembolso",
            question: "¿Cómo consulto el estado de mi reembolso?",
            answer: `Puedes consultar el estado de tu solicitud en la sección “Devoluciones” o revisando tu correo electrónico.`,
          },
        ],
      },
    ],
  },
  {
    key: "compra",
    label: "Compra de boletos",
    icon: "/icons/cart.svg",
    sections: [
      {
        title: "Explorar y comprar eventos",
        questions: [
          {
            id: "buscar-eventos",
            question: "¿Cómo busco eventos disponibles?",
            answer: `Utiliza la barra de búsqueda en la página principal para encontrar eventos por nombre, artista o ciudad. Puedes agregar filtros por fecha, ubicación o categoría.`,
          },
          {
            id: "ver-detalle-evento",
            question: "¿Cómo veo los detalles de un evento?",
            answer: `Haz clic en el evento de tu interés para ver la descripción, ubicación, fecha, precios y disponibilidad de asientos.`,
          },
          {
            id: "marcar-favorito",
            question: "¿Cómo marco un evento como favorito?",
            answer: `Haz clic en el ícono de corazón en la tarjeta del evento. Puedes ver tus eventos favoritos en la sección correspondiente de tu cuenta.`,
          },
        ],
      },
      {
        title: "Compra y pagos",
        questions: [
          {
            id: "seleccionar-asiento",
            question: "¿Cómo selecciono mis asientos?",
            answer: `Al comprar boletos, selecciona la sección, fila y asientos disponibles en el mapa interactivo del evento.`,
          },
          {
            id: "comprar-boletos",
            question: "¿Cómo compro boletos?",
            answer: `Selecciona el evento, elige tus asientos, revisa el resumen de compra y selecciona el método de pago. Acepta los términos y condiciones y haz clic en “Enviar Orden”.`,
          },
          {
            id: "formas-pago",
            question: "¿Qué formas de pago aceptan?",
            answer: `Puedes pagar con tarjeta de crédito, débito y otros métodos electrónicos disponibles en la plataforma.`,
          },
          {
            id: "problemas-pago",
            question: "¿Por qué recibí un mensaje de error al pagar?",
            answer: `Puede deberse a datos incorrectos, fondos insuficientes o problemas con tu banco. Verifica tus datos y si el problema persiste, contacta a soporte.`,
          },
        ],
      },
      {
        title: "Historial y soporte",
        questions: [
          {
            id: "historial-compras",
            question: "¿Dónde veo mi historial de compras?",
            answer: `En la sección “Historial de compras” puedes consultar todos los boletos adquiridos, ver detalles y descargar tus boletos digitales.`,
          },
          {
            id: "contacto-soporte",
            question: "¿Cómo contacto al soporte de TicketPlus?",
            answer: `Puedes contactarnos desde la sección “Soporte” o por correo a soporte@ticketplus.com.`,
          },
        ],
      },
    ],
  },
];

export function getAllQuestions() {
  return helpCategories.flatMap((cat) =>
    cat.sections.flatMap((sec) =>
      sec.questions.map((q) => ({
        ...q,
        category: cat,
        section: sec,
      }))
    )
  );
}
