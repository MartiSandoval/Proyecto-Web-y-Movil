from fastapi import APIRouter, HTTPException
from db import USE_MOCK, supabase
from mock_data import TRAMITES

router = APIRouter()

@router.get("/")
def get_tramites():
    if USE_MOCK:
        return TRAMITES
    result = supabase.table("tramites").select("*").execute()
    return result.data

@router.get("/{tramite_id}")
def get_tramite(tramite_id: str):
    if USE_MOCK:
        tramite = next((t for t in TRAMITES if t["id"] == tramite_id), None)
        if not tramite:
            raise HTTPException(status_code=404, detail="Trámite no encontrado")
        return tramite
    result = supabase.table("tramites").select("*").eq("id", tramite_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Trámite no encontrado")
    return result.data
