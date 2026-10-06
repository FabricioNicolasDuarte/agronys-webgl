-- Datos locales para probar acceso, comisión y reparto.
-- Contraseña de las cinco cuentas: agronys-local
-- El tipo de cambio 1400 es de demostración, no es el del Banco Nación.

create extension if not exists pgcrypto with schema extensions;

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, email_change, email_change_token_new, recovery_token
) values
  (
    '00000000-0000-0000-0000-000000000000',
    '11111111-1111-4111-8111-111111111111',
    'authenticated', 'authenticated', 'fabricio@agronys.local',
    extensions.crypt('agronys-local', extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Fabricio Duarte"}', now(), now(), '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-4222-8222-222222222222',
    'authenticated', 'authenticated', 'vendedor@agronys.local',
    extensions.crypt('agronys-local', extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Vendedor Demo"}', now(), now(), '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '33333333-3333-4333-8333-333333333333',
    'authenticated', 'authenticated', 'admin@agronys.local',
    extensions.crypt('agronys-local', extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Colaborador Demo"}', now(), now(), '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '66666666-6666-4666-8666-666666666666',
    'authenticated', 'authenticated', 'socio@agronys.local',
    extensions.crypt('agronys-local', extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Socio Demo"}', now(), now(), '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '44444444-4444-4444-8444-444444444444',
    'authenticated', 'authenticated', 'cliente@agronys.local',
    extensions.crypt('agronys-local', extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Cliente Demo"}', now(), now(), '', '', '', ''
  );

insert into auth.identities (
  id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
)
select
  id,
  id,
  jsonb_build_object('sub', id::text, 'email', email),
  'email',
  id::text,
  now(), now(), now()
from auth.users
where email like '%@agronys.local';

insert into public.organizations (id, legal_name, country, tax_id)
values (
  '55555555-5555-4555-8555-555555555555',
  'Estancia Demo',
  'AR',
  '20-12345678-6'
);

update public.profiles
set role = 'superadmin', full_name = 'Fabricio Duarte'
where id = '11111111-1111-4111-8111-111111111111';

update public.profiles
set full_name = 'Vendedor Demo'
where id = '22222222-2222-4222-8222-222222222222';

update public.profiles
set full_name = 'Colaborador Demo'
where id = '33333333-3333-4333-8333-333333333333';

update public.profiles
set full_name = 'Socio Demo'
where id = '66666666-6666-4666-8666-666666666666';

update public.profiles
set role = 'client', full_name = 'Cliente Demo', organization_id = '55555555-5555-4555-8555-555555555555'
where id = '44444444-4444-4444-8444-444444444444';

update public.products
set suggested_price_usd = 3000
where slug in ('nutrogan', 'sigag', 'potrero');

insert into public.products (id, slug, name, line, kind, suggested_price_usd)
values (
  '77777777-7777-4777-8777-777777777777',
  'app-norte',
  'App Norte',
  'mixto',
  'catalog',
  6000
);

insert into public.product_collaborators (product_id, profile_id)
values
  ('77777777-7777-4777-8777-777777777777', '11111111-1111-4111-8111-111111111111'),
  ('77777777-7777-4777-8777-777777777777', '33333333-3333-4333-8333-333333333333'),
  ('77777777-7777-4777-8777-777777777777', '66666666-6666-4666-8666-666666666666');

update public.products
set kind = 'codeveloped'
where id = '77777777-7777-4777-8777-777777777777';

insert into public.deals (
  id, product_id, organization_id, seller_id, status,
  suggested_price_usd, sold_price_usd, discount_approved
)
select
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
  id,
  '55555555-5555-4555-8555-555555555555',
  '22222222-2222-4222-8222-222222222222',
  'paid',
  3000, 4000, false
from public.products where slug = 'nutrogan';

insert into public.deals (
  id, product_id, organization_id, seller_id, status,
  suggested_price_usd, sold_price_usd, discount_approved
)
select
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
  id,
  '55555555-5555-4555-8555-555555555555',
  '11111111-1111-4111-8111-111111111111',
  'paid',
  3000, 4000, false
from public.products where slug = 'sigag';

insert into public.deals (
  id, product_id, organization_id, seller_id, status,
  suggested_price_usd, sold_price_usd, discount_approved
)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
  '77777777-7777-4777-8777-777777777777',
  '55555555-5555-4555-8555-555555555555',
  '11111111-1111-4111-8111-111111111111',
  'paid',
  6000, 6000, false
);

insert into public.deals (
  id, product_id, organization_id, seller_id, status, suggested_price_usd
)
select
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4',
  id,
  '55555555-5555-4555-8555-555555555555',
  '22222222-2222-4222-8222-222222222222',
  'assigned',
  3000
from public.products where slug = 'potrero';

insert into public.invoices (
  id, deal_id, organization_id, kind, point_of_sale, number, cae,
  amount_usd, amount_ars, fx_rate
) values
  (
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
    '55555555-5555-4555-8555-555555555555',
    'C', 1, 1, 'DEMO-CAE-1', 4000, 5600000, 1400
  ),
  (
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
    '55555555-5555-4555-8555-555555555555',
    'C', 1, 2, 'DEMO-CAE-2', 4000, 5600000, 1400
  ),
  (
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    '55555555-5555-4555-8555-555555555555',
    'C', 1, 3, 'DEMO-CAE-3', 6000, 8400000, 1400
  );

insert into public.payments (invoice_id, amount_ars, withholding_ars, method, behavior)
values
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1', 5600000, 0, 'transferencia', 'acreditó a las 48 horas'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2', 5600000, 0, 'transferencia', 'acreditó el mismo día'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3', 8400000, 0, 'transferencia', 'acreditó a la semana');

insert into public.infrastructure_costs (period, amount_usd, note)
values (date '2026-10-01', 150, 'hosting y base del mes, demostración');

insert into public.demos (organization_id, product_id, expires_at, granted_by)
select
  '55555555-5555-4555-8555-555555555555',
  id,
  now() + interval '30 days',
  '11111111-1111-4111-8111-111111111111'
from public.products
where slug = 'nutrogan';

select set_config('agronys.settle', 'on', true);

insert into public.payouts (deal_id, payee_id, kind, amount_usd)
values
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
    '22222222-2222-4222-8222-222222222222',
    'sales_commission',
    1000
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    '11111111-1111-4111-8111-111111111111',
    'dev_split',
    2000
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    '33333333-3333-4333-8333-333333333333',
    'dev_split',
    2000
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    '66666666-6666-4666-8666-666666666666',
    'dev_split',
    2000
  );
