-- Portal Agronys: cuentas, ventas, liquidaciones e infraestructura.
--
-- Reglas comerciales (octubre 2026):
--   El cliente le paga solo al superadmin.
--   Una venta del superadmin no existe para el vendedor.
--   El vendedor ve una venta solo si él es el seller y el estado no es borrador.
--   Si el superadmin retoma la venta, seller_id pasa a ser él y el vendedor deja de verla.
--   Comisión de catálogo, sin acumular: si V > P, V - P; si V <= P, 10% de V.
--   V < P exige discount_approved.
--   App co-desarrollada: V / N entre colaboradores, superadmin incluido. No se suma comisión.
--   La infraestructura no entra al reparto y solo la lee el superadmin.
--   La liquidación se crea cuando el cliente cubrió la factura.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Tipos
-- ---------------------------------------------------------------------------

create type public.app_role as enum ('superadmin', 'vendor', 'client');

create type public.product_line as enum ('agricultura', 'ganaderia', 'mixto');

create type public.product_kind as enum ('catalog', 'codeveloped');

create type public.deal_status as enum (
  'draft',
  'assigned',
  'accepted',
  'invoiced',
  'paid',
  'void'
);

create type public.invoice_kind as enum ('C', 'E', 'NC_C', 'NC_E');

create type public.payout_kind as enum ('sales_commission', 'dev_split');

create type public.payout_status as enum ('payable', 'invoiced_by_payee', 'paid', 'void');

-- ---------------------------------------------------------------------------
-- Identidad
-- ---------------------------------------------------------------------------

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  country char(2) not null,
  tax_id text,
  created_at timestamptz not null default now(),
  constraint organizations_country_chk check (country ~ '^[A-Z]{2}$')
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  role public.app_role not null default 'client',
  organization_id uuid references public.organizations (id),
  created_at timestamptz not null default now(),
  constraint profiles_client_org_chk check (
    role <> 'client' or organization_id is not null
  )
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  line public.product_line not null,
  kind public.product_kind not null default 'catalog',
  suggested_price_usd numeric(12, 2),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint products_price_chk check (
    suggested_price_usd is null or suggested_price_usd >= 0
  )
);

-- N de un co-desarrollo es la cantidad de filas, y una de ellas es el superadmin.
create table public.product_collaborators (
  product_id uuid not null references public.products (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (product_id, profile_id)
);

-- ---------------------------------------------------------------------------
-- Ventas. El medio de pago no vive acá: el vendedor y el admin no lo leen.
-- ---------------------------------------------------------------------------

create table public.deals (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id),
  organization_id uuid not null references public.organizations (id),
  seller_id uuid not null references public.profiles (id),
  status public.deal_status not null default 'draft',
  suggested_price_usd numeric(12, 2),
  sold_price_usd numeric(12, 2),
  discount_approved boolean not null default false,
  created_at timestamptz not null default now(),
  constraint deals_prices_chk check (
    (suggested_price_usd is null or suggested_price_usd >= 0)
    and (sold_price_usd is null or sold_price_usd > 0)
  )
);

create table public.deal_events (
  id bigint generated always as identity primary key,
  deal_id uuid not null references public.deals (id) on delete cascade,
  kind text not null,
  actor_id uuid,
  at timestamptz not null default now(),
  detail jsonb not null default '{}'::jsonb
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references public.deals (id),
  organization_id uuid not null references public.organizations (id),
  kind public.invoice_kind not null,
  point_of_sale int,
  number int,
  cae text,
  amount_usd numeric(12, 2) not null,
  amount_ars numeric(14, 2) not null,
  fx_rate numeric(14, 6),
  issued_at timestamptz not null default now(),
  constraint invoices_amount_chk check (amount_ars <> 0)
);

-- behavior es nota interna (mora, medio, observaciones). No sale en el recibo del cliente.
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices (id),
  amount_ars numeric(14, 2) not null check (amount_ars >= 0),
  withholding_ars numeric(14, 2) not null default 0 check (withholding_ars >= 0),
  method text,
  behavior text,
  paid_at timestamptz not null default now()
);

