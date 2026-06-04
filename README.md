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
Actualmente, la Municipalidad de Santo Domingo enfrenta un grave déficit en la digitialización de sus trámites. Esta carencia obliga a la ciudadanía a acudir presencialmente para agendar sus citas, exigiendo a las personas invertir tiempo extra en trasladarse, solicitar la atención y esperar para que le den una hora (en caso de que le den una). El principal problema radica en la falta de opciones para realizar estas solicitudes vía web, lo que genera distintas consecuencias negativas:

- Para la ciudadanía: Congestión en las sucursales físicas, pérdida de tiempo y frustación debido a la falta de claridad en los documentos que se necesitan, las pocas horas disponibles o la modificación/cancelación de estas sin un motivo concreto.
- Para el municipio: Existe una sobrecarga para los funcionarios, lo que dificulta la gestión eficiente de las citas, la mezcla de todos los documentos (físicos y digitales).

Por lo tanto, este proyecto busca solucionar esta problemática mediante el desarrollo de una página web intuitiva y fácil de usar para todo tipo de usuarios (desde jovenes hasta adultos mayores) centrada principalmente en agendar, gestionar y hacer un seguimiento de los trámites en línea. De este modo, se espera optimizar los recursos municipales, mejorar la eficiencia en los servicioes y dar una respuesta a las necesidades de los usuarios.

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

(El RUT ya no tiene que existir necesariamente, puede ser cualquiera que cumpla con la validación básica)

(Hasta el momento en el proyecto solo se ve reflejado el rol de usuario con sus respectivas funciones, el rol de funcionario y jefe de surcursal aún no estan implementados).

---

## Arquitectura de navegación

El sistema diferencia dos flujos de navegación según el rol del usuario autenticado: el flujo del **ciudadano** (rol `usuario`) centrado en el agendamiento de trámites, y el flujo del **personal municipal** (roles `funcionario` y `jefe_sucursal`) orientado a la gestión de citas. Ambos flujos comparten el punto de entrada (login/registro) pero divergen inmediatamente después en función del rol detectado.

---

### Rutas de la aplicación

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Pública | Redirige automáticamente a `/login` |
| `/login` | Pública | Inicio de sesión con RUT + contraseña |
| `/registro` | Pública | Registro de nueva cuenta ciudadana |
| `/tramites` | Autenticado (todos los roles) | Listado de trámites municipales disponibles |
| `/tramite/:id/detalle` | Autenticado (todos los roles) | Detalle de un trámite específico |
| `/tramite/:id/agendar` | Autenticado (todos los roles) | Selección de fecha y slot horario |
| `/tramite/:id/subir` | Autenticado (todos los roles) | Subida de documentos y confirmación de cita |
| `/historial` | Autenticado (todos los roles) | Historial de citas del usuario autenticado |
| `/panel-funcionario` | Solo `funcionario` y `jefe_sucursal` | Panel de gestión de citas por sucursal |

Las rutas protegidas requieren sesión activa; sin sesión el usuario es redirigido a `/login`. Las rutas con restricción de rol redirigen a `/tramites` si el rol no coincide, sin exponer la existencia de la ruta restringida.

---

### Flujo del ciudadano (rol `usuario`)

El flujo completo desde el acceso inicial hasta la confirmación de la cita, incluyendo puntos de decisión y desvíos posibles:

![Flujo del Ciudadano](docs/flujo-ciudadano.png)

---

### Flujo del funcionario y jefe de sucursal

El flujo del personal municipal diverge tras el login según el rol asignado al perfil:

![Flujo del Funcionario](docs/flujo-funcionario.png)

---

### Puntos críticos de interacción y coherencia

| Punto | Descripción |
|-------|-------------|
| **Autenticación con RUT** | El login opera con RUT (no email). El backend localiza el perfil por RUT, verifica la contraseña con `bcrypt.compare()` y delega la generación del JWT a Supabase Auth. RUT inexistente o contraseña incorrecta devuelven 401 sin distinguir cuál falló, evitando enumeración de usuarios. |
| **Verificación de disponibilidad** | Los slots horarios se generan en tiempo real combinando tres fuentes: `horarios_tramite` (horario base por día de semana), `bloqueos_horario` (días u horas inhabilitadas por funcionarios) y `citas` existentes con estado distinto de `cancelado`. Solo se presentan los slots realmente libres. |
| **Control de acceso por rol** | `PrivateRoute` intercepta cada navegación antes de renderizar. Sin sesión → redirige a `/login`. Con rol insuficiente → redirige a `/tramites`. El backend replica la misma validación de rol de forma independiente como segunda capa de seguridad. |
| **Subida de documentos** | La carga es asíncrona con barra de progreso individual por archivo. Los archivos se almacenan en Supabase Storage y solo cuando todos están cargados correctamente se habilita la confirmación de la cita. |
| **Transición de estado de cita** | Las citas siguen la secuencia `pendiente → confirmado → completado` o pueden ser `cancelado` en cualquier punto. Solo `funcionario` y `jefe_sucursal` pueden modificar estados vía `PUT /citas/:id/estado`; el backend valida JWT y rol antes de procesar. |
| **Coherencia de sesión** | Al iniciar la app, `AuthProvider` recupera el token de `localStorage` y lo valida con `GET /auth/me`. Si el token expiró o fue alterado, se elimina automáticamente y el usuario es redirigido a `/login` sin intervención manual. |

