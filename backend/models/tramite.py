from pydantic import BaseModel
from typing import List, Optional

class Tramite(BaseModel):
    id: str
    nombre: str
    descripcion: Optional[str] = None
    costo: Optional[str] = "Gratuito"
    departamento: Optional[str] = None
    es_en_linea: Optional[bool] = True
    documentos_requeridos: Optional[List[str]] = []
