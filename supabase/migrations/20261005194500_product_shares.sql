-- Quién vende un producto de catálogo, y qué porcentaje lleva cada persona de un co-desarrollo.
-- El reparto deja de ser partes iguales: la suma de los porcentajes tiene que ser 100.

alter table public.product_collaborators
  add column share_percent numeric(5, 2);

with counts as (
  select product_id, count(*)::numeric as n
  from public.product_collaborators
  group by product_id
),
ranked as (
  select
    c.product_id,
    c.profile_id,
    counts.n,
    row_number() over (
      partition by c.product_id
      order by case when p.role = 'superadmin' then 0 else 1 end, c.profile_id
    ) as rn
  from public.product_collaborators c
  join public.profiles p on p.id = c.profile_id
  join counts on counts.product_id = c.product_id
)
update public.product_collaborators as collaborator
set share_percent = case
  when ranked.rn = 1 then 100 - round(100 / ranked.n, 2) * (ranked.n - 1)
  else round(100 / ranked.n, 2)
end
from ranked
where collaborator.product_id = ranked.product_id
  and collaborator.profile_id = ranked.profile_id;

alter table public.product_collaborators
  alter column share_percent set not null;

alter table public.product_collaborators
  add constraint product_collaborators_share_chk
  check (share_percent > 0 and share_percent <= 100);

create table public.product_sellers (
  product_id uuid not null references public.products (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (product_id, profile_id)
);

insert into public.product_sellers (product_id, profile_id)
select distinct deal.product_id, deal.seller_id
from public.deals as deal
join public.products as product on product.id = deal.product_id
where product.kind = 'catalog'
on conflict do nothing;

alter table public.product_sellers enable row level security;

create policy product_sellers_superadmin on public.product_sellers
  for all using (public.is_superadmin()) with check (public.is_superadmin());

create policy product_sellers_read_own on public.product_sellers
  for select using (profile_id = auth.uid());

grant select, insert, update, delete on public.product_sellers to authenticated;

create or replace function public.seller_must_be_staff()
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
    raise exception 'un cliente no vende este producto';
  end if;
  return new;
end;
$$;

create trigger product_sellers_staff
  before insert or update on public.product_sellers
  for each row execute function public.seller_must_be_staff();

create or replace function public.deals_seller_fits()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  k public.product_kind;
begin
  select kind into k from public.products where id = new.product_id;
  if k = 'codeveloped' then
    if not exists (
      select 1 from public.product_collaborators
      where product_id = new.product_id and profile_id = new.seller_id
    ) then
      raise exception 'un co-desarrollo lo vende alguien que está en el reparto';
    end if;
  elsif not exists (
    select 1 from public.product_sellers
    where product_id = new.product_id and profile_id = new.seller_id
  ) then
    raise exception 'este producto no está asignado a ese vendedor';
  end if;
  return new;
end;
$$;

create trigger deals_seller_fits
  before insert or update of product_id, seller_id on public.deals
  for each row execute function public.deals_seller_fits();

create or replace function public.settle_deal(p_deal uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  d public.deals%rowtype;
  prod public.products%rowtype;
  seller_role public.app_role;
  remainder_id uuid;
  rec record;
  total_share numeric(8, 2);
  remainder numeric(12, 2);
  amount numeric(12, 2);
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
  select role into seller_role from public.profiles where id = d.seller_id;

  perform set_config('agronys.settle', 'on', true);

  if prod.kind = 'codeveloped' then
    select coalesce(sum(share_percent), 0) into total_share
    from public.product_collaborators
    where product_id = d.product_id;
    if total_share <> 100 then
      raise exception 'los porcentajes del proyecto tienen que sumar 100';
    end if;
    if not exists (
      select 1 from public.product_collaborators
      where product_id = d.product_id and profile_id = d.seller_id
    ) then
      raise exception 'esa app solo la vende alguien del reparto';
    end if;

    select c.profile_id into remainder_id
    from public.product_collaborators c
    join public.profiles p on p.id = c.profile_id
    where c.product_id = d.product_id
      and p.role = 'superadmin'
    order by c.profile_id
    limit 1;

    remainder := d.sold_price_usd;
    for rec in
      select c.profile_id, c.share_percent
      from public.product_collaborators c
      join public.profiles p on p.id = c.profile_id
      where c.product_id = d.product_id
      order by case when p.role = 'superadmin' then 1 else 0 end, c.profile_id
    loop
      if rec.profile_id = remainder_id then
        amount := remainder;
      else
        amount := round(d.sold_price_usd * rec.share_percent / 100, 2);
        remainder := remainder - amount;
      end if;
      insert into public.payouts (deal_id, payee_id, kind, amount_usd)
      values (d.id, rec.profile_id, 'dev_split', amount);
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