---

### Jerarquía de vistas

```
App
├── Rutas públicas
│   ├── LoginPage
│   └── RegisterPage
└── Rutas protegidas (requieren sesión activa)
    ├── Tramites                        ← vista raíz para todos los roles
    │   └── DetalleTramite
    │       └── AgendarHora
    │           └── SubirArchivos
    ├── HistorialTramites
    └── PanelFuncionario                ← exclusivo: funcionario / jefe_sucursal
```

---

### Justificación técnica

**React Router v5 + IonReactRouter.**
Se usa React Router v5 (no v6) por compatibilidad estricta con `IonReactRouter` de Ionic 8, que envuelve el router para inyectar las transiciones de página nativas (slide entre pantallas, fade en modales) propias de aplicaciones móviles. Migrar a v6 rompería estas animaciones porque la API de renderizado de rutas cambió de forma incompatible.

**Componente `PrivateRoute` centralizado.**
En lugar de proteger cada vista individualmente con lógica duplicada, se encapsula el control de acceso en un único componente de orden superior (HOC). Cualquier cambio en la política de autenticación o roles se aplica desde un único punto sin tocar cada página. El componente encadena tres verificaciones en orden: carga inicial → autenticación → rol, garantizando que nunca se renderice contenido protegido antes de que el estado de sesión esté resuelto.

**`AuthContext` (React Context API) en lugar de Redux o Zustand.**
El estado de autenticación necesita ser accesible en tres niveles: rutas (`PrivateRoute`), componentes de layout (`Header`) y páginas individuales. Context API cubre exactamente este alcance sin el boilerplate de un store global. Introducir Redux o Zustand solo para gestionar el usuario autenticado sería sobredimensionar la solución para el problema actual.

**JWT almacenado en `localStorage`.**
Se eligió `localStorage` sobre cookies de sesión porque Capacitor —la capa de empaquetado que permite generar la app para iOS y Android— no gestiona cookies HTTP entre el WebView nativo y el servidor de la misma forma que un navegador de escritorio. `localStorage` es accesible de manera uniforme desde el WebView de Capacitor en todas las plataformas objetivo sin configuración adicional.

**Redirección silenciosa en caso de rol insuficiente.**
Cuando un usuario intenta acceder a una ruta para la que no tiene permisos, `PrivateRoute` lo redirige a `/tramites` en lugar de mostrar una página de error 403. Esta decisión tiene dos motivaciones: primero, no expone la existencia de rutas restringidas a usuarios no autorizados; segundo, mejora la experiencia al llevar al usuario directamente a contenido relevante para su rol.

**Flujo de agendamiento como wizard unidireccional.**
Las vistas `Tramites → Detalle → Agendar → SubirArchivos` forman una secuencia encadenada donde cada paso recibe el contexto del anterior vía parámetros de ruta (`tramiteId`) y estado de navegación (`fecha`, `hora`). Esto garantiza que el usuario nunca llegue a una pantalla intermedia sin los datos necesarios, evitando estados parciales o reservas inconsistentes. El flujo no es reversible automáticamente: el botón volver redirige explícitamente al paso anterior, no permite saltar pasos.

**Validación en dos capas (frontend + backend).**
La validación de inputs ocurre primero en el cliente para dar retroalimentación inmediata sin round-trip al servidor. Se repite íntegramente en el backend porque el cliente no puede ser considerado una barrera de seguridad: cualquier petición HTTP directa omitiría las validaciones del frontend. Esta redundancia intencional es coherente con el principio de defensa en profundidad.

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
│   │   ├── HistorialTramites/
│   │   └── PanelFuncionario/     # Panel de gestión (funcionario/jefe_sucursal)
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
│   │   ├── seed-users.js         # Crea cuentas de prueba (npm run seed:users)
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

## Cuentas de prueba

Las siguientes cuentas ya están cargadas en la base de datos del proyecto:

| Rol | RUT | Contraseña | Qué puede probar |
|-----|-----|------------|------------------|
| `usuario` | `11111111-1` | `Test1234!` | Flujo completo del ciudadano: ver trámites, agendar cita, subir archivos, ver historial |
| `funcionario` | `22222222-2` | `Test1234!` | Panel de gestión (`/panel-funcionario`): ver citas de la sucursal DIDECO, cambiar estado |

> El login se realiza con RUT (sin puntos, con guión) + contraseña.

---

## Endpoints del backend

### Autenticación (públicos)

| Método | URL | Descripción |
|--------|-----|-------------|
| POST | `/auth/registro` | Crear cuenta (email, password, nombre, rut, ...) |
| POST | `/auth/login` | Iniciar sesión (rut, password) → devuelve JWT |
| GET | `/auth/me` | Perfil del usuario autenticado |

### Trámites y disponibilidad (públicos)

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/tramites/` | Lista todos los trámites activos |
| GET | `/tramites/:id` | Detalle de un trámite |
| GET | `/disponibilidad/:tramiteId/:fecha` | Slots horarios disponibles |

### Sucursales (públicos)

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/sucursales` | Lista todas las sucursales activas |

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

