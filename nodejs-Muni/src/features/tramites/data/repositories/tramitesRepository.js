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

async function findActivos(sucursalId, funcionarioId) {
  let query = supabase
    .from("tramites")
    .select("id, nombre, descripcion, costo, es_en_linea, documentos_requeridos, activo, sucursal_id, created_at, sucursales(nombre)")
    .eq("activo", true);

  if (sucursalId) {
    query = query.eq("sucursal_id", sucursalId);
  }

  // Si se filtra por funcionario, solo los trámites que tiene asignados.
  if (funcionarioId) {
    const ids = await findTramiteIdsByFuncionario(funcionarioId);
    if (ids.length === 0) return [];
    query = query.in("id", ids);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data.map(toFrontend);
}

async function findById(id) {
  const { data, error } = await supabase
    .from("tramites")
    .select("id, nombre, descripcion, costo, es_en_linea, documentos_requeridos, activo, sucursal_id, created_at, sucursales(nombre)")
    .eq("id", id)
    .single();
  if (error) throw error;

  const [horarios, funcionarioIds] = await Promise.all([
    findHorarios(id),
    findFuncionarioIds(id),
  ]);

  return { ...toFrontend(data), horarios, funcionarioIds };
}

async function insertTramite({
  sucursal_id,
  nombre,
  descripcion,
  costo,
  es_en_linea,
  documentos_requeridos,
  created_by,
}) {
  const { data, error } = await supabase
    .from("tramites")
    .insert({ sucursal_id, nombre, descripcion, costo, es_en_linea, documentos_requeridos, created_by })
    .select("id")
    .single();
  if (error) throw error;
  return data;
}

async function updateTramite(id, { sucursal_id, nombre, descripcion, costo, es_en_linea, documentos_requeridos }) {
  const { data, error } = await supabase
    .from("tramites")
    .update({ sucursal_id, nombre, descripcion, costo, es_en_linea, documentos_requeridos })
    .eq("id", id)
    .select("id")
    .single();
  if (error) throw error;
  return data;
}

async function deleteTramite(id) {
  const { data, error } = await supabase
    .from("tramites")
    .delete()
    .eq("id", id)
    .select("id")
    .single();
  if (error) throw error;
  return data;
}

// ── Horarios del trámite (tabla horarios_tramite) ────────────────
async function findHorarios(tramiteId) {
  const { data, error } = await supabase
    .from("horarios_tramite")
    .select("dia_semana, hora_inicio, hora_fin, intervalo_minutos")
    .eq("tramite_id", tramiteId)
    .order("dia_semana", { ascending: true });
  if (error) throw error;
  return data;
}

// Reemplaza por completo los horarios de un trámite (borra + inserta).
async function replaceHorarios(tramiteId, horarios) {
  const { error: delError } = await supabase
    .from("horarios_tramite")
    .delete()
    .eq("tramite_id", tramiteId);
  if (delError) throw delError;

  if (!horarios || horarios.length === 0) return;

  const filas = horarios.map((h) => ({
    tramite_id: tramiteId,
    dia_semana: h.dia_semana,
    hora_inicio: h.hora_inicio,
    hora_fin: h.hora_fin,
    intervalo_minutos: h.intervalo_minutos ?? 30,
    activo: true,
  }));

  const { error } = await supabase.from("horarios_tramite").insert(filas);
  if (error) throw error;
}

// ── Asignación de funcionarios (tabla tramite_funcionarios) ──────
async function findFuncionarioIds(tramiteId) {
  const { data, error } = await supabase
    .from("tramite_funcionarios")
    .select("funcionario_id")
    .eq("tramite_id", tramiteId);
  if (error) throw error;
  return data.map((f) => f.funcionario_id);
}

async function findTramiteIdsByFuncionario(funcionarioId) {
  const { data, error } = await supabase
    .from("tramite_funcionarios")
    .select("tramite_id")
    .eq("funcionario_id", funcionarioId);
  if (error) throw error;
  return data.map((f) => f.tramite_id);
}

// Reemplaza por completo los funcionarios asignados a un trámite.
async function replaceFuncionarios(tramiteId, funcionarioIds) {
  const { error: delError } = await supabase
    .from("tramite_funcionarios")
    .delete()
    .eq("tramite_id", tramiteId);
  if (delError) throw delError;

  if (!funcionarioIds || funcionarioIds.length === 0) return;

  const filas = funcionarioIds.map((funcionario_id) => ({
    tramite_id: tramiteId,
    funcionario_id,
  }));

  const { error } = await supabase.from("tramite_funcionarios").insert(filas);
  if (error) throw error;
}

module.exports = {
  findActivos,
  findById,
  insertTramite,
  updateTramite,
  deleteTramite,
  findHorarios,
  replaceHorarios,
  findFuncionarioIds,
  replaceFuncionarios,
};
