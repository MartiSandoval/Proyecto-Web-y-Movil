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

    if (useMock) {
      const cita = {
        id: uuidv4(),
        tramite_id,
        fecha,
        hora,
        estado: "pendiente",
      };
      _citasDb.push(cita);
      reservarSlot(tramite_id, fecha, hora);
      return res.status(201).json(cita);
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

    if (useMock) {
      const archivo = { id: uuidv4(), cita_id: id, nombre, url };
      _archivosDb.push(archivo);
      return res.status(201).json(archivo);
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

module.exports = { crearCita, registrarArchivo };
