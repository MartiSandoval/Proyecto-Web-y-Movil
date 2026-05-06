from fastapi import APIRouter
from db import supabase

router = APIRouter()

DEFAULT_SLOTS = [
    {"hora": "08:00", "disponible": True},
    {"hora": "09:00", "disponible": True},
    {"hora": "10:00", "disponible": True},
    {"hora": "10:30", "disponible": True},
    {"hora": "11:00", "disponible": True},
    {"hora": "12:00", "disponible": True},
    {"hora": "12:30", "disponible": True},
    {"hora": "15:00", "disponible": True},
]

@router.get("/{tramite_id}/{fecha}")
def get_disponibilidad(tramite_id: str, fecha: str):
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
    return {"fecha": fecha, "slots": DEFAULT_SLOTS}
