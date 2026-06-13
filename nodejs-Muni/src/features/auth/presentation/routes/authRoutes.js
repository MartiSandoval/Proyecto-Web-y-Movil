const { Router } = require("express");
const rateLimit = require("express-rate-limit");
const { registro, login, getCurrentUser, actualizarPerfil } = require("../controllers/authControllers");
const { authenticate } = require("../../../../core/middleware/authMiddleware");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Demasiados intentos. Intente nuevamente en 15 minutos." },
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

router.post("/registro", authLimiter, registro);
router.post("/login", authLimiter, login);

router.get("/me", authenticate, getCurrentUser);

router.put("/me", authenticate, actualizarPerfil);
module.exports = router;
