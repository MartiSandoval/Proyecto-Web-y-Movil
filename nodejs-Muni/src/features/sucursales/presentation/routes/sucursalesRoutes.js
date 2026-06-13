const { Router } = require("express");
const {
  getSucursales,
  crearSucursal,
  actualizarSucursal,
  eliminarSucursal,
} = require("../controllers/sucursalesControllers");
const { authenticate, requireRole } = require("../../../../core/middleware/authMiddleware");

const router = Router();

router.get("/", getSucursales);
router.post("/", authenticate, requireRole("jefe_sucursal", "admin"), crearSucursal);
router.put("/:id", authenticate, requireRole("jefe_sucursal", "admin"), actualizarSucursal);
router.delete("/:id", authenticate, requireRole("jefe_sucursal", "admin"), eliminarSucursal);

module.exports = router;
