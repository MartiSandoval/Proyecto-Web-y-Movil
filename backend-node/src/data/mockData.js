const tramites = [
  {
    id: "1",
    nombre: "Subsidio de Agua Potable",
    descripcion:
      "Solicitud de subsidio para el pago del servicio de agua potable para familias de bajos recursos.",
    costo: "Gratuito",
    departamento: "DIDECO",
    esEnLinea: true,
    documentosRequeridos: [
      "Cédula de identidad",
      "Última cuenta de agua",
      "Certificado de residencia",
    ],
  },
  {
    id: "2",
    nombre: "Inscripción descuento en la compra de gas",
    descripcion:
      "Registro para obtener descuento en la compra de gas de cañería o envasado para hogares vulnerables.",
    costo: "Gratuito",
    departamento: "DIDECO",
    esEnLinea: true,
    documentosRequeridos: [
      "Cédula de identidad",
      "Certificado de residencia",
      "Informe socioeconómico",
    ],
  },
  {
    id: "3",
    nombre: "Subsidio al pago del Derecho de Aseo",
    descripcion:
      "Exención o descuento en el cobro del servicio de recolección de basura domiciliaria.",
    costo: "Gratuito",
    departamento: "Administración Municipal",
    esEnLinea: false,
    documentosRequeridos: [
      "Cédula de identidad",
      "Última contribución o contrato de arriendo",
      "Certificado de residencia",
    ],
  },
  {
    id: "4",
    nombre: "Permiso de Edificación",
    descripcion:
      "Autorización municipal para construir, ampliar o modificar una edificación dentro del territorio comunal.",
    costo: "$50.000",
    departamento: "Dirección de Obras Municipales",
    esEnLinea: false,
    documentosRequeridos: [
      "Planos arquitectónicos",
      "Certificado de dominio vigente",
      "Formulario de solicitud",
      "Informe de ingeniero",
    ],
  },
];

// Genera slots de 08:00 a 16:00 cada 30 minutos
function generarSlots(tramiteId, fecha) {
  const horas = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00",
  ];
  return horas.map((hora) => ({
    hora,
    disponible: Math.random() > 0.3,
  }));
}

module.exports = { tramites, generarSlots };
