const { v4: uuidv4 } = require("uuid");
const { supabase } = require("../../../../core/database/supabaseClient");

const cancelarCitaCiudadano = async (citaId, usuarioId) => {
  const { data, error } = await supabase
    .from('citas')
    .update({ estado: 'cancelado' }) // Asegúrate de que este texto coincida con tu BD
    .eq('id', citaId)
    .eq('usuario_id', usuarioId) // CANDADO: Solo si es el dueño
    .select('id', 'estado')
    .single();

  if (error || !data) {
    throw new Error("No se pudo cancelar la cita. Verifica que te pertenezca.");
  }
  return data;
};

async function insertCita({ usuarioId, tramiteId, fecha, hora }) {
  const { data, error } = await supabase
    .from("citas")
    .insert({ id: uuidv4(), usuario_id: usuarioId, tramite_id: tramiteId, fecha, hora, estado: "pendiente" })
    .select('id', 'fecha', 'hora', 'estado')
    .single();
  if (error) throw error;
  return data;
}

async function insertArchivo({ citaId, nombre, url }) {
  const { data, error } = await supabase
    .from("archivos_cita")
    .insert({ id: uuidv4(), cita_id: citaId, nombre, url })
    .select('id', 'nombre', 'url')
    .single();
  if (error) throw error;
  return data;
}

async function updateEstado(id, estado) {
  const { data, error } = await supabase
    .from("citas")
    .update({ estado })
    .eq("id", id)
    .select('id', 'estado')
    .single();
  if (error) throw error;
  return data;
}

async function findByUsuario(usuarioId, page = 1, limit = 10) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("citas")
    // Reemplaza estos campos con los nombres EXACTOS de tus columnas si difieren
    .select("id, fecha, hora, estado, tramite_id, tramites(nombre)") 
    .eq("usuario_id", usuarioId)
    .order("fecha", { ascending: false })
    .range(from, to); // Paginación nativa de Supabase

  if (error) throw error;
  return data;
}

async function findByTramite(tramiteId, fecha) {
  let query = supabase
    .from("citas")
    .select("id, fecha, hora, estado, ciudadano:perfiles!usuario_id(nombre, rut)")
    .eq("tramite_id", tramiteId)
    .order("hora", { ascending: true });

  if (fecha) {
    query = query.eq("fecha", fecha);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

module.exports = { insertCita, insertArchivo, updateEstado, findByUsuario, findByTramite, cancelarCitaCiudadano };
