const { supabaseAdmin, supabaseAnon } = require("../../../../core/database/supabaseClient");

// Verifica existencia de un perfil por RUT (chequeo de duplicado en registro).
async function findPerfilByRut(rut) {
  const { data } = await supabaseAdmin
    .from("perfiles")
    .select("id")
    .eq("rut", rut)
    .maybeSingle();
  return data;
}

// Obtiene credenciales (id + hash bcrypt) por RUT para el login.
async function findCredencialesByRut(rut) {
  return supabaseAdmin
    .from("perfiles")
    .select("id, password_hash")
    .eq("rut", rut)
    .single();
}

// Datos públicos del perfil que se devuelven al cliente.
async function findResumenById(id) {
  const { data } = await supabaseAdmin
    .from("perfiles")
    .select("id, nombre, rol, sucursal_id, telefono, direccion") // <-- Me aseguré de incluir los nuevos campos aquí
    .eq("id", id)
    .single();
  return data;
}

// Crea el usuario en Supabase Auth (maneja sesión y generación de JWT).
async function createAuthUser({ email, password, nombre, rut }) {
  return supabaseAdmin.auth.admin.createUser({
    email,
    password,
    user_metadata: { nombre, rut },
    email_confirm: true,
  });
}

// Completa el perfil con datos adicionales + password_hash bcrypt (EP 2.6b).
// AQUÍ ES DONDE TU registerUserUseCase LE PASARÁ LA DIRECCIÓN.
async function updatePerfilData(id, fields) {
  return supabaseAdmin.from("perfiles").update(fields).eq("id", id);
}

async function getAuthUserById(id) {
  return supabaseAdmin.auth.admin.getUserById(id);
}

// Inicia sesión con anon key para obtener el access_token JWT.
async function signIn(email, password) {
  return supabaseAnon.auth.signInWithPassword({ email, password });
}

// Actualiza el perfil del usuario (Corregido el error de la variable supabase)
const actualizarPerfil = async (usuarioId, datosActualizados) => {
  const { data, error } = await supabaseAdmin // <-- CORRECCIÓN CRÍTICA: Era supabaseAdmin, no supabase
    .from('perfiles') 
    .update({
      telefono: datosActualizados.telefono,
      direccion: datosActualizados.direccion,
    })
    .eq('id', usuarioId)
    .select("id, telefono, direccion")
    .single();

  if (error) throw new Error(`Error al actualizar perfil: ${error.message}`);
  return data;
};

module.exports = {
  findPerfilByRut,
  findCredencialesByRut,
  findResumenById,
  createAuthUser,
  updatePerfilData,
  getAuthUserById,
  signIn,
  actualizarPerfil
};