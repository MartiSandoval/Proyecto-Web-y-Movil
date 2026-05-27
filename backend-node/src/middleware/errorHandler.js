function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";

  if (process.env.NODE_ENV === "development") {
    console.error(`[ERROR] ${req.method} ${req.path} →`, err);
  }

  res.status(status).json({ error: message });
}

function notFound(req, res) {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.path}` });
}

module.exports = { errorHandler, notFound };
