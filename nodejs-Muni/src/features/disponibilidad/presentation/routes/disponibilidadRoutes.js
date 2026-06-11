const { Router } = require("express");
const { getDisponibilidad } = require("../controllers/disponibilidadControllers");

const router = Router();

router.get("/:tramiteId/:fecha", getDisponibilidad);

module.exports = router;
