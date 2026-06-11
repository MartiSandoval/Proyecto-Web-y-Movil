-- Ejecutar este script para borrar absolutamente todo y empezar desde cero.
-- Orden: de tablas hijas a padres (por las FK).

DROP TABLE IF EXISTS public.archivos_cita CASCADE;
DROP TABLE IF EXISTS public.citas CASCADE;
DROP TABLE IF EXISTS public.bloqueos_horario CASCADE;
DROP TABLE IF EXISTS public.horarios_tramite CASCADE;
DROP TABLE IF EXISTS public.tramites CASCADE;
DROP TABLE IF EXISTS public.sucursales CASCADE;
DROP TABLE IF EXISTS public.perfiles CASCADE;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