create table public.payouts (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references public.deals (id),
  payee_id uuid not null references public.profiles (id),
  kind public.payout_kind not null,
  amount_usd numeric(12, 2) not null check (amount_usd >= 0),
  status public.payout_status not null default 'payable',
  created_at timestamptz not null default now(),
  unique (deal_id, payee_id, kind)
);

-- Costo de plataforma. Separado del precio del producto.
create table public.infrastructure_costs (
  id uuid primary key default gen_random_uuid(),
  period date not null,
  amount_usd numeric(12, 2) not null check (amount_usd >= 0),
  note text,
  created_at timestamptz not null default now()
);

create table public.demos (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id),
  product_id uuid not null references public.products (id),
  expires_at timestamptz not null,
  granted_by uuid not null references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.app_usage (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id),
  product_id uuid not null references public.products (id),
  occurred_on date not null,
  metric text not null,
  value numeric not null,
  created_at timestamptz not null default now()
);

-- Tope de referencia ARCA. No es la categoría del titular hasta que el contador la confirme.
create table public.fiscal_parameters (
  id int primary key default 1 check (id = 1),
  category text not null,
  annual_gross_cap_ars numeric(16, 2) not null check (annual_gross_cap_ars > 0),
  alert_ratio numeric(4, 3) not null default 0.800 check (alert_ratio > 0 and alert_ratio <= 1),
  valid_from date not null,
  note text not null
);

-- ---------------------------------------------------------------------------
-- Funciones de acceso
-- ---------------------------------------------------------------------------

create or replace function public.is_superadmin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'superadmin'
  );
$$;

create or replace function public.current_org()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id
  from public.profiles
  where id = auth.uid();
$$;

revoke all on function public.is_superadmin() from public;
revoke all on function public.current_org() from public;
grant execute on function public.is_superadmin() to authenticated;
grant execute on function public.current_org() to authenticated;

-- ---------------------------------------------------------------------------
-- Perfil al crear el usuario. El superadmin cambia el rol después.
-- Un cliente queda sin organización hasta que se le asigne: la fila nace
-- como vendor inactivo de lectura vacía y el superadmin lo pasa a client
-- junto con la organización, para no violar profiles_client_org_chk.
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'vendor'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Co-desarrollo: el superadmin forma parte de N.
-- ---------------------------------------------------------------------------

create or replace function public.assert_codeveloped_owner()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  pid uuid;
  k public.product_kind;
begin
  if tg_table_name = 'products' then
    pid := new.id;
  elsif tg_op = 'DELETE' then
    pid := old.product_id;
  else
    pid := new.product_id;
  end if;

  select kind into k from public.products where id = pid;
  if k = 'codeveloped' then
    if not exists (
      select 1
      from public.product_collaborators c
      join public.profiles p on p.id = c.profile_id
      where c.product_id = pid
        and p.role = 'superadmin'
    ) then
      raise exception 'un proyecto co-desarrollado incluye al superadmin entre los colaboradores';
    end if;
  end if;
  return null;
end;
$$;

create constraint trigger codeveloped_owner_from_collaborators
  after insert or update or delete on public.product_collaborators
  deferrable initially deferred
  for each row execute function public.assert_codeveloped_owner();

create constraint trigger codeveloped_owner_from_product
  after insert or update of kind on public.products
  deferrable initially deferred
  for each row execute function public.assert_codeveloped_owner();

create or replace function public.collaborator_must_be_staff()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  r public.app_role;
begin
  select role into r from public.profiles where id = new.profile_id;
  if r is null or r = 'client' then
    raise exception 'un cliente no colabora en el desarrollo';
  end if;
  return new;
end;
$$;

create trigger collaborator_staff
  before insert or update on public.product_collaborators
  for each row execute function public.collaborator_must_be_staff();

-- ---------------------------------------------------------------------------
-- Historial de la venta, sin medio de pago.
-- ---------------------------------------------------------------------------

create or replace function public.log_deal_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.deal_events (deal_id, kind, actor_id, detail)
  values (
    new.id,
    case
      when tg_op = 'INSERT' then 'created'
      else 'status_' || new.status::text
    end,
    auth.uid(),
    jsonb_build_object(
      'seller_id', new.seller_id,
      'sold_price_usd', new.sold_price_usd
    )
  );
  return new;
