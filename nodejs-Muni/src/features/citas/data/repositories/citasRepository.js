const { v4: uuidv4 } = require("uuid");
const { supabase } = require("../../../../core/database/supabaseClient");

async function insertCita({ usuarioId, tramiteId, fecha, hora }) {
  const { data, error } = await supabase
    .from("citas")
    .insert({ id: uuidv4(), usuario_id: usuarioId, tramite_id: tramiteId, fecha, hora, estado: "pendiente" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function insertArchivo({ citaId, nombre, url }) {
  const { data, error } = await supabase
    .from("archivos_cita")
    .insert({ id: uuidv4(), cita_id: citaId, nombre, url })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateEstado(id, estado) {
  const { data, error } = await supabase
    .from("citas")
    .update({ estado })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function findByUsuario(usuarioId) {
  const { data, error } = await supabase
    .from("citas")
    .select("*, tramites(nombre)")
    .eq("usuario_id", usuarioId)
    .order("fecha", { ascending: false });
  if (error) throw error;
  return data;
}

async function findByTramite(tramiteId, fecha) {
  let query = supabase
    .from("citas")
    .select("*, ciudadano:perfiles!usuario_id(nombre, rut)")
    .eq("tramite_id", tramiteId)
    .order("hora", { ascending: true });

  if (fecha) {
    query = query.eq("fecha", fecha);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

module.exports = { insertCita, insertArchivo, updateEstado, findByUsuario, findByTramite };
