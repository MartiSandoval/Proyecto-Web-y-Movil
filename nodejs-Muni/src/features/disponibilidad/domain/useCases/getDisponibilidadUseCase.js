const repository = require("../../data/repositories/disponibilidadRepository");

// Lógica pura: genera los slots de hora entre un inicio y un fin según el intervalo.
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

async function getDisponibilidadUseCase(tramiteId, fecha) {
  const diaSemana = new Date(fecha + "T12:00:00").getDay();
  const diaPg = diaSemana === 0 ? 7 : diaSemana;

  const horarios = await repository.findHorarios(tramiteId, diaPg);

  if (!horarios || horarios.length === 0) {
    return { fecha, slots: [] };
  }

  const [bloqueos, citasOcupadas] = await Promise.all([
    repository.findBloqueos(tramiteId, fecha),
    repository.findCitasOcupadas(tramiteId, fecha),
  ]);

  const horasBloqueadas = new Set(
    (bloqueos || []).map((b) => (b.hora ? b.hora.slice(0, 5) : null))
  );
  const diaCompleto = horasBloqueadas.has(null);
  const horasOcupadas = new Set((citasOcupadas || []).map((c) => c.hora.slice(0, 5)));

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

  return { fecha, slots };
}

module.exports = { getDisponibilidadUseCase };
