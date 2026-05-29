-- ============================================================
-- Seed — Datos iniciales de desarrollo
-- Ejecutar después de schema.sql
-- ============================================================

-- ── Sucursales ────────────────────────────────────────────────
INSERT INTO public.sucursales (nombre, tipo, direccion, telefono) VALUES
  ('DIDECO',                          'mixta',      'Av. Municipal 100', '+56 2 2345 6789'),
  ('Administración Municipal',        'presencial',  'Av. Municipal 100', '+56 2 2345 6780'),
  ('Dirección de Obras Municipales',  'presencial',  'Av. Municipal 102', '+56 2 2345 6781'),
  ('Servicios Online',                'en_linea',    NULL,                NULL);

-- ── Trámites ──────────────────────────────────────────────────
INSERT INTO public.tramites (nombre, descripcion, costo, sucursal_id, es_en_linea, documentos_requeridos) VALUES
  (
    'Subsidio de Agua Potable',
    'Solicitud de subsidio para el pago del servicio de agua potable para familias de bajos recursos.',
    'Gratuito',
    (SELECT id FROM public.sucursales WHERE nombre = 'DIDECO'),
    TRUE,
    ARRAY['Cédula de identidad', 'Última cuenta de agua', 'Certificado de residencia']
  ),
  (
    'Inscripción descuento en la compra de gas',
    'Registro para obtener descuento en la compra de gas de cañería o envasado para hogares vulnerables.',
    'Gratuito',
    (SELECT id FROM public.sucursales WHERE nombre = 'DIDECO'),
    TRUE,
    ARRAY['Cédula de identidad', 'Certificado de residencia', 'Informe socioeconómico']
  ),
  (
    'Subsidio al pago del Derecho de Aseo',
    'Exención o descuento en el cobro del servicio de recolección de basura domiciliaria.',
    'Gratuito',
    (SELECT id FROM public.sucursales WHERE nombre = 'Administración Municipal'),
    FALSE,
    ARRAY['Cédula de identidad', 'Última contribución o contrato de arriendo', 'Certificado de residencia']
  ),
  (
    'Permiso de Edificación',
    'Autorización municipal para construir, ampliar o modificar una edificación dentro del territorio comunal.',
    '$50.000',
    (SELECT id FROM public.sucursales WHERE nombre = 'Dirección de Obras Municipales'),
    FALSE,
    ARRAY['Planos arquitectónicos', 'Certificado de dominio vigente', 'Formulario de solicitud', 'Informe de ingeniero']
  );

-- ── Horarios de atención ──────────────────────────────────────
-- Lunes a viernes (1-5), 08:00–16:00, intervalos de 30 minutos, para todos los trámites.
INSERT INTO public.horarios_tramite (tramite_id, dia_semana, hora_inicio, hora_fin, intervalo_minutos)
SELECT t.id, d.dia, '08:00'::TIME, '16:00'::TIME, 30
FROM public.tramites t
CROSS JOIN (VALUES (1),(2),(3),(4),(5)) AS d(dia);
