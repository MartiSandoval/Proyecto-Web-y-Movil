from fastapi import APIRouter
from db import USE_MOCK, supabase
from mock_data import SLOTS
from state import slot_reservado

router = APIRouter()

@router.get("/{tramite_id}/{fecha}")
def get_disponibilidad(tramite_id: str, fecha: str):
    if USE_MOCK:
        slots = [
            {
                "hora": s["hora"],
                "disponible": s["disponible"] and not slot_reservado(tramite_id, fecha, s["hora"]),
            }
            for s in SLOTS
        ]
        return {"fecha": fecha, "slots": slots}
    result = (
        supabase.table("disponibilidad")
        .select("hora, disponible")
        .eq("tramite_id", tramite_id)
        .eq("fecha", fecha)
        .execute()
    )
    if result.data:
        slots = [{"hora": row["hora"][:5], "disponible": row["disponible"]} for row in result.data]
        return {"fecha": fecha, "slots": slots}
    return {"fecha": fecha, "slots": SLOTS}
