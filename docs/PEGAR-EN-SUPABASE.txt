-- ============================================================
-- TUQUI · esquema y seguridad
-- Ejecutar completo en Supabase → SQL Editor → New query → Run
-- ============================================================
-- Principio: la separación de datos NO la hace la app, la hace
-- la base de datos. Aunque alguien manipule el cliente o llame
-- la API directamente con su token, solo puede leer y escribir
-- filas del hogar al que pertenece. Eso es lo que hace que dos
-- personas con la misma app no se vean nunca.
-- ============================================================

-- ---------- 1. Tablas ----------

create table if not exists households (
  id          uuid primary key default gen_random_uuid(),
  nombre      text not null default 'Mi hogar',
  meta_base   bigint not null default 0,      -- meta por quincena, en pesos
  creado_por  uuid not null references auth.users(id) on delete cascade,
  creado_en   timestamptz not null default now()
);

create table if not exists members (
  household_id uuid not null references households(id) on delete cascade,
  user_id      uuid references auth.users(id) on delete cascade,
  nombre       text not null default '',
  aporte       bigint not null default 0,     -- por quincena
  descuento    bigint not null default 0,     -- de ese aporte, lo que no llega al hogar
  rol          text not null default 'miembro' check (rol in ('dueno','miembro')),
  creado_en    timestamptz not null default now(),
  id           uuid primary key default gen_random_uuid()
);
-- user_id puede ser null: una persona del hogar que todavía no ha
-- aceptado la invitación existe como integrante pero sin cuenta.

create table if not exists expenses (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  q            text not null,                 -- 'Septiembre 2'
  anio         int  not null default extract(year from now()),
  cat          text not null,
  nombre       text not null,
  monto        bigint not null,
  cobertura    int  not null default 1,       -- meses que cubre el pago
  fund_id      uuid,
  pagado_por   uuid references members(id) on delete set null,
  creado_por   uuid references auth.users(id) on delete set null,
  creado_en    timestamptz not null default now()
);

create table if not exists funds (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  nombre       text not null,
  nota         text not null default '',
  cuota        bigint not null default 0,     -- por quincena
  desde_q      text not null,
  objetivo     bigint not null default 0,     -- 0 = fondo; >0 = meta de ahorro
  meses        int    not null default 0,
  creado_en    timestamptz not null default now()
);

alter table expenses drop constraint if exists expenses_fund_fk;
alter table expenses add  constraint expenses_fund_fk
  foreign key (fund_id) references funds(id) on delete set null;

create table if not exists concepts (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  clave        text not null,
  nombre       text not null,
  cat          text,
  cobertura    int  not null default 1,
  fund_id      uuid references funds(id) on delete set null,
  unique (household_id, clave)
);

create table if not exists meta_changes (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  valor        bigint not null,
  desde_q      text not null,
  creado_en    timestamptz not null default now()
);

create table if not exists invites (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  email        text not null,
  member_id    uuid references members(id) on delete set null,
  codigo       text not null unique default encode(gen_random_bytes(12),'hex'),
  expira       timestamptz not null default now() + interval '14 days',
  usado_en     timestamptz,
  creado_por   uuid references auth.users(id) on delete set null
);

create index if not exists ix_members_user   on members(user_id);
create index if not exists ix_members_house  on members(household_id);
create index if not exists ix_exp_house_q    on expenses(household_id, q);
create index if not exists ix_funds_house    on funds(household_id);
create index if not exists ix_concepts_house on concepts(household_id);
create index if not exists ix_meta_house     on meta_changes(household_id);
create index if not exists ix_invites_email  on invites(lower(email));

-- ---------- 2. Función de pertenencia ----------
-- security definer + search_path fijo: evita recursión infinita de RLS
-- (la política de members no puede consultar members bajo RLS) y evita
-- secuestro por search_path.

create or replace function is_member(h uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from members m
    where m.household_id = h and m.user_id = auth.uid()
  );
$$;

revoke all on function is_member(uuid) from public;
grant execute on function is_member(uuid) to authenticated;

-- ---------- 3. RLS ----------

alter table households   enable row level security;
alter table members      enable row level security;
alter table expenses     enable row level security;
alter table funds        enable row level security;
alter table concepts     enable row level security;
alter table meta_changes enable row level security;
alter table invites      enable row level security;

alter table households   force row level security;
alter table members      force row level security;
alter table expenses     force row level security;
alter table funds        force row level security;
alter table concepts     force row level security;
alter table meta_changes force row level security;
alter table invites      force row level security;

-- households: se ve y se edita solo si eres integrante.
drop policy if exists h_sel on households;
create policy h_sel on households for select to authenticated
  using (is_member(id));
drop policy if exists h_ins on households;
create policy h_ins on households for insert to authenticated
  with check (creado_por = auth.uid());
