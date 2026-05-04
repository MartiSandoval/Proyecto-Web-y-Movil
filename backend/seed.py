import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from db import supabase

tramites = [
    {
        "id": "tramite-id-1",
        "nombre": "Inscripción descuento en la compra de gas",
        "descripcion": "La Ilustre Municipalidad de Santo Domingo le apoya para acceder a un descuento en la compra de su gas domiciliario Gasco o Lipigas.",
        "costo": "Gratuito",
        "departamento": "Oficina de Desarrollo Social",
        "es_en_linea": True,
        "documentos_requeridos": ["Cédula de identidad", "Comprobante de domicilio", "Última boleta de gas"],
    },
    {
        "id": "tramite-id-2",
        "nombre": "Subsidio al pago del Derecho de Aseo",
        "descripcion": "Solicita la rebaja o exención total del pago por derechos de aseo municipal según tu calificación socioeconómica.",
        "costo": "Gratuito",
        "departamento": "Departamento de Aseo y Ornato",
        "es_en_linea": True,
        "documentos_requeridos": ["Cédula de identidad", "Informe socioeconómico", "Certificado de residencia"],
    },
    {
        "id": "tramite-id-3",
        "nombre": "Subsidio de Agua Potable",
        "descripcion": "Obtén un beneficio económico para financiar parte del costo de tu boleta de agua potable y alcantarillado.",
        "costo": "Gratuito",
        "departamento": "Oficina de Desarrollo Social",
        "es_en_linea": True,
        "documentos_requeridos": ["Cédula de identidad", "Última boleta de agua", "Foto carnet"],
    },
]

result = supabase.table("tramites").upsert(tramites).execute()
print(f"Trámites insertados: {len(result.data)}")
