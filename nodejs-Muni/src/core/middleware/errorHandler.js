const { environment } = require("../config/environment");

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";

  if (environment.nodeEnv === "development") {
    console.error(`[ERROR] ${req.method} ${req.path} →`, err);
  }

  const payload = { error: message };
  // Errores de validación adjuntan un detalle por campo (err.errores).
  if (err.errores) {
    payload.errores = err.errores;
  }

  res.status(status).json(payload);
}

function notFound(req, res) {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.path}` });
}

module.exports = { errorHandler, notFound };
