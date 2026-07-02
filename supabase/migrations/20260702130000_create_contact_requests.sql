-- ÓRBITA Digital — tabla de consultas del formulario de contacto
-- Los visitantes pueden insertar (rol anon). Nadie puede leer, editar ni
-- eliminar públicamente: la lectura queda reservada para una futura
-- administración autenticada (a implementar con service_role o políticas
-- adicionales para el rol authenticated).

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  organization text check (organization is null or char_length(organization) <= 160),
  whatsapp text not null check (char_length(trim(whatsapp)) between 6 and 30),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  service_type text not null check (service_type in (
    'sitio-web-corporativo',
    'tienda-digital',
    'sistema-aplicacion',
    'capacitacion-corporativa',
    'proyecto-educativo',
    'otro'
  )),
  message text not null check (char_length(trim(message)) between 10 and 2000),
  status text not null default 'nuevo' check (status in ('nuevo', 'en_proceso', 'atendido', 'descartado'))
);

comment on table public.contact_requests is
  'Consultas enviadas desde el formulario de contacto público de ÓRBITA Digital.';

create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);

alter table public.contact_requests enable row level security;

-- Los visitantes (rol anon) pueden insertar consultas, siempre que el
-- estado inicial sea 'nuevo'. No existen políticas de select/update/delete
-- para anon ni authenticated, por lo que esas operaciones quedan bloqueadas
-- por defecto hasta que se implemente una administración segura.
create policy "contact_requests_insert_public"
  on public.contact_requests
  for insert
  to anon
  with check (status = 'nuevo');
