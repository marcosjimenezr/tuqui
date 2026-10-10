-- ============================================================
-- TUQUI - marcar un gasto como imprevisto
-- Pegar COMPLETO en Supabase -> SQL Editor -> New query -> Run
-- Se puede correr varias veces sin problema.
--
-- Es una etiqueta, no una categoria: el veterinario de urgencia sigue siendo
-- Mascotas. Lo imprevisto es otra dimension, y por eso va aparte.
-- Todos los gastos que ya existen quedan como normales.
-- ============================================================

alter table expenses add column if not exists imprevisto boolean not null default false;
