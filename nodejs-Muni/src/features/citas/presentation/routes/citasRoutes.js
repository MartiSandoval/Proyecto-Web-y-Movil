const { Router } = require("express");
const rateLimit = require("express-rate-limit");
const {
  crearCita,
  registrarArchivo,
  actualizarEstadoCita,
  obtenerMisCitas,
  obtenerCitasPorTramite,
  cancelarMiCita,
} = require("../controllers/citasControllers");
const { authenticate, requireRole } = require("../../../../core/middleware/authMiddleware");

const router = Router();

const citasLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Demasiadas solicitudes de citas. Intente nuevamente en 15 minutos." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/", authenticate, citasLimiter, crearCita);
router.post("/:id/archivos", authenticate, registrarArchivo);

router.get("/mis-citas", authenticate, obtenerMisCitas);
router.get("/tramite/:tramite_id", authenticate, requireRole("funcionario", "jefe_sucursal"), obtenerCitasPorTramite);

router.put("/:id/estado", authenticate, requireRole("funcionario", "jefe_sucursal"), actualizarEstadoCita);

router.put("/mis-citas/:id/cancelar", authenticate, cancelarMiCita);
module.exports = router;
