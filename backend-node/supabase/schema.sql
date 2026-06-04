-- ============================================================
-- Schema principal — Sistema de Trámites Municipales
-- Ejecutar después de reset.sql
-- ============================================================

-- ── perfiles ─────────────────────────────────────────────────
-- Extiende auth.users de Supabase con datos del ciudadano/funcionario/admin.
-- sucursal_id se agrega como FK después de crear la tabla sucursales.
CREATE TABLE public.perfiles (
  id               UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre           TEXT NOT NULL,
  rut              TEXT UNIQUE NOT NULL,
  telefono         TEXT,
  fecha_nacimiento DATE,
  genero           TEXT,
  region           TEXT,
  comuna           TEXT,
  rol              TEXT DEFAULT 'usuario'
                   CHECK (rol IN ('usuario', 'funcionario', 'jefe_sucursal')),
  sucursal_id      UUID,
  password_hash    TEXT,                    -- bcrypt hash explícito (EP 2.6b)
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── sucursales ────────────────────────────────────────────────
-- Unidades organizativas (físicas u online). Creadas por el admin.
CREATE TABLE public.sucursales (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre      TEXT NOT NULL,
  tipo        TEXT DEFAULT 'presencial'
              CHECK (tipo IN ('presencial', 'en_linea', 'mixta')),
  direccion   TEXT,
  telefono    TEXT,
  email       TEXT,
  activa      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- FK de perfiles → sucursales (funcionario pertenece a una sucursal)
ALTER TABLE public.perfiles
  ADD CONSTRAINT fk_perfiles_sucursal
  FOREIGN KEY (sucursal_id) REFERENCES public.sucursales(id) ON DELETE SET NULL;

-- ── tramites ──────────────────────────────────────────────────
-- Creados y gestionados por funcionarios dentro de su sucursal.
CREATE TABLE public.tramites (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sucursal_id           UUID REFERENCES public.sucursales(id) ON DELETE CASCADE,
  nombre                TEXT NOT NULL,
  descripcion           TEXT,
  costo                 TEXT DEFAULT 'Gratuito',
  es_en_linea           BOOLEAN DEFAULT TRUE,
  documentos_requeridos TEXT[] DEFAULT '{}',
  activo                BOOLEAN DEFAULT TRUE,
  created_by            UUID REFERENCES public.perfiles(id) ON DELETE SET NULL,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ── horarios_tramite ──────────────────────────────────────────
-- Horarios de atención por día de semana. El funcionario los configura.
-- dia_semana: 1=lunes … 7=domingo
CREATE TABLE public.horarios_tramite (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tramite_id        UUID REFERENCES public.tramites(id) ON DELETE CASCADE,
  dia_semana        INT CHECK (dia_semana BETWEEN 1 AND 7),
  hora_inicio       TIME NOT NULL,
  hora_fin          TIME NOT NULL,
  intervalo_minutos INT DEFAULT 30,
  activo            BOOLEAN DEFAULT TRUE
);

-- ── bloqueos_horario ──────────────────────────────────────────
-- El funcionario bloquea fechas u horas específicas (feriados, reuniones, etc.).
-- Si hora es NULL, se bloquea el día completo.
CREATE TABLE public.bloqueos_horario (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tramite_id  UUID REFERENCES public.tramites(id) ON DELETE CASCADE,
  fecha       DATE NOT NULL,
  hora        TIME,
  motivo      TEXT,
  created_by  UUID REFERENCES public.perfiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── citas ─────────────────────────────────────────────────────
-- Reservas de ciudadanos. atendido_por = funcionario que gestiona la cita.
CREATE TABLE public.citas (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id    UUID REFERENCES public.perfiles(id) ON DELETE SET NULL,
  tramite_id    UUID REFERENCES public.tramites(id) ON DELETE SET NULL,
  fecha         DATE NOT NULL,
  hora          TIME NOT NULL,
  estado        TEXT DEFAULT 'pendiente'
                CHECK (estado IN ('pendiente', 'confirmado', 'cancelado', 'completado')),
  notas         TEXT,
  atendido_por  UUID REFERENCES public.perfiles(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── archivos_cita ─────────────────────────────────────────────
-- Documentos subidos por el ciudadano al agendar una cita.
CREATE TABLE public.archivos_cita (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cita_id    UUID REFERENCES public.citas(id) ON DELETE CASCADE,
  nombre     TEXT NOT NULL,
  url        TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Trigger: auto-crear perfil al registrarse ─────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfiles (id, nombre, rut)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nombre', 'Sin nombre'),
    COALESCE(NEW.raw_user_meta_data->>'rut', 'sin-rut-' || NEW.id)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
