const { Router } = require("express");
const { crearCita, registrarArchivo, actualizarEstadoCita, obtenerMisCitas, obtenerCitasPorTramite } = require("../controllers/citasController");
const { authenticate, requireRole } = require("../middleware/authMiddleware");

const router = Router();

router.post("/", authenticate, crearCita);
router.post("/:id/archivos", authenticate, registrarArchivo);

router.get("/mis-citas", authenticate, obtenerMisCitas);
router.get("/tramite/:tramite_id", authenticate, requireRole("funcionario", "jefe_sucursal"), obtenerCitasPorTramite);

router.put("/:id/estado", authenticate, requireRole("funcionario", "jefe_sucursal"), actualizarEstadoCita);

module.exports = router;