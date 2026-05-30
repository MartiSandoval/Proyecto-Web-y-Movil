const { Router } = require("express");
const { crearCita, registrarArchivo, actualizarEstadoCita, obtenerMisCitas, obtenerCitasPorTramite} = require("../controllers/citasController");

const router = Router();

router.post("/", crearCita);
router.post("/:id/archivos", registrarArchivo);

router.get("/mis-citas/:usuario_id", obtenerMisCitas); // Para el ciudadano
router.get("/tramite/:tramite_id", obtenerCitasPorTramite); // Para el funcionario (acepta ?fecha=YYYY-MM-DD)


router.put("/:id/estado", actualizarEstadoCita); // Cambiar a confirmado, cancelado, inasistencia


module.exports = router;