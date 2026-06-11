function getHealthStatus(req, res) {
  res.json({ status: "ok", message: "Servidor de trámites municipales" });
}

module.exports = { getHealthStatus };