drop policy if exists h_upd on households;
create policy h_upd on households for update to authenticated
  using (is_member(id)) with check (is_member(id));
drop policy if exists h_del on households;
create policy h_del on households for delete to authenticated
  using (creado_por = auth.uid());

-- members: tu propia fila siempre; las demás solo de tu hogar.
drop policy if exists m_sel on members;
create policy m_sel on members for select to authenticated
  using (user_id = auth.uid() or is_member(household_id));
drop policy if exists m_ins on members;
create policy m_ins on members for insert to authenticated
  with check (
    is_member(household_id)
    or exists (select 1 from households hh
               where hh.id = household_id and hh.creado_por = auth.uid())
  );
drop policy if exists m_upd on members;
create policy m_upd on members for update to authenticated
  using (is_member(household_id)) with check (is_member(household_id));
drop policy if exists m_del on members;
create policy m_del on members for delete to authenticated
  using (is_member(household_id));

-- El resto: una sola regla, la pertenencia al hogar.
drop policy if exists e_all on expenses;
create policy e_all on expenses for all to authenticated
  using (is_member(household_id)) with check (is_member(household_id));

drop policy if exists f_all on funds;
create policy f_all on funds for all to authenticated
  using (is_member(household_id)) with check (is_member(household_id));

drop policy if exists c_all on concepts;
create policy c_all on concepts for all to authenticated
  using (is_member(household_id)) with check (is_member(household_id));

drop policy if exists mc_all on meta_changes;
create policy mc_all on meta_changes for all to authenticated
  using (is_member(household_id)) with check (is_member(household_id));

-- invites: las gestiona el hogar; quien recibe la invitación la canjea
-- por la función de abajo, no leyendo la tabla.
drop policy if exists i_all on invites;
create policy i_all on invites for all to authenticated
  using (is_member(household_id)) with check (is_member(household_id));

-- ---------- 4. Crear hogar (en una sola transacción) ----------
-- Sin esto habría un instante en que el hogar existe y todavía no
-- tienes fila de integrante, y las políticas te dejarían por fuera
-- de tu propio hogar.

create or replace function crear_hogar(p_nombre text, p_mi_nombre text,
                                       p_aporte bigint default 0,
                                       p_descuento bigint default 0)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare h uuid;
begin
  if auth.uid() is null then raise exception 'sin sesion'; end if;
  insert into households(nombre, creado_por) values (coalesce(nullif(p_nombre,''),'Mi hogar'), auth.uid())
    returning id into h;
  insert into members(household_id, user_id, nombre, aporte, descuento, rol)
    values (h, auth.uid(), coalesce(nullif(p_mi_nombre,''),'Yo'), p_aporte, p_descuento, 'dueno');
  return h;
end $$;

revoke all on function crear_hogar(text,text,bigint,bigint) from public;
grant execute on function crear_hogar(text,text,bigint,bigint) to authenticated;

-- ---------- 5. Aceptar una invitación ----------
-- El código es el secreto. Quien lo tenga y esté autenticado entra
-- al hogar; la invitación se marca usada y no sirve otra vez.

create or replace function aceptar_invitacion(p_codigo text)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare inv invites; h uuid;
begin
  if auth.uid() is null then raise exception 'sin sesion'; end if;

  select * into inv from invites
   where codigo = p_codigo and usado_en is null and expira > now();
  if not found then raise exception 'invitacion invalida o vencida'; end if;

  h := inv.household_id;

  if exists (select 1 from members where household_id = h and user_id = auth.uid()) then
    return h;                       -- ya pertenece: idempotente
  end if;

  if inv.member_id is not null
     and exists (select 1 from members where id = inv.member_id and user_id is null) then
    update members set user_id = auth.uid() where id = inv.member_id;
  else
    insert into members(household_id, user_id, nombre, rol)
      values (h, auth.uid(), split_part(inv.email,'@',1), 'miembro');
  end if;

  update invites set usado_en = now() where id = inv.id;
  return h;
end $$;

revoke all on function aceptar_invitacion(text) from public;
grant execute on function aceptar_invitacion(text) to authenticated;

-- ---------- 6. Realtime ----------
alter publication supabase_realtime add table expenses;
alter publication supabase_realtime add table funds;
alter publication supabase_realtime add table members;
alter publication supabase_realtime add table households;
alter publication supabase_realtime add table concepts;
alter publication supabase_realtime add table meta_changes;

-- ============================================================
-- Comprobación rápida (opcional): con dos usuarios distintos,
--   select * from expenses;
-- debe devolver SOLO los gastos del hogar de cada uno, sin filtros
-- en la consulta. Si devuelve algo del otro hogar, algo quedó mal.
-- ============================================================
