const { supabase } = require("../../../../core/database/supabaseClient");

// Mapea la fila de la tabla `tramites` a la forma que consume el frontend.
function toFrontend(t) {
  return {
    id: t.id,
    nombre: t.nombre,
    descripcion: t.descripcion,
    costo: t.costo,
    departamento: t.sucursales?.nombre ?? t.sucursal_id,
    esEnLinea: t.es_en_linea,
    documentosRequeridos: t.documentos_requeridos,
    activo: t.activo,
    sucursalId: t.sucursal_id,
    createdAt: t.created_at,
  };
}

async function findActivos(sucursalId) {
  let query = supabase
    .from("tramites")
    .select("*, sucursales(nombre)")
    .eq("activo", true);

  if (sucursalId) {
    query = query.eq("sucursal_id", sucursalId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data.map(toFrontend);
}

async function findById(id) {
  const { data, error } = await supabase
    .from("tramites")
    .select("*, sucursales(nombre)")
    .eq("id", id)
    .single();
  if (error) throw error;
  return toFrontend(data);
}

async function insertTramite({ sucursal_id, nombre, descripcion, costo, es_en_linea, documentos_requeridos }) {
  const { data, error } = await supabase
    .from("tramites")
    .insert({ sucursal_id, nombre, descripcion, costo, es_en_linea, documentos_requeridos })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateTramite(id, { sucursal_id, nombre, descripcion, costo, es_en_linea, documentos_requeridos }) {
  const { data, error } = await supabase
    .from("tramites")
    .update({ sucursal_id, nombre, descripcion, costo, es_en_linea, documentos_requeridos })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteTramite(id) {
  const { data, error } = await supabase
    .from("tramites")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

module.exports = { findActivos, findById, insertTramite, updateTramite, deleteTramite };
