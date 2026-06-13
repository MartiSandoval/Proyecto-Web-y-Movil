const { Router } = require("express");
const { getNotificaciones, marcarLeidas } = require("../controllers/notificacionesControllers");
const { authenticate } = require("../../../../core/middleware/authMiddleware");

const router = Router();

// Protegemos la ruta para que solo usuarios logueados (admins) puedan verlas
router.get("/", authenticate, getNotificaciones);
router.put("/leer-todas", authenticate, marcarLeidas);

module.exports = router;