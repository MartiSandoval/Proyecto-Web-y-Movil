const { createClient } = require("@supabase/supabase-js");
const { environment } = require("../config/environment");

if (!environment.supabaseUrl || !environment.supabaseServiceKey) {
  throw new Error("SUPABASE_URL y SUPABASE_SERVICE_KEY son requeridos");
}

// Cliente con service role: acceso completo a la base de datos y a la API admin.
const supabase = createClient(environment.supabaseUrl, environment.supabaseServiceKey);

// Alias semántico para operaciones administrativas (auth.admin, lectura de perfiles, etc.).
const supabaseAdmin = supabase;

// Cliente con anon key: se usa para operaciones de sesión (signInWithPassword devuelve
// la sesión con el access_token JWT).
const supabaseAnon = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

module.exports = { supabase, supabaseAdmin, supabaseAnon };
