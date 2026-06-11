const { Router } = require("express");
const {
  getSucursales,
  crearSucursal,
  actualizarSucursal,
  eliminarSucursal,
} = require("../controllers/sucursalesControllers");

const router = Router();

router.get("/", getSucursales);
router.post("/", crearSucursal);
router.put("/:id", actualizarSucursal);
router.delete("/:id", eliminarSucursal);

module.exports = router;
