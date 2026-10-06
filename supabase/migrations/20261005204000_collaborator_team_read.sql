-- Quien está en un co-desarrollo lee el reparto completo de ese producto
-- (nombres y porcentajes). No puede modificarlo: la escritura sigue en el superadmin.
-- La función es security definer para no reentrar en la misma política.

create or replace function public.shares_product(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.product_collaborators
    where product_id = target
      and profile_id = auth.uid()
  );
$$;

create policy collaborators_read_team on public.product_collaborators
  for select using (public.shares_product(product_id));
