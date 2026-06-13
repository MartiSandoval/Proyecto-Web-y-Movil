require("dotenv").config();

// Lectura centralizada de variables de entorno (core/config).
// Todas las demás capas leen la configuración desde aquí, no desde process.env.
const environment = {
  port: process.env.PORT || 8000,
  nodeEnv: process.env.NODE_ENV || "development",
  // Admite uno o varios orígenes separados por comas (ej: "http://localhost:5173,http://localhost:5174").
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
    : ["http://localhost:8100", "http://localhost:4200", "http://localhost:3000"],
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
};

module.exports = { environment };
