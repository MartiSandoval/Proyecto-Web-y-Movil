const { supabase } = require("../../../../core/database/supabaseClient");

async function findHorarios(tramiteId, diaSemana) {
  const { data, error } = await supabase
    .from("horarios_tramite")
    .select("hora_inicio, hora_fin, intervalo_minutos")
    .eq("tramite_id", tramiteId)
    .eq("dia_semana", diaSemana)
    .eq("activo", true);
  if (error) throw error;
  return data;
}

async function findBloqueos(tramiteId, fecha) {
  const { data, error } = await supabase
    .from("bloqueos_horario")
    .select("hora")
    .eq("tramite_id", tramiteId)
    .eq("fecha", fecha);
  if (error) throw error;
  return data;
}

async function findCitasOcupadas(tramiteId, fecha) {
  const { data, error } = await supabase
    .from("citas")
    .select("hora")
    .eq("tramite_id", tramiteId)
    .eq("fecha", fecha)
    .neq("estado", "cancelado");
  if (error) throw error;
  return data;
}

module.exports = { findHorarios, findBloqueos, findCitasOcupadas };
