const { v4: uuidv4 } = require("uuid");
const { useMock, supabase } = require("../config/db");
const { reservarSlot } = require("./disponibilidadController");

// Almacenamiento en memoria (solo mock)
const _citasDb = [];
const _archivosDb = [];

async function crearCita(req, res, next) {
  try {
    const { tramite_id, fecha, hora } = req.body;

    if (!tramite_id || !fecha || !hora) {
      const err = new Error("tramite_id, fecha y hora son requeridos");
      err.status = 400;
      return next(err);
    }

    const { data, error } = await supabase
      .from("citas")
      .insert({ id: uuidv4(), tramite_id, fecha, hora, estado: "pendiente" })
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

    // Validación: Asegurarnos de que envían un estado válido
    const estadosValidos = ['pendiente', 'confirmado', 'cancelado', 'completado'];
    
    if (!estado || !estadosValidos.includes(estado)) {
      const err = new Error(`Estado inválido. Debe ser uno de: ${estadosValidos.join(', ')}`);
      err.status = 400;
      return next(err);
    }

    // Actualización real en Supabase
    const { data, error } = await supabase
      .from("citas")
      .update({ estado: estado }) 
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.status(200).json(data); 
  } catch (err) {
    next(err);
  }
}

// GET /citas/mis-citas/:usuario_id
async function obtenerMisCitas(req, res, next) {
  try {
    // NOTA: Cuando tu compañero termine el login, este ID debe salir del token: 
    // const idUsuario = req.user.id;
    const { usuario_id } = req.params; 

    if (!usuario_id) {
      const err = new Error("El ID del usuario es obligatorio");
      err.status = 400;
      return next(err);
    }


    // Consulta a Supabase: Traemos las citas y hacemos "join" con el nombre del trámite
    const { data, error } = await supabase
      .from("citas")
      .select("*, tramites(nombre)")
      .eq("usuario_id", usuario_id)
      .order("fecha", { ascending: false }); // Ordenamos de la más reciente a la más antigua

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

// GET /citas/tramite/:tramite_id
async function obtenerCitasPorTramite(req, res, next) {
  try {
    const { tramite_id } = req.params;
    const { fecha } = req.query; // Permite filtrar por día opcionalmente: /citas/tramite/123?fecha=2026-10-15

    if (!tramite_id) {
      const err = new Error("El ID del trámite es obligatorio");
      err.status = 400;
      return next(err);
    }

    // Consulta base a Supabase (traemos datos del usuario para que el funcionario sepa a quién atiende)
    let query = supabase
      .from("citas")
      // Le indicamos explícitamente que use la relación de "usuario_id" 
      // y opcionalmente renombramos la salida a "ciudadano" para que sea más legible
      .select("*, ciudadano:perfiles!usuario_id(nombre, rut)") 
      .eq("tramite_id", tramite_id)
      .order("hora", { ascending: true });

    // Si enviaron una fecha específica, filtramos por ese día
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