end;
$$;

create trigger deals_log_insert
  after insert on public.deals
  for each row execute function public.log_deal_event();

create trigger deals_log_update
  after update of status, seller_id, sold_price_usd on public.deals
  for each row execute function public.log_deal_event();

-- ---------------------------------------------------------------------------
-- Liquidación. Solo corre con el flag que pone settle_deal.
-- ---------------------------------------------------------------------------

create or replace function public.payouts_write_guard()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    if current_setting('agronys.settle', true) is distinct from 'on' then
      raise exception 'las liquidaciones las calcula el sistema';
    end if;
    return new;
  end if;

  if not public.is_superadmin() then
    raise exception 'solo el superadmin actualiza una liquidación';
  end if;

  if new.amount_usd is distinct from old.amount_usd
     or new.payee_id is distinct from old.payee_id
     or new.deal_id is distinct from old.deal_id
     or new.kind is distinct from old.kind then
    raise exception 'el monto no se edita; se anula la venta y se recalcula';
  end if;
  return new;
end;
$$;

create trigger payouts_guard
  before insert or update on public.payouts
  for each row execute function public.payouts_write_guard();

create or replace function public.settle_deal(p_deal uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  d public.deals%rowtype;
  prod public.products%rowtype;
  n int;
  seller_role public.app_role;
  share numeric(12, 2);
  remainder_id uuid;
  collab uuid;
  commission numeric(12, 2);
begin
  if not public.is_superadmin() then
    raise exception 'solo el superadmin liquida';
  end if;

  select * into d from public.deals where id = p_deal for update;
  if not found then
    raise exception 'venta inexistente';
  end if;
  if d.status <> 'paid' then
    raise exception 'se liquida cuando el cliente ya pagó';
  end if;
  if d.sold_price_usd is null then
    raise exception 'falta el precio vendido';
  end if;
  if exists (select 1 from public.payouts where deal_id = d.id and status <> 'void') then
    return;
  end if;

  select * into prod from public.products where id = d.product_id;
  select count(*) into n from public.product_collaborators where product_id = d.product_id;
  select role into seller_role from public.profiles where id = d.seller_id;

  perform set_config('agronys.settle', 'on', true);

  if prod.kind = 'codeveloped' then
    if n < 1 then
      raise exception 'el co-desarrollo no tiene colaboradores';
    end if;
    if not exists (
      select 1 from public.product_collaborators
      where product_id = d.product_id and profile_id = d.seller_id
    ) then
      raise exception 'esa app solo la vende un colaborador o el superadmin';
    end if;

    select c.profile_id into remainder_id
    from public.product_collaborators c
    join public.profiles p on p.id = c.profile_id
    where c.product_id = d.product_id
      and p.role = 'superadmin'
    order by c.profile_id
    limit 1;

    share := round(d.sold_price_usd / n, 2);

    for collab in
      select profile_id from public.product_collaborators where product_id = d.product_id
    loop
      insert into public.payouts (deal_id, payee_id, kind, amount_usd)
      values (
        d.id,
        collab,
        'dev_split',
        case
          when collab = remainder_id then d.sold_price_usd - share * (n - 1)
          else share
        end
      );
    end loop;
    return;
  end if;

  if seller_role = 'superadmin' then
    return;
  end if;

  if d.suggested_price_usd is null then
    raise exception 'falta el precio sugerido';
  end if;
  if d.sold_price_usd < d.suggested_price_usd and not d.discount_approved then
    raise exception 'vender bajo el precio sugerido requiere autorización del superadmin';
  end if;

  if d.sold_price_usd > d.suggested_price_usd then
    commission := d.sold_price_usd - d.suggested_price_usd;
  else
    commission := round(d.sold_price_usd * 0.10, 2);
  end if;

  insert into public.payouts (deal_id, payee_id, kind, amount_usd)
  values (d.id, d.seller_id, 'sales_commission', commission);
end;
$$;

create or replace function public.take_over_deal(p_deal uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_superadmin() then
    raise exception 'solo el superadmin retoma una venta';
  end if;
  if exists (
    select 1 from public.payouts
    where deal_id = p_deal and status <> 'void'
  ) then
    raise exception 'la venta ya está liquidada';
  end if;

  update public.deals
  set
    seller_id = auth.uid(),
    status = case when status = 'assigned' then 'draft' else status end
  where id = p_deal;

  if not found then
    raise exception 'venta inexistente';
  end if;
end;
$$;

create or replace function public.approve_discount(p_deal uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_superadmin() then
    raise exception 'solo el superadmin autoriza un precio menor';
  end if;
  update public.deals set discount_approved = true where id = p_deal;
end;
$$;

revoke all on function public.settle_deal(uuid) from public;
revoke all on function public.take_over_deal(uuid) from public;
revoke all on function public.approve_discount(uuid) from public;
grant execute on function public.settle_deal(uuid) to authenticated;
grant execute on function public.take_over_deal(uuid) to authenticated;
grant execute on function public.approve_discount(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Lecturas recortadas. El dueño de la vista es postgres; el filtro usa auth.uid().
-- ---------------------------------------------------------------------------

create view public.client_contracts
with (security_barrier = true, security_invoker = false)
as
select
  d.id,
  d.product_id,
  p.name as product_name,
  p.line,
  d.status,
  d.sold_price_usd,
  d.created_at
from public.deals d
join public.products p on p.id = d.product_id
join public.profiles me on me.id = auth.uid()
where me.role = 'client'
  and me.organization_id = d.organization_id
  and d.status in ('accepted', 'invoiced', 'paid');

create view public.client_receipts
with (security_barrier = true, security_invoker = false)
as
select
  pay.id,
  i.id as invoice_id,
  i.kind,
  i.number,
  pay.amount_ars,
  pay.paid_at
from public.payments pay
join public.invoices i on i.id = pay.invoice_id
join public.profiles me on me.id = auth.uid()
where me.role = 'client'
  and me.organization_id = i.organization_id;

create or replace function public.fiscal_snapshot()
returns table (
  invoiced_ars numeric,
  cap_ars numeric,
  ratio numeric,
  alert boolean
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  cap numeric;
  alert_at numeric;
  total numeric;
begin
  if not public.is_superadmin() then
    raise exception 'el acumulado fiscal lo ve solo el superadmin';
  end if;

  select annual_gross_cap_ars, alert_ratio
  into cap, alert_at
  from public.fiscal_parameters
  where id = 1;

  select coalesce(sum(amount_ars), 0)
  into total
  from public.invoices
  where issued_at >= now() - interval '12 months';

  invoiced_ars := total;
  cap_ars := cap;
  ratio := case when cap is null or cap = 0 then null else round(total / cap, 4) end;
  alert := cap is not null and total >= cap * alert_at;
  return next;
end;
$$;

revoke all on function public.fiscal_snapshot() from public;
grant execute on function public.fiscal_snapshot() to authenticated;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_collaborators enable row level security;
alter table public.deals enable row level security;
alter table public.deal_events enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.payouts enable row level security;
alter table public.infrastructure_costs enable row level security;
alter table public.demos enable row level security;
alter table public.app_usage enable row level security;
alter table public.fiscal_parameters enable row level security;

create policy organizations_superadmin on public.organizations
  for all using (public.is_superadmin()) with check (public.is_superadmin());

create policy organizations_client on public.organizations
  for select using (id = public.current_org());

create policy organizations_vendor_sales on public.organizations
  for select using (
    exists (
      select 1 from public.deals d
      where d.organization_id = organizations.id
        and d.seller_id = auth.uid()
        and d.status <> 'draft'
    )
  );

create policy organizations_collaborator on public.organizations
  for select using (
    exists (
      select 1
      from public.deals d
      join public.product_collaborators c on c.product_id = d.product_id
      where d.organization_id = organizations.id
        and c.profile_id = auth.uid()
        and d.status <> 'draft'
    )
  );

create policy profiles_read_own on public.profiles
  for select using (id = auth.uid() or public.is_superadmin());

create policy profiles_superadmin_write on public.profiles
  for all using (public.is_superadmin()) with check (public.is_superadmin());

create policy products_superadmin on public.products
  for all using (public.is_superadmin()) with check (public.is_superadmin());

create policy products_vendor_sold on public.products
  for select using (
    exists (
      select 1 from public.deals d
      where d.product_id = products.id
        and d.seller_id = auth.uid()
        and d.status <> 'draft'
    )
  );

create policy products_collaborator on public.products
  for select using (
    exists (
      select 1 from public.product_collaborators c
      where c.product_id = products.id
        and c.profile_id = auth.uid()
    )
  );

create policy collaborators_superadmin on public.product_collaborators
  for all using (public.is_superadmin()) with check (public.is_superadmin());

create policy collaborators_read_own on public.product_collaborators
  for select using (profile_id = auth.uid());

create policy deals_superadmin on public.deals
  for all using (public.is_superadmin()) with check (public.is_superadmin());

create policy deals_vendor on public.deals
  for select using (seller_id = auth.uid() and status <> 'draft');

create policy deals_collaborator on public.deals
  for select using (
    exists (
      select 1 from public.product_collaborators c
      where c.product_id = deals.product_id
        and c.profile_id = auth.uid()
    )
    and status <> 'draft'
  );

create policy deal_events_superadmin on public.deal_events
  for select using (public.is_superadmin());

create policy deal_events_vendor on public.deal_events
  for select using (
    exists (
      select 1 from public.deals d
      where d.id = deal_events.deal_id
        and d.seller_id = auth.uid()
        and d.status <> 'draft'
    )
  );

create policy deal_events_collaborator on public.deal_events
  for select using (
    exists (
      select 1
      from public.deals d
      join public.product_collaborators c on c.product_id = d.product_id
      where d.id = deal_events.deal_id
        and c.profile_id = auth.uid()
        and d.status <> 'draft'
    )
  );

create policy invoices_superadmin on public.invoices
  for all using (public.is_superadmin()) with check (public.is_superadmin());

create policy invoices_client on public.invoices
  for select using (organization_id = public.current_org());

create policy payments_superadmin on public.payments
  for all using (public.is_superadmin()) with check (public.is_superadmin());

create policy payouts_superadmin on public.payouts
  for select using (public.is_superadmin());

create policy payouts_payee on public.payouts
  for select using (payee_id = auth.uid());

create policy payouts_superadmin_update on public.payouts
  for update using (public.is_superadmin()) with check (public.is_superadmin());

create policy infra_superadmin on public.infrastructure_costs
  for all using (public.is_superadmin()) with check (public.is_superadmin());

create policy demos_superadmin on public.demos
  for all using (public.is_superadmin()) with check (public.is_superadmin());

create policy demos_client on public.demos
  for select using (organization_id = public.current_org());

create policy demos_collaborator on public.demos
  for select using (
    exists (
      select 1 from public.product_collaborators c
      where c.product_id = demos.product_id
        and c.profile_id = auth.uid()
    )
  );

create policy usage_superadmin on public.app_usage
  for all using (public.is_superadmin()) with check (public.is_superadmin());

create policy usage_client on public.app_usage
  for select using (organization_id = public.current_org());

create policy usage_collaborator on public.app_usage
  for select using (
    exists (
      select 1 from public.product_collaborators c
      where c.product_id = app_usage.product_id
        and c.profile_id = auth.uid()
    )
  );

create policy fiscal_superadmin on public.fiscal_parameters
  for all using (public.is_superadmin()) with check (public.is_superadmin());

grant select on public.client_contracts to authenticated;
grant select on public.client_receipts to authenticated;

-- ---------------------------------------------------------------------------
-- Catálogo y tope de referencia
-- ---------------------------------------------------------------------------

insert into public.products (slug, name, line, kind)
values
  ('nutrogan', 'Nutrogan', 'agricultura', 'catalog'),
  ('sigag', 'SIGAG', 'ganaderia', 'catalog'),
  ('potrero', 'Potrero', 'mixto', 'catalog');

insert into public.fiscal_parameters (category, annual_gross_cap_ars, alert_ratio, valid_from, note)
values (
  'K',
  126610838.75,
  0.800,
  date '2026-08-01',
  'Tope de la categoría K publicado por ARCA con vigencia desde el 1/08/2026. Reemplazar por la categoría real del titular antes de usar la alerta.'
);
