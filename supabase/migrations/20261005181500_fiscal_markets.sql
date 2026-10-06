-- Clientes de Argentina, Paraguay y Uruguay.
-- Agronys factura desde Argentina.
-- Interno: factura C. Exterior: factura E, exportación de servicios.
-- El CUIT país sale de la tabla de ARCA. El RUC o el RUT no se imprimen en la factura E.
-- Agronys no retiene el impuesto paraguayo ni el uruguayo.

alter table public.organizations
  add column party text not null default 'juridica';

alter table public.organizations
  drop constraint organizations_country_chk;

alter table public.organizations
  add constraint organizations_country_chk check (country in ('AR', 'PY', 'UY')),
  add constraint organizations_party_chk check (party in ('juridica', 'humana', 'otro'));

alter table public.invoices
  add column destination_country char(2),
  add column cuit_pais text,
  add column export_service boolean not null default false;

update public.organizations
set tax_id = '20-12345678-6'
where id = '55555555-5555-4555-8555-555555555555'
  and tax_id = '20-00000000-0';

update public.invoices as invoice
set destination_country = org.country,
    export_service = org.country <> 'AR'
from public.organizations as org
where org.id = invoice.organization_id
  and invoice.destination_country is null;

create or replace function public.prepare_invoice()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  org public.organizations%rowtype;
  expected text;
  pais text;
begin
  select * into org from public.organizations where id = new.organization_id;
  if not found then
    raise exception 'el comprobante no tiene cliente';
  end if;
  if org.country not in ('AR', 'PY', 'UY') then
    raise exception 'el cliente tiene que estar en Argentina, Paraguay o Uruguay';
  end if;
  if org.tax_id is null or btrim(org.tax_id) = '' then
    raise exception 'falta la identificación fiscal del cliente';
  end if;
  if new.fx_rate is null or new.fx_rate <= 0 then
    raise exception 'falta el tipo de cambio';
  end if;
  if abs(new.amount_ars - round(new.amount_usd * new.fx_rate, 2)) > 1 then
    raise exception 'los pesos no coinciden con el precio en dólares por el tipo de cambio';
  end if;

  new.destination_country := org.country;

  if org.country = 'AR' then
    expected := case when new.kind in ('NC_C', 'NC_E') then 'NC_C' else 'C' end;
    new.cuit_pais := null;
    new.export_service := false;
  else
    expected := case when new.kind in ('NC_C', 'NC_E') then 'NC_E' else 'E' end;
    new.export_service := true;
    pais := case
      when org.country = 'PY' and org.party = 'humana' then '50000000024'
      when org.country = 'PY' and org.party = 'otro' then '51600000024'
      when org.country = 'PY' then '55000000026'
      when org.country = 'UY' and org.party = 'humana' then '50000000016'
      when org.country = 'UY' and org.party = 'otro' then '51600000016'
      else '55000000018'
    end;
    new.cuit_pais := pais;
  end if;

  if new.kind::text <> expected then
    raise exception 'para un cliente % el comprobante es %, no %', org.country, expected, new.kind;
  end if;

  return new;
end;
$$;

drop trigger if exists invoices_prepare on public.invoices;
create trigger invoices_prepare
  before insert or update on public.invoices
  for each row execute function public.prepare_invoice();
