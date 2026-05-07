from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import tramites, disponibilidad, citas

app = FastAPI(title="Municipalidad Santo Domingo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4173", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tramites.router, prefix="/tramites", tags=["tramites"])
app.include_router(disponibilidad.router, prefix="/disponibilidad", tags=["disponibilidad"])
app.include_router(citas.router, prefix="/citas", tags=["citas"])
