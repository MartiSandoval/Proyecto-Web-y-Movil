from pydantic import BaseModel
from typing import Optional
from datetime import date, time

class CitaCreate(BaseModel):
    tramite_id: str
    fecha: date
    hora: str

class ArchivoCreate(BaseModel):
    nombre: str
    url: str
