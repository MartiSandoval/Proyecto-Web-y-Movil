const { useMock, supabase } = require("../config/db");
const { tramites } = require("../data/mockData");

function toFrontend(t) {
  return {
    id: t.id,
    nombre: t.nombre,
    descripcion: t.descripcion,
    costo: t.costo,
    departamento: t.sucursal_id,   // se reemplazará por nombre cuando se haga join
    esEnLinea: t.es_en_linea,
    documentosRequeridos: t.documentos_requeridos,
    activo: t.activo,
    sucursalId: t.sucursal_id,
    createdAt: t.created_at,
  };
}

async function getTramites(req, res, next) {
  try {
    if (useMock) {
      return res.json(tramites);
    }
    const { data, error } = await supabase
      .from("tramites")
      .select("*, sucursales(nombre)")
      .eq("activo", true);
    if (error) throw error;
    res.json(data.map((t) => ({
      ...toFrontend(t),
      departamento: t.sucursales?.nombre ?? t.sucursal_id,
    })));
  } catch (err) {
    next(err);
  }
}

async function getTramiteById(req, res, next) {
  try {
    const { id } = req.params;

    if (useMock) {
      const tramite = tramites.find((t) => t.id === id);
      if (!tramite) {
        const err = new Error("Trámite no encontrado");
        err.status = 404;
        return next(err);
      }
      return res.json(tramite);
    }

    const { data, error } = await supabase
      .from("tramites")
      .select("*, sucursales(nombre)")
      .eq("id", id)
      .single();
    if (error) throw error;
    res.json({ ...toFrontend(data), departamento: data.sucursales?.nombre ?? data.sucursal_id });
  } catch (err) {
    next(err);
  }
}

async function crearTramite(req, res, next) {
  try {
    const { sucursal_id, nombre, descripcion, costo, es_en_linea, documentos_requeridos } = req.body;

    // Validación básica
    if (!sucursal_id || !nombre) {
      const err = new Error("sucursal_id y nombre son obligatorios");
      err.status = 400;
      return next(err);
    }

    if (useMock) {
        // Lógica mock si la necesitas, o devolver un error indicando que solo funciona en BD real
        return res.status(201).json({ mensaje: "Trámite creado en mock" });
    }

    // Inserción real en Supabase
    const { data, error } = await supabase
      .from("tramites")
      .insert({ 
        sucursal_id, 
        nombre, 
        descripcion, 
        costo, 
        es_en_linea, 
        documentos_requeridos 
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data); // 201 Created
  } catch (err) {
    next(err);
  }
}


async function actualizarTramite(req, res, next) {
  try {
    const { id } = req.params;
    const { sucursal_id, nombre, descripcion, costo, es_en_linea, documentos_requeridos } = req.body;

    // Validación básica
    if (!id || !sucursal_id || !nombre) {
      const err = new Error("Faltan datos obligatorios para poder actualizar");
      err.status = 400;
      return next(err);
    }

    if (useMock) {
        // Lógica mock si la necesitas, o devolver un error indicando que solo funciona en BD real
        return res.status(200).json({ mensaje: "Trámite creado en mock" });
    }

    // Inserción real en Supabase
    const { data, error } = await supabase
      .from("tramites")
      .update({ 
        sucursal_id, 
        nombre, 
        descripcion, 
        costo, 
        es_en_linea, 
        documentos_requeridos 
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.status(200).json(data); // 201 Created
  } catch (err) {
    next(err);
  }
}

async function eliminarTramite(req, res, next) {
  try {
    const { id } = req.params;
    
    // Validación básica
    if (!id) {
      const err = new Error("id es obligatorio");
      err.status = 400;
      return next(err);
    }

    if (useMock) {
        // Lógica mock si la necesitas, o devolver un error indicando que solo funciona en BD real
        return res.status(200).json({ mensaje: "Trámite creado en mock" });
    }

    // Inserción real en Supabase
    const { data, error } = await supabase
      .from("tramites")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.status(200).json({ 
      mensaje: "Trámite eliminado correctamente",
      tramite: data 
    });
  } catch (err) {
    next(err);
  }
}
module.exports = { getTramites, getTramiteById, crearTramite, actualizarTramite, eliminarTramite };
