-- ============================================================
-- TUQUI - avisos en el celular, paso 1 de 2: la tabla
-- Pegar COMPLETO en Supabase -> SQL Editor -> New query -> Run
-- Se puede correr varias veces sin problema.
-- ============================================================

-- A que celulares hay que avisarle. Una fila por celular, no por persona:
-- la misma persona puede tener la app en el telefono y en la tablet.
create table if not exists push_subs (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  endpoint     text not null unique,     -- la direccion que da el navegador
  p256dh       text not null,            -- llaves de cifrado del propio celular
  auth         text not null,
  creado_en    timestamptz not null default now()
);

create index if not exists ix_push_user on push_subs(user_id);

alter table push_subs enable row level security;
alter table push_subs force row level security;

-- Cada quien solo toca sus propias suscripciones, y solo en un hogar del que es parte.
drop policy if exists ps_own on push_subs;
create policy ps_own on push_subs for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and is_member(household_id));
