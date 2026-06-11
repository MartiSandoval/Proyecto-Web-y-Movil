const { supabase } = require("../../../../core/database/supabaseClient");

function toFrontend(p) {
  return {
    id: p.id,
    nombre: p.nombre,
    rut: p.rut,
  };
}

async function findBySucursal(sucursalId) {
  let query = supabase
    .from("perfiles")
    .select("id, nombre, rut")
    .eq("rol", "funcionario")
    .order("nombre", { ascending: true });

  if (sucursalId) {
    query = query.eq("sucursal_id", sucursalId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data.map(toFrontend);
}

module.exports = { findBySucursal };
