-- ============================================================
-- TUQUI - ahorro: los movimientos
-- Pegar COMPLETO en Supabase -> SQL Editor -> New query -> Run
-- Se puede correr varias veces sin problema.
--
-- Hasta hoy el saldo de un fondo se CALCULABA: quincenas transcurridas por la
-- cuota. Eso daba por hecho que apartaron siempre, y el numero podia mentir.
-- Con esta tabla el saldo se SUMA: solo existe lo que de verdad apartaron.
-- ============================================================

create table if not exists savings_moves (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  fund_id      uuid not null references funds(id) on delete cascade,
  q            text not null,                 -- quincena del movimiento: 'Octubre 1'
  monto        bigint not null,               -- siempre positivo: es un abono
  origen       text not null default 'extra', -- 'compromiso' | 'sobrante' | 'extra'
  nota         text not null default '',
  creado_por   uuid references auth.users(id) on delete set null,
  creado_en    timestamptz not null default now()
);

create index if not exists ix_sm_house on savings_moves(household_id);
create index if not exists ix_sm_fund  on savings_moves(fund_id);

alter table savings_moves enable row level security;
alter table savings_moves force row level security;

drop policy if exists sm_all on savings_moves;
create policy sm_all on savings_moves for all to authenticated
  using (is_member(household_id)) with check (is_member(household_id));

-- Para que los dos vean el saldo moverse al tiempo.
do $$
begin
  alter publication supabase_realtime add table savings_moves;
exception when duplicate_object then null;
end $$;
