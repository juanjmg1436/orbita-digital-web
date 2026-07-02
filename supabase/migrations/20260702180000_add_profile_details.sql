-- ÓRBITA Digital — respuestas de perfil personalizadas por tipo de servicio
-- Se guardan como JSON (pregunta -> respuesta) para acompañar cada consulta
-- con contexto adicional según lo que haya elegido la persona en "Tipo de servicio".

alter table public.contact_requests
  add column if not exists profile_details jsonb;

comment on column public.contact_requests.profile_details is
  'Respuestas a las preguntas de perfil según el tipo de servicio elegido (pregunta -> respuesta). Puede ser null.';
