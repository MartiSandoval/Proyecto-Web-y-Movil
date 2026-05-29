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

module.exports = { getTramites, getTramiteById };
