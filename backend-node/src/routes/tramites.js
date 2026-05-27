const { Router } = require("express");
const { getTramites, getTramiteById } = require("../controllers/tramitesController");

const router = Router();

router.get("/", getTramites);
router.get("/:id", getTramiteById);

module.exports = router;
