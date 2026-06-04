# Municipalidad Santo Domingo — Plataforma de Trámites

## Integrantes

- Felipe Astudillo
- Martina Sandoval
- Daniel Cornejo
- Diego Zúñiga

Aplicación web y móvil para gestionar trámites municipales: agendamiento de horas, subida de documentos e historial de citas.

**Stack:** React 19 + Ionic 8 + TypeScript · Node.js + Express (backend) · Supabase (base de datos, autenticación y storage)

---

## Justificación del proyecto y usuario objetivo

Este proyecto está creado para que la municipalidad pueda gestionar de mejor manera los trámites que se puedan realizar, uno de los mayores problemas que se presentaban era que habían escasos trámites que se podían gestionar por la web de la municipalidad, por ello se realiza este proyecto de página web de los trámites de la municipalidad, para que las personas (y funcionarios municipales) de la comuna de Santo Domingo puedan, de mejor manera, realizar sus trámites online en la medida de lo posible, con una interfaz intuitiva y que no sea difícil.

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
| RF-08 | Funcionario / Jefe de Sucursal | Gestión de capacidad y bloqueos | El funcionario puede bloquear días o franjas horarias específicas por feriados, mantenimiento o ausencia de personal. | Los días bloqueados se aplican de inmediato al calendario visible por los usuarios. |
| RF-09 | Jefe de Sucursal | Exportación de nóminas diarias | El sistema genera automáticamente listas de asistencia diaria en formato PDF o Excel con los datos clave de cada postulante agendado para ese día. | El jefe de sucursal puede descargar la nómina del día en cualquiera de los dos formatos con todos los campos requeridos. |
| RF-10 | Funcionario | Buscador y editor de citas | El funcionario puede buscar a un usuario por RUT, modificar su hora agendada o registrar asistencia manual. | El funcionario encuentra al usuario por RUT y puede editar o registrar su cita sin errores. |
| RF-11 | Jefe de Sucursal | Configuración de reglas de negocio | El jefe de sucursal puede editar parámetros del sistema como la duración de cada tipo de trámite y el número máximo de cupos por día. | Los cambios en los parámetros se aplican al flujo de agendamiento de forma inmediata. |

---

### 2. Requerimientos No Funcionales

| ID | Categoría | Nombre | Descripción | Criterio de Aceptación |
|---|---|---|---|---|
| RNF-01 | Usabilidad | Interfaz intuitiva para todo rango etario | La interfaz debe ser clara y fácil de operar para usuarios de todas las edades, usando textos legibles, botones de tamaño adecuado, iconografía de apoyo y un flujo de agendamiento guiado paso a paso sin ambigüedades. | Un usuario mayor de 60 años sin experiencia previa puede completar el flujo de agendamiento sin asistencia en su primer intento. |
| RNF-02 | Accesibilidad | Cumplimiento de estándares de accesibilidad web | El sistema debe cumplir con las pautas WCAG 2.1 nivel AA, garantizando contraste de colores suficiente, navegación por teclado, etiquetas descriptivas en formularios y compatibilidad con lectores de pantalla. | La aplicación supera una auditoría de accesibilidad automatizada (Lighthouse) con puntaje igual o superior a 90 en la categoría Accessibility. |
| RNF-03 | Rendimiento | Soporte de carga concurrente | El sistema debe mantener tiempos de respuesta aceptables con al menos 100 usuarios activos simultáneamente, sin degradación visible en la carga de páginas ni en el proceso de agendamiento. | Bajo una prueba de carga de 100 usuarios concurrentes, el tiempo de respuesta promedio del servidor no supera los 3 segundos y no se registran errores de disponibilidad. |

---

## Sistema de roles

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| `usuario` | Ciudadano registrado | Ver trámites, agendar citas, subir archivos, ver su historial |
| `funcionario` | Trabaja en una sucursal | Todo lo anterior + ver y gestionar citas de su sucursal, configurar horarios y bloquear horas |
| `jefe_sucursal` | Administra una sucursal | Todo lo anterior + crear/editar trámites de su sucursal, registrar funcionarios y asignarlos |

El login se realiza con **RUT + contraseña**. La autenticación usa JWT generados por Supabase Auth.

---

## Arquitectura de navegación

### Rutas de la aplicación

| Ruta | Tipo | Vista |
|------|------|-------|
| `/` | Pública | Redirige a `/login` |
| `/login` | Pública | Inicio de sesión (RUT + contraseña) |
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

Se usa **React Router v5** integrado con `IonReactRouter` de Ionic para mantener las transiciones nativas entre páginas. La protección de rutas se implementa con un componente `PrivateRoute` que verifica el estado de sesión y el rol del usuario via `AuthContext` antes de renderizar cada vista privada. El token JWT se almacena en `localStorage` y se envía como `Authorization: Bearer <token>` en cada request al backend. La autenticación es gestionada por **Supabase Auth**; el backend valida los tokens con `supabase.auth.getUser()`.

---

## Prototipo UI/UX

- Enlace a los prototipos de interfaz realizados en [Figma](https://www.figma.com/design/ikeziWl6CLsrR7cKTlQgBP/Mockups-Web?node-id=0-1&t=ehR0DXmXJuPjZbjl-1)

---

## Estructura del proyecto

```
Proyecto-Web-y-Movil/
├── src/                          # Frontend React + Ionic
│   ├── pages/                    # Vistas principales
│   │   ├── LoginPage/
│   │   ├── RegisterPage/
│   │   ├── Tramites/
│   │   ├── DetalleTramite/
│   │   ├── AgendarHora/
│   │   ├── SubirArchivos/
│   │   └── HistorialTramites/
│   ├── components/               # Componentes reutilizables
│   ├── routes/                   # Rutas y protección de vistas
│   ├── services/                 # Comunicación con APIs
│   │   ├── api.ts                # Llamadas al backend Node.js
│   │   └── supabase.ts           # Cliente Supabase (storage)
│   ├── contexts/                 # Estado global (React Context)
│   │   ├── AuthContext.tsx        # Sesión, token y rol del usuario
│   │   └── CitasContext.tsx       # Estado de slots bloqueados en sesión
│   ├── types/                    # Interfaces TypeScript
│   └── theme/
├── backend-node/                 # Servidor backend (Node.js + Express)
│   ├── src/
│   │   ├── config/db.js          # Conexión Supabase
│   │   ├── controllers/          # Lógica de negocio por recurso
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js  # Validación JWT y control de roles
│   │   │   └── errorHandler.js   # Manejo centralizado de errores
│   │   ├── routes/               # Definición de endpoints
│   │   │   ├── auth.js           # /auth/registro, /auth/login, /auth/me
│   │   │   ├── tramites.js
│   │   │   ├── citas.js
│   │   │   ├── disponibilidad.js
│   │   │   └── sucursales.js
│   │   └── app.js                # Express + middlewares + rutas
│   ├── supabase/
│   │   ├── schema.sql            # Schema de la BD (ejecutar en Supabase)
│   │   ├── seed.sql              # Datos iniciales (sucursales y trámites)
│   │   └── reset.sql             # Limpieza total (¡cuidado!)
│   ├── server.js                 # Entry point
│   └── package.json
└── .env                          # Variables del frontend (no commitear)
```

---

## Requisitos previos

- [Node.js](https://nodejs.org) v18 o superior
- Proyecto en [Supabase](https://supabase.com) con las tablas creadas (ver `backend-node/supabase/schema.sql`)

---

## Configuración

### 1. Variables de entorno del backend

Crea el archivo `backend-node/.env`:

```env
PORT=8000
NODE_ENV=development

SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_KEY=sb_secret_...
SUPABASE_ANON_KEY=sb_publishable_...

CORS_ORIGIN=http://localhost:5173
```

### 2. Variables de entorno del frontend

Crea el archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
```

### 3. Base de datos

Si es la primera vez que configuras el proyecto, ejecuta los siguientes archivos SQL en el **SQL Editor de Supabase** en este orden:

1. `backend-node/supabase/schema.sql` — crea las tablas y el trigger de registro
2. `backend-node/supabase/seed.sql` — inserta sucursales y trámites iniciales

---

## Instalación y ejecución

Necesitas dos terminales abiertas.

```bash
# Terminal 1 — Backend
cd backend-node
npm install
npm run dev          # http://localhost:8000

# Terminal 2 — Frontend
npm install
npm run dev          # http://localhost:5173
```

---

## Endpoints del backend

### Autenticación (públicos)

| Método | URL | Descripción |
|--------|-----|-------------|
| POST | `/auth/registro` | Crear cuenta (email, password, nombre, rut, ...) |
| POST | `/auth/login` | Iniciar sesión (rut, password) → devuelve JWT |
| GET | `/auth/me` | Perfil del usuario autenticado |

### Trámites (públicos)

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/tramites/` | Lista todos los trámites activos |
| GET | `/tramites/:id` | Detalle de un trámite |
| GET | `/disponibilidad/:tramiteId/:fecha` | Slots horarios disponibles |

### Citas (requieren JWT)

| Método | URL | Roles | Descripción |
|--------|-----|-------|-------------|
| POST | `/citas` | usuario, funcionario, jefe_sucursal | Crear una nueva cita |
| GET | `/citas/mis-citas` | todos | Historial de citas del usuario autenticado |
| GET | `/citas/tramite/:id` | funcionario, jefe_sucursal | Citas de un trámite (filtrable por fecha) |
| PUT | `/citas/:id/estado` | funcionario, jefe_sucursal | Actualizar estado de una cita |
| POST | `/citas/:id/archivos` | todos | Registrar archivo adjunto a una cita |

# Pruebas

Las pruebas estan realizadas en Postman, se utilizan las siguientes variables de entorno:

| Variable | Valor |
|-|---------|
|`base_url`|`http://localhost:8000`|
|`token`|(Vacio)|

Se usa el siguiente script en post-request para `login` y `registro`:

```js
const json = pm.response.json();
if (json.token) pm.environment.set("token", json.token);
pm.test("Status correcto", () => pm.expect(pm.response.code).to.be.oneOf([200, 201]));
```

Agregar header en caso de rutas protegidas

```
Authorization: Bearer {{token}}
Content-Type: application/json
```


### Casos cubiertos:

| 1|Endpoint | Escenario | Codigo esperado |
|-|---------|------|---------|
| 1|`POST /auth/registro`   | Datos completos y validos   | 201 |
| 2|`POST /auth/registro`     | Email duplicado   | 409    |
| 3|`POST /auth/registro`   | Sin campo rut   | 400 |
| 4|`POST /auth/login`     | RUT y password correctos   | 200    |
| 5|`POST /auth/login`   | Password incorrecta   | 401 |
| 6|`POST /auth/login`   | RUT no existe   | 401 |
| 7|`GET /auth/me`     | Token válido   | 200    |
| 8|`GET /auth/me`   | Sin campo rut   | 400 |
| 9|`GET /auth/me`     | Token manipulado   | 401    |
| 10|`POST /citas`   | Campos completos, autenticado   | 201 |
| 11|`POST /citas`   | Sin fecha   | 400 |
| 12|`GET /citas/mis-citas`     | Usuario autenticado   | 200    |
| 13|`PUT /citas/:id/estado`   | Estado confirmado, rol funcionario   | 200 |
| 14|`PUT /citas/:id/estado`| Estado aprobado   | 400    |
| 15|`GET /citas/tramite/:id`   | Rol ciudadano (sin permisos)   | 403 |
| 16|`POST /tramites`   | Sin autenticacion   | 201 |
| 17|`GET /tramites`     | Publico, sin token   | 200    |
| 18|`GET /disponibilidad/:id/:fecha`   | Fecha con horarios configurados   | 200 |
