# Municipalidad Santo Domingo — Plataforma de Trámites

Aplicación web y móvil para gestionar trámites municipales: agendamiento de horas, subida de documentos e historial de citas.

**Stack:** React 19 + Ionic 8 + TypeScript · FastAPI + Python (backend) · Supabase (base de datos y storage)

---

## Justificación del proyecto y usuario objetivo

Este proyecto está creado para que la municipalidad pueda gestionar de mejor manera los trámites que se puedan realizar, uno de los mayores problemas que se presentaban era que habían escasos trámites que se podían gestionar por la web de la municipalidad, por ello se realiza este proyecto de página web de los trámites de la municipalidad, para que las personas (y funcionarios municipales que actúan de administradores) de la comuna de Santo Domingo puedan, de mejor manera, realizar sus trámites online en la medida de lo posible, con una interfaz intuitiva y que no sea difícil.

---

## Requerimientos

### 1. Requerimientos Funcionales

| ID | Rol | Nombre | Descripción | Criterio de Aceptación |
|---|---|---|---|---|
| RF-01 | Usuario | Agendar hora | El usuario puede agendar una hora seleccionando el tipo de examen (Licencia Clase A, B, etc.) e indicando si es primera vez o renovación. | Al confirmar, la cita queda registrada en el sistema con todos los datos del examen seleccionado. |
| RF-02 | Usuario | Gestión de la reserva | El usuario puede modificar o cancelar una cita previamente agendada desde su panel personal. | El usuario puede cambiar fecha, hora o tipo de examen, o cancelar la cita, y los cambios se reflejan de inmediato en el sistema. |
| RF-03 | Usuario | Visualización del historial | El sistema muestra el registro completo de exámenes agendados por el usuario, con el detalle de cada trámite. | El historial lista todas las citas del usuario ordenadas cronológicamente con sus datos completos visibles. |
| RF-04 | Usuario | Seguimiento de estado del examen | El usuario puede consultar el estado actualizado de su trámite (Aprobado, Rechazado, En Proceso) para el proceso de entrega de licencia. | El estado del trámite se muestra correctamente en el perfil del usuario y se actualiza cuando el administrador realiza cambios. |
| RF-05 | Usuario | Lista de espera | Si no hay disponibilidad en las fechas deseadas, el usuario puede unirse a una lista de espera y recibe una notificación automática si se libera un cupo. | Al liberarse un cupo, el sistema notifica automáticamente al primer usuario en lista de espera para ese bloque horario. |
| RF-06 | Usuario | Validación de identidad | El sistema integra validación por RUT para garantizar que cada persona pueda tener solo una hora vigente a la vez. | Un RUT con cita activa no puede agendar una segunda hora hasta cancelar o completar la existente. |
| RF-07 | Usuario | Modificación de datos de contacto | El usuario puede actualizar su correo electrónico, número de teléfono u otros datos de contacto desde su perfil. | Los nuevos datos quedan guardados y se usan en las notificaciones siguientes. |
| RF-08 | Administrador | Gestión de capacidad y bloqueos | El administrador puede configurar el número de cupos por bloque horario y bloquear días específicos por feriados, mantenimiento o ausencia de personal. | Los días bloqueados y los cupos configurados se aplican de inmediato al calendario visible por los usuarios. |
| RF-09 | Administrador | Exportación de nóminas diarias | El sistema genera automáticamente listas de asistencia diaria en formato PDF o Excel con los datos clave de cada postulante agendado para ese día. | El administrador puede descargar la nómina del día en cualquiera de los dos formatos con todos los campos requeridos. |
| RF-10 | Administrador | Buscador y editor de citas | El administrador puede buscar a un usuario por RUT, modificar su hora agendada o registrar asistencia manual para personas sin acceso a internet. | El administrador encuentra al usuario por RUT en menos de 3 segundos y puede editar o registrar su cita sin errores. |
| RF-11 | Administrador | Configuración de reglas de negocio | El administrador puede editar parámetros del sistema como la duración de cada tipo de examen y el número máximo de renovaciones permitidas por día. | Los cambios en los parámetros se aplican al flujo de agendamiento de forma inmediata sin necesidad de reiniciar el sistema. |

---

### 2. Requerimientos No Funcionales

| ID | Categoría | Nombre | Descripción | Criterio de Aceptación |
|---|---|---|---|---|
| RNF-01 | Usabilidad | Interfaz intuitiva para todo rango etario | La interfaz debe ser clara y fácil de operar para usuarios de todas las edades, usando textos legibles, botones de tamaño adecuado, iconografía de apoyo y un flujo de agendamiento guiado paso a paso sin ambigüedades. | Un usuario mayor de 60 años sin experiencia previa puede completar el flujo de agendamiento (seleccionar examen, fecha y hora) sin asistencia en su primer intento. |
| RNF-02 | Accesibilidad | Cumplimiento de estándares de accesibilidad web | El sistema debe cumplir con las pautas WCAG 2.1 nivel AA, garantizando contraste de colores suficiente, navegación por teclado, etiquetas descriptivas en formularios y compatibilidad con lectores de pantalla. | La aplicación supera una auditoría de accesibilidad automatizada (Lighthouse) con puntaje igual o superior a 90 en la categoría Accessibility. |
| RNF-03 | Rendimiento | Soporte de carga concurrente | El sistema debe mantener tiempos de respuesta aceptables con al menos 100 usuarios activos simultáneamente, sin degradación visible en la carga de páginas ni en el proceso de agendamiento. | Bajo una prueba de carga de 100 usuarios concurrentes, el tiempo de respuesta promedio del servidor no supera los 3 segundos y no se registran errores de disponibilidad. |


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

- Enlace a los prototipos de interfaz realizados en [Figma](https://www.figma.com/design/ikeziWl6CLsrR7cKTlQgBP/Mockups-Web?node-id=0-1&t=ehR0DXmXJuPjZbjl-1)

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
