const { Router } = require("express");
const {
  crearBloqueo,
  obtenerBloqueos,
  eliminarBloqueo,
} = require("../controllers/bloqueosControllers");
const { authenticate, requireRole } = require("../../../../core/middleware/authMiddleware");

const router = Router();

router.post("/", authenticate, requireRole("funcionario", "jefe_sucursal"), crearBloqueo);
router.get("/", authenticate, requireRole("funcionario", "jefe_sucursal"), obtenerBloqueos);
router.delete("/:id", authenticate, requireRole("funcionario", "jefe_sucursal"), eliminarBloqueo);

module.exports = router;
