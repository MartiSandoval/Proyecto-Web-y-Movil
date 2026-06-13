const { Router } = require("express");
const { getNotificaciones, marcarLeidas, marcarUnaLeida } = require("../controllers/notificacionesControllers");
const { authenticate } = require("../../../../core/middleware/authMiddleware");

const router = Router();

router.get("/", authenticate, getNotificaciones);
router.put("/leer-todas", authenticate, marcarLeidas);
router.put("/:id/leer", authenticate, marcarUnaLeida);

module.exports = router;