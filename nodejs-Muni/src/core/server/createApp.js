const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const { environment } = require("../config/environment");
const { errorHandler, notFound } = require("../middleware/errorHandler");
const { sanitizeBody } = require("../middleware/sanitizeMiddleware");

const healthRoutes = require("../../features/health/presentation/routes/healthRoutes");
const authRoutes = require("../../features/auth/presentation/routes/authRoutes");
const tramitesRoutes = require("../../features/tramites/presentation/routes/tramitesRoutes");
const disponibilidadRoutes = require("../../features/disponibilidad/presentation/routes/disponibilidadRoutes");
const citasRoutes = require("../../features/citas/presentation/routes/citasRoutes");
const sucursalesRoutes = require("../../features/sucursales/presentation/routes/sucursalesRoutes");
const bloqueosRoutes = require("../../features/bloqueos/presentation/routes/bloqueosRoutes");
const funcionariosRoutes = require("../../features/funcionarios/presentation/routes/funcionariosRoutes");

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(compression());

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || environment.corsOrigin.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS: origen no permitido: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));

  app.use(express.json());
  app.use(sanitizeBody);

  app.use("/", healthRoutes);
  app.use("/auth", authRoutes);
  app.use("/tramites", tramitesRoutes);
  app.use("/disponibilidad", disponibilidadRoutes);
  app.use("/citas", citasRoutes);
  app.use("/sucursales", sucursalesRoutes);
  app.use("/bloqueos", bloqueosRoutes);
  app.use("/funcionarios", funcionariosRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
