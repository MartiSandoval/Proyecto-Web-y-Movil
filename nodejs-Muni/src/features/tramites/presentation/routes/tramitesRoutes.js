const { Router } = require("express");
const {
  getTramites,
  getTramiteById,
  crearTramite,
  actualizarTramite,
  eliminarTramite,
  asignarFuncionarios,
} = require("../controllers/tramitesControllers");
const { authenticate, requireRole } = require("../../../../core/middleware/authMiddleware");

const router = Router();

// Lectura pública (la usan ciudadanos, funcionarios y jefes).
router.get("/", getTramites);
router.get("/:id", getTramiteById);

// Escritura: solo el jefe de sucursal.
router.post("/", authenticate, requireRole("jefe_sucursal"), crearTramite);
router.put("/:id", authenticate, requireRole("jefe_sucursal"), actualizarTramite);
router.put("/:id/funcionarios", authenticate, requireRole("jefe_sucursal"), asignarFuncionarios);
router.delete("/:id", authenticate, requireRole("jefe_sucursal"), eliminarTramite);

module.exports = router;
