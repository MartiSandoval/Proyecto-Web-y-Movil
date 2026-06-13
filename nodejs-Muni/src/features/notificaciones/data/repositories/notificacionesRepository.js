const { v4: uuidv4 } = require("uuid");
const { supabaseAdmin } = require("../../../../core/database/supabaseClient");

async function crearNotificacion(titulo, mensaje) {
  const { data, error } = await supabaseAdmin
    .from('notificaciones')
    .insert({ id: uuidv4(), titulo, mensaje, leida: false })
    .select('id') 
    .single();
  if (error) throw new Error("Error al crear notificación");
  return data;
}

// También necesitarás una función para que el admin las lea:
async function obtenerNotificaciones() {
  const { data, error } = await supabaseAdmin
    .from('notificaciones')
    .select('id, titulo, mensaje, leida, created_at')
    .order('created_at', { ascending: false })
    .limit(20); 
  if (error) throw new Error("Error al obtener notificaciones");
  return data;
}

async function marcarTodasLeidas() {
  const { data, error } = await supabaseAdmin
    .from('notificaciones')
    .update({ leida: true })
    .eq('leida', false);
  if (error) throw new Error("Error al actualizar notificaciones");
  return data;
}

async function marcarUnaLeida(id) {
  const { data, error } = await supabaseAdmin
    .from('notificaciones')
    .update({ leida: true })
    .eq('id', id)
    .select('id')
    .single();
  if (error) throw new Error("Error al marcar notificación como leída");
  return data;
}

module.exports = { crearNotificacion, obtenerNotificaciones, marcarTodasLeidas, marcarUnaLeida };