-- El cliente ve el nombre del producto de sus demos.
-- La política de products no le deja el catálogo entero.

create view public.client_demos
with (security_barrier = true, security_invoker = false)
as
select
  d.id,
  d.product_id,
  d.expires_at,
  p.name as product_name
from public.demos d
join public.products p on p.id = d.product_id
join public.profiles me on me.id = auth.uid()
where me.role = 'client'
  and me.organization_id = d.organization_id;

grant select on public.client_demos to authenticated;
