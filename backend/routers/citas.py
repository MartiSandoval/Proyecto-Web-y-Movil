import uuid
from fastapi import APIRouter, HTTPException
from db import USE_MOCK, supabase
from models.cita import CitaCreate, ArchivoCreate
from state import reservar_slot

router = APIRouter()

# Almacenamiento en memoria para modo mock (se pierde al reiniciar el servidor)
_citas_db = []
_archivos_db = []

@router.post("/")
def crear_cita(cita: CitaCreate):
    if USE_MOCK:
        nueva = {
            "id": str(uuid.uuid4()),
            "tramite_id": cita.tramite_id,
            "fecha": str(cita.fecha),
            "hora": cita.hora,
            "estado": "pendiente",
        }
        _citas_db.append(nueva)
        reservar_slot(cita.tramite_id, str(cita.fecha), cita.hora)
        return nueva
    result = supabase.table("citas").insert({
        "tramite_id": cita.tramite_id,
        "fecha": str(cita.fecha),
        "hora": cita.hora,
        "estado": "pendiente",
    }).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Error al crear la cita")
    return result.data[0]

@router.post("/{cita_id}/archivos")
def agregar_archivo(cita_id: str, archivo: ArchivoCreate):
    if USE_MOCK:
        nuevo = {
            "id": str(uuid.uuid4()),
            "cita_id": cita_id,
            "nombre": archivo.nombre,
            "url": archivo.url,
        }
        _archivos_db.append(nuevo)
        return nuevo
    result = supabase.table("archivos_cita").insert({
        "cita_id": cita_id,
        "nombre": archivo.nombre,
        "url": archivo.url,
    }).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Error al guardar el archivo")
    return result.data[0]
