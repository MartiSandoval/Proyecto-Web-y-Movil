const { Router } = require("express");
const { obtenerFuncionarios } = require("../controllers/funcionariosControllers");
const { authenticate, requireRole } = require("../../../../core/middleware/authMiddleware");

const router = Router();

router.get("/", authenticate, requireRole("jefe_sucursal"), obtenerFuncionarios);

module.exports = router;
