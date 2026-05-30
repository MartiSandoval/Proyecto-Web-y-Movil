require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  throw new Error("SUPABASE_URL y SUPABASE_SERVICE_KEY son requeridos para la autenticación");
}

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  const token = authHeader.split(" ")[1];

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }

  const { data: perfil, error: perfilError } = await supabaseAdmin
    .from("perfiles")
    .select("id, nombre, rol, sucursal_id")
    .eq("id", user.id)
    .single();

  if (perfilError || !perfil) {
    return res.status(401).json({ error: "Perfil de usuario no encontrado" });
  }

  req.user = perfil;
  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "No autenticado" });
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ error: "Sin permisos suficientes" });
    }
    next();
  };
}

module.exports = { authenticate, requireRole, supabaseAdmin };
