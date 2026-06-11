const { Router } = require("express");
const { registro, login, getCurrentUser } = require("../controllers/authControllers");
const { authenticate } = require("../../../../core/middleware/authMiddleware");

const router = Router();

router.post("/registro", registro);
router.post("/login", login);
router.get("/me", authenticate, getCurrentUser);

module.exports = router;
