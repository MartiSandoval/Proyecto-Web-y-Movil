const { Router } = require("express");
const { registro, login, getCurrentUser, actualizarPerfil } = require("../controllers/authControllers");
const { authenticate } = require("../../../../core/middleware/authMiddleware");
const { actualizarEstadoCita } = require("../../../citas/presentation/controllers/citasControllers");

const router = Router();

router.post("/registro", registro);
router.post("/login", login);
router.get("/me", authenticate, getCurrentUser);
router.put("/me", authenticate, actualizarEstadoCita);

module.exports = router;
