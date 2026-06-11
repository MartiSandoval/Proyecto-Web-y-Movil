const { Router } = require("express");
const {
  getTramites,
  getTramiteById,
  crearTramite,
  actualizarTramite,
  eliminarTramite,
} = require("../controllers/tramitesControllers");

const router = Router();

router.get("/", getTramites);
router.get("/:id", getTramiteById);
router.post("/", crearTramite);
router.put("/:id", actualizarTramite);
router.delete("/:id", eliminarTramite);

module.exports = router;
