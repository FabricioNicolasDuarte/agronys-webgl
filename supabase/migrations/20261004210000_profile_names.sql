-- Quien ve una venta o un co-desarrollo puede leer el nombre de quien participa.
-- No abre el resto de las cuentas: el cliente sigue viendo solo la propia.

create policy profiles_workmates on public.profiles
  for select using (
    exists (
      select 1
      from public.deals d
      where d.seller_id = profiles.id
        and d.status <> 'draft'
        and (
          d.seller_id = auth.uid()
          or exists (
            select 1
            from public.product_collaborators c
            where c.product_id = d.product_id
              and c.profile_id = auth.uid()
          )
        )
    )
    or exists (
      select 1
      from public.product_collaborators mine
      join public.product_collaborators theirs
        on theirs.product_id = mine.product_id
      where mine.profile_id = auth.uid()
        and theirs.profile_id = profiles.id
    )
  );
