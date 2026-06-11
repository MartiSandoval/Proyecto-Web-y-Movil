const { v4: uuidv4 } = require("uuid");
const { supabase } = require("../../../../core/database/supabaseClient");

async function insertBloqueo({ tramiteId, fecha, hora, motivo, createdBy }) {
  const { data, error } = await supabase
    .from("bloqueos_horario")
    .insert({
      id: uuidv4(),
      tramite_id: tramiteId,
      fecha,
      hora: hora ?? null,
      motivo: motivo ?? null,
      created_by: createdBy ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function findByTramite(tramiteId, fecha) {
  let query = supabase
    .from("bloqueos_horario")
    .select("*")
    .eq("tramite_id", tramiteId)
    .order("fecha", { ascending: true })
    .order("hora", { ascending: true, nullsFirst: true });

  if (fecha) {
    query = query.eq("fecha", fecha);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

async function deleteBloqueo(id) {
  const { error } = await supabase.from("bloqueos_horario").delete().eq("id", id);
  if (error) throw error;
}

module.exports = { insertBloqueo, findByTramite, deleteBloqueo };
