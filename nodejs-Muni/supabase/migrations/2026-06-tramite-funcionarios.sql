-- ============================================================
-- Migración Fase 3 (Jefe de Sucursal) — ADITIVA
-- Relaciona trámites con los funcionarios que los atienden.
-- Ejecutar una vez sobre la BD existente. No modifica tablas previas.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.tramite_funcionarios (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tramite_id     UUID REFERENCES public.tramites(id) ON DELETE CASCADE,
  funcionario_id UUID REFERENCES public.perfiles(id) ON DELETE CASCADE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (tramite_id, funcionario_id)
);
