const { Router } = require("express");
const { crearCita, registrarArchivo } = require("../controllers/citasController");

const router = Router();

router.post("/", crearCita);
router.post("/:id/archivos", registrarArchivo);

module.exports = router;
