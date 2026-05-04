from fastapi import APIRouter, HTTPException
from db import supabase
from models.cita import CitaCreate, ArchivoCreate

router = APIRouter()

@router.post("/")
def crear_cita(cita: CitaCreate):
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
    result = supabase.table("archivos_cita").insert({
        "cita_id": cita_id,
        "nombre": archivo.nombre,
        "url": archivo.url,
    }).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Error al guardar el archivo")
    return result.data[0]
