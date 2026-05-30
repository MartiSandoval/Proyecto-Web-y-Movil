const { v4: uuidv4 } = require("uuid");
const { supabase } = require("../config/db");

async function crearCita(req, res, next) {
  try {
    const { tramite_id, fecha, hora } = req.body;
    const usuario_id = req.user.id;

    if (!tramite_id || !fecha || !hora) {
      const err = new Error("tramite_id, fecha y hora son requeridos");
      err.status = 400;
      return next(err);
    }

    const { data, error } = await supabase
      .from("citas")
      .insert({ id: uuidv4(), usuario_id, tramite_id, fecha, hora, estado: "pendiente" })
      .select()
      .single();
    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

async function registrarArchivo(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, url } = req.body;

    if (!nombre || !url) {
      const err = new Error("nombre y url son requeridos");
      err.status = 400;
      return next(err);
    }

    const { data, error } = await supabase
      .from("archivos_cita")
      .insert({ id: uuidv4(), cita_id: id, nombre, url })
      .select()
      .single();
    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

async function actualizarEstadoCita(req, res, next) {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = ["pendiente", "confirmado", "cancelado", "completado"];
    if (!estado || !estadosValidos.includes(estado)) {
      const err = new Error(`Estado inválido. Debe ser uno de: ${estadosValidos.join(", ")}`);
      err.status = 400;
      return next(err);
    }

    const { data, error } = await supabase
      .from("citas")
      .update({ estado })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function obtenerMisCitas(req, res, next) {
  try {
    const usuario_id = req.user.id;

    const { data, error } = await supabase
      .from("citas")
      .select("*, tramites(nombre)")
      .eq("usuario_id", usuario_id)
      .order("fecha", { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function obtenerCitasPorTramite(req, res, next) {
  try {
    const { tramite_id } = req.params;
    const { fecha } = req.query;

    if (!tramite_id) {
      const err = new Error("El ID del trámite es obligatorio");
      err.status = 400;
      return next(err);
    }

    let query = supabase
      .from("citas")
      .select("*, ciudadano:perfiles!usuario_id(nombre, rut)")
      .eq("tramite_id", tramite_id)
      .order("hora", { ascending: true });

    if (fecha) {
      query = query.eq("fecha", fecha);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { crearCita, registrarArchivo, actualizarEstadoCita, obtenerMisCitas, obtenerCitasPorTramite };
