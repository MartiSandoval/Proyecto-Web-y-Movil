# Estado en memoria compartido entre routers (se reinicia con el servidor)
# Cuando se migre a Supabase, este módulo se puede eliminar y
# usar la tabla "disponibilidad" directamente.

_slots_reservados: set[tuple[str, str, str]] = set()

def reservar_slot(tramite_id: str, fecha: str, hora: str) -> None:
    _slots_reservados.add((tramite_id, fecha, hora))

def slot_reservado(tramite_id: str, fecha: str, hora: str) -> bool:
    return (tramite_id, fecha, hora) in _slots_reservados
