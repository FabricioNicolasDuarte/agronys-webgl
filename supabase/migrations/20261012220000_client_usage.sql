-- El cliente lee el uso de su establecimiento con el nombre del producto.
-- La política de products no le deja el catálogo entero.

create view public.client_usage
with (security_barrier = true, security_invoker = false)
as
select
  u.id,
  u.occurred_on,
  u.metric,
  u.value,
  p.name as product_name
from public.app_usage u
join public.products p on p.id = u.product_id
join public.profiles me on me.id = auth.uid()
where me.role = 'client'
  and me.organization_id = u.organization_id;

grant select on public.client_usage to authenticated;
