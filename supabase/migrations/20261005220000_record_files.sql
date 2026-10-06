-- Archivos de la operación. No son públicos.
-- El comprobante de la factura lo puede bajar el cliente de ese establecimiento.
-- La factura del colaborador la ve quien la cobra y el superadmin.
-- El medio de pago, la constancia fiscal y la factura de infraestructura quedan en la casa.

insert into storage.buckets (id, name, public)
values ('records', 'records', false)
on conflict (id) do nothing;

create table public.record_files (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  owner_id uuid not null,
  storage_path text not null,
  file_name text not null,
  mime text not null,
  created_by uuid not null references public.profiles (id),
  created_at timestamptz not null default now(),
  unique (kind, owner_id),
  constraint record_files_kind_chk check (kind in ('invoice', 'payment', 'fiscal', 'infra', 'payout'))
);

alter table public.record_files enable row level security;

create policy record_files_superadmin on public.record_files
  for all
  using (public.is_superadmin())
  with check (public.is_superadmin());

create policy record_files_client_invoice on public.record_files
  for select
  using (
    kind = 'invoice'
    and exists (
      select 1
      from public.invoices
      join public.profiles me on me.id = auth.uid()
      where invoices.id = owner_id
        and me.role = 'client'
        and me.organization_id = invoices.organization_id
    )
  );

create policy record_files_payee on public.record_files
  for select
  using (
    kind = 'payout'
    and exists (
      select 1 from public.payouts
      where payouts.id = owner_id
        and payouts.payee_id = auth.uid()
    )
  );

create policy record_files_payee_write on public.record_files
  for insert
  with check (
    kind = 'payout'
    and created_by = auth.uid()
    and exists (
      select 1 from public.payouts
      where payouts.id = owner_id
        and payouts.payee_id = auth.uid()
    )
  );
