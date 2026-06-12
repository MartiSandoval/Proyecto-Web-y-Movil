// Validación de inputs (EP 2.6a) — independiente del cliente, protege contra
// datos malformados o maliciosos sin importar el origen de la solicitud.

// RUT chileno: 7-8 dígitos, guión, dígito verificador (0-9 o k/K). Sin puntos.
function validarRut(rut) {
  return /^\d{7,8}-[\dkK]$/.test(rut);
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Mínimo 6 caracteres (Supabase Auth también impone este límite por defecto)
function validarPassword(password) {
  return typeof password === "string" && password.length >= 6;
}

function validarDireccion(direccion) {
  return typeof direccion === "string" && direccion.trim().length >= 5;
}

function validarTelefono(telefono) {
  if (!telefono) return true; // Pasa la validación si está vacío (opcional)
  return /^[0-9+ ]{8,}$/.test(telefono);
}

module.exports = { 
  validarRut, 
  validarEmail, 
  validarPassword, 
  validarDireccion, 
  validarTelefono 
};
