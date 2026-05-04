# Municipalidad Santo Domingo — Web de Trámites

Aplicación web para agendar horas en trámites municipales.

**Stack:** React 19 + Ionic 8 + TypeScript (frontend) · FastAPI + Python (backend) · Supabase (base de datos y storage)

---

## Requisitos previos

Tener instalado en tu máquina:

- [Node.js](https://nodejs.org) v18 o superior (incluye npm)
- [Python](https://python.org) 3.10 o superior
- Acceso al proyecto en [Supabase](https://supabase.com) (pedir credenciales al equipo)

---

## 1. Clonar el repositorio

```bash
git clone https://github.com/MartiSandoval/Proyecto-Web-y-Movil.git
cd Proyecto-Web-y-Movil
```

---

## 2. Configurar variables de entorno

Necesitas crear **dos archivos** con las credenciales del proyecto. Pídele al equipo los valores reales.

### Frontend — `.env.local` (en la raíz del proyecto)

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...anon-key...
VITE_API_URL=http://localhost:8000
```

### Backend — `backend/.env`

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJ...service-role-key...
```

> **Importante:** Estos archivos contienen claves secretas. Nunca los subas al repositorio (ya están en `.gitignore`).

---

## 3. Instalar dependencias del frontend

Desde la raíz del proyecto:

```bash
npm install
```

---

## 4. Configurar el entorno Python (backend)

Desde la raíz del proyecto:

```bash
# Crear entorno virtual
python -m venv venv

# Activarlo (Windows PowerShell)
venv\Scripts\Activate.ps1

# Activarlo (Mac / Linux)
source venv/bin/activate

# Instalar paquetes
pip install fastapi "uvicorn[standard]" supabase python-multipart pydantic python-dotenv
```

---

## 5. Ejecutar el proyecto

Necesitas **dos terminales** abiertas al mismo tiempo.

### Terminal 1 — Frontend

```bash
npm run dev
```

Abre el navegador en: `http://localhost:4173`

### Terminal 2 — Backend

```bash
# Activar el entorno virtual primero
venv\Scripts\Activate.ps1        # Windows
# source venv/bin/activate       # Mac / Linux

# Arrancar el servidor
uvicorn main:app --reload --app-dir backend
```

La API queda disponible en `http://localhost:8000`
Documentación automática (Swagger): `http://localhost:8000/docs`

---

## 6. Solo la primera vez — Cargar datos de prueba en Supabase

Si la base de datos está vacía, ejecuta el seed para insertar los trámites de ejemplo:

```bash
# Con el venv activo, desde la raíz del proyecto
cd backend
python seed.py
cd ..
```

Esto inserta 3 trámites de prueba en Supabase. Solo hace falta hacerlo una vez.

---

## Estructura del proyecto

```
Proyecto-Web-y-Movil/
├── backend/                  # API FastAPI (Python)
│   ├── main.py               # Servidor principal
│   ├── db.py                 # Cliente Supabase
│   ├── seed.py               # Datos de prueba
│   ├── routers/              # Endpoints por recurso
│   │   ├── tramites.py
│   │   ├── disponibilidad.py
│   │   └── citas.py
│   ├── models/               # Modelos Pydantic
│   └── .env                  # Credenciales backend (NO subir al repo)
├── src/
│   ├── Tramites/             # Página principal (lista de trámites)
│   ├── pages/
│   │   ├── DetalleTramite/   # Detalle de un trámite
│   │   ├── AgendarHora/      # Calendario y selección de horario
│   │   └── SubirArchivos/    # Subida de documentos
│   ├── components/
│   │   ├── CalendarPicker/   # Componente de calendario
│   │   ├── TimeSlotGrid/     # Grid de horarios disponibles
│   │   ├── FileUploadZone/   # Zona drag-and-drop de archivos
│   │   └── NavButtons/       # Botones "Atrás / Guardar y Continuar"
│   ├── lib/
│   │   ├── api.ts            # Llamadas al backend FastAPI
│   │   └── supabase.ts       # Cliente Supabase (frontend)
│   └── types/
│       └── tramite.ts        # Interfaces TypeScript
├── .env.local                # Credenciales frontend (NO subir al repo)
├── package.json
└── vite.config.ts
```

---

## Flujo de usuario implementado

```
Trámites y Servicios  →  Ver Detalle  →  Agendar Hora  →  Subir Archivos  →  Confirmación
```

---

## Tablas en Supabase

Si necesitas crear las tablas desde cero (base de datos vacía), ejecuta este SQL en el **SQL Editor** de Supabase:

```sql
CREATE TABLE tramites (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  costo TEXT DEFAULT 'Gratuito',
  departamento TEXT,
  es_en_linea BOOLEAN DEFAULT true,
  documentos_requeridos TEXT[]
);

CREATE TABLE disponibilidad (
  id SERIAL PRIMARY KEY,
  tramite_id TEXT REFERENCES tramites(id),
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  disponible BOOLEAN DEFAULT true,
  UNIQUE(tramite_id, fecha, hora)
);

CREATE TABLE citas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tramite_id TEXT REFERENCES tramites(id),
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  estado TEXT DEFAULT 'pendiente',
  creado_en TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE archivos_cita (
  id SERIAL PRIMARY KEY,
  cita_id UUID REFERENCES citas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  url TEXT NOT NULL,
  creado_en TIMESTAMPTZ DEFAULT now()
);
```

También crear un bucket de Storage llamado **`citas-archivos`** (público) en Supabase → Storage.
