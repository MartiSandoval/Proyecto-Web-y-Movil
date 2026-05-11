# Municipalidad Santo Domingo — Plataforma de Trámites

Aplicación web y móvil para gestionar trámites municipales: agendamiento de horas, subida de documentos e historial de citas.

**Stack:** React 19 + Ionic 8 + TypeScript · FastAPI + Python (backend) · Supabase (base de datos y storage)

---

## Justificación del proyecto y usuario objetivo

Este proyecto está creado para que la municipalidad pueda gestionar de mejor manera los trámites que se puedan realizar, uno de los mayores problemas que se presentaban era que habían escasos trámites que se podían gestionar por la web de la municipalidad, por ello se realiza este proyecto de página web de los trámites de la municipalidad, para que las personas de la comuna de Santo Domingo puedan, de mejor manera, realizar sus trámites online en la medida de lo posible, con una interfaz intuitiva y que no sea difícil.

---

## Requerimientos

Por completar aca, funcionales y no funcionales.

---

## Arquitectura de navegación

### Rutas de la aplicación

| Ruta | Tipo | Vista |
|------|------|-------|
| `/` | Pública | Redirige a `/login` |
| `/login` | Pública | Inicio de sesión |
| `/registro` | Pública | Registro de usuario |
| `/tramites` | Protegida | Listado de trámites y servicios |
| `/tramite/:id/detalle` | Protegida | Detalle de un trámite |
| `/tramite/:id/agendar` | Protegida | Selección de fecha y hora |
| `/tramite/:id/subir` | Protegida | Subida de documentos requeridos |
| `/historial` | Protegida | Historial de citas del usuario |

Las rutas protegidas requieren sesión activa. Sin sesión, el usuario es redirigido automáticamente a `/login`.

### Flujo de navegación principal

```
[Login / Registro]
        ↓
[Listado de Trámites]  ←─── [Historial de Citas]
        ↓
[Detalle del Trámite] 
        ↓
[Agendar Hora]
        ↓
[Subir Documentos]
        ↓
[Confirmación]
```

### Diferenciación por roles

- **Usuario:** acceso a trámites, agendamiento, subida de archivos e historial personal.
- **Admin:** _(por implementar en entregas posteriores)_ gestión de trámites, disponibilidad y citas.

### Jerarquía de vistas

```
App
├── Rutas públicas
│   ├── LoginPage
│   └── RegisterPage
└── Rutas protegidas (requieren sesión)
    ├── Tramites (vista raíz del usuario autenticado)
    │   └── DetalleTramite
    │       └── AgendarHora
    │           └── SubirArchivos
    └── HistorialTramites
```

### Justificación técnica

Se usa **React Router v5** integrado con `IonReactRouter` de Ionic para mantener las transiciones nativas entre páginas. La protección de rutas se implementa con un componente `ProtectedRoute` que verifica el estado de sesión en `localStorage` antes de renderizar cada vista privada, garantizando que el flujo de login sea obligatorio. La navegación programática se realiza con el hook `useHistory`. Esta arquitectura permite escalar fácilmente hacia roles diferenciados (usuario/admin) agregando lógica de rol en `ProtectedRoute`.

---

## Prototipo UI/UX

Aqui agregar el enlance al figma

---

## Estructura del proyecto

```
src/
├── pages/              # Vistas principales de la aplicación
│   ├── LoginPage/
│   ├── RegisterPage/
│   ├── Tramites/
│   ├── DetalleTramite/
│   ├── AgendarHora/
│   ├── SubirArchivos/
│   └── HistorialTramites/
├── components/         # Componentes reutilizables
│   ├── Header/
│   ├── HeaderTop/
│   ├── AccessibilityMenu/
│   ├── CalendarPicker/
│   ├── TimeSlotGrid/
│   ├── FileUploadZone/
│   └── NavButtons/
├── routes/             # Configuración de rutas y protección
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
├── services/           # Comunicación con APIs externas
│   ├── api.ts          # Llamadas al backend FastAPI
│   └── supabase.ts     # Cliente Supabase (storage)
├── contexts/           # Estado global (React Context)
│   └── CitasContext.tsx
├── types/              # Interfaces TypeScript
│   └── tramite.ts
└── theme/
    └── variables.css
```

---

## Requisitos previos

- [Node.js](https://nodejs.org) v18 o superior (incluye npm)

---

## Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/MartiSandoval/Proyecto-Web-y-Movil.git
cd Proyecto-Web-y-Movil

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev
```

Abre el navegador en: `http://localhost:5173`

> **Nota:** La aplicación incluye datos mock integrados. Funciona sin backend ni Supabase configurados.

---

## Variables de entorno (opcionales)

Solo necesarias si se conecta al backend real:

```
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Crear el archivo `.env.local` en la raíz con estos valores. Sin ellos, la app usa datos mock automáticamente.
