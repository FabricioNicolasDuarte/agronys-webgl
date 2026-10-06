-- El producto guarda su enlace de acceso.
-- La infraestructura se carga contra un producto y no entra al reparto.

alter table public.products
  add column site_url text;

alter table public.infrastructure_costs
  add column product_id uuid references public.products (id);
