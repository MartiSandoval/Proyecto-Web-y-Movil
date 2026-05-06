from fastapi import APIRouter, HTTPException
from db import supabase

router = APIRouter()

@router.get("/{tramite_id}")
def get_tramite(tramite_id: str):
    result = supabase.table("tramites").select("*").eq("id", tramite_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Trámite no encontrado")
    return result.data

@router.get("/")
def get_tramites():
    result = supabase.table("tramites").select("*").execute()
    return result.data
