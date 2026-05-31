const { supabase } = require("../config/db");

function generarHoras(horaInicio, horaFin, intervalo) {
  const slots = [];
  const [hI, mI] = horaInicio.split(":").map(Number);
  const [hF, mF] = horaFin.split(":").map(Number);
  let minutos = hI * 60 + mI;
  const fin = hF * 60 + mF;
  while (minutos < fin) {
    const h = String(Math.floor(minutos / 60)).padStart(2, "0");
    const m = String(minutos % 60).padStart(2, "0");
    slots.push(`${h}:${m}`);
    minutos += intervalo;
  }
  return slots;
}

async function getDisponibilidad(req, res, next) {
  try {
    const { tramiteId, fecha } = req.params;

    // Día de semana en Postgres: 1=lunes…7=domingo
    const diaSemana = new Date(fecha + "T12:00:00").getDay(); // 0=dom
    const diaPg = diaSemana === 0 ? 7 : diaSemana;

    const { data: horarios, error: errH } = await supabase
      .from("horarios_tramite")
      .select("hora_inicio, hora_fin, intervalo_minutos")
      .eq("tramite_id", tramiteId)
      .eq("dia_semana", diaPg)
      .eq("activo", true);
    if (errH) throw errH;

    if (!horarios || horarios.length === 0) {
      return res.json({ fecha, slots: [] });
    }

    const { data: bloqueos, error: errB } = await supabase
      .from("bloqueos_horario")
      .select("hora")
      .eq("tramite_id", tramiteId)
      .eq("fecha", fecha);
    if (errB) throw errB;

    const horasBloqueadas = new Set(
      (bloqueos || []).map((b) => (b.hora ? b.hora.slice(0, 5) : null))
    );
    const diaCompleto = horasBloqueadas.has(null);

    const { data: citasOcupadas, error: errC } = await supabase
      .from("citas")
      .select("hora")
      .eq("tramite_id", tramiteId)
      .eq("fecha", fecha)
      .neq("estado", "cancelado");
    if (errC) throw errC;

    const horasOcupadas = new Set(
      (citasOcupadas || []).map((c) => c.hora.slice(0, 5))
    );

    const slots = [];
    for (const h of horarios) {
      const horas = generarHoras(h.hora_inicio.slice(0, 5), h.hora_fin.slice(0, 5), h.intervalo_minutos);
      for (const hora of horas) {
        slots.push({
          hora,
          disponible: !diaCompleto && !horasBloqueadas.has(hora) && !horasOcupadas.has(hora),
        });
      }
    }

    res.json({ fecha, slots });
  } catch (err) {
    next(err);
  }
}

module.exports = { getDisponibilidad };
