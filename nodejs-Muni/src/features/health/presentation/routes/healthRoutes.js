const { Router } = require("express");
const { getHealthStatus } = require("../controllers/healthControllers");

const router = Router();

router.get("/", getHealthStatus);

module.exports = router;
