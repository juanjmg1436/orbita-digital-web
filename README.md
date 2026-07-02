# ÓRBITA Digital — Sitio institucional

Sitio web institucional de **ÓRBITA Digital**, marca de servicios digitales dedicada a
crear sitios web, tiendas digitales, sistemas de gestión y plataformas de capacitación
para emprendedores, empresas, organizaciones e instituciones educativas.

> Tecnología para vender, organizar y crecer.

## Stack técnico

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (formulario de contacto)
- [Zod](https://zod.dev/) (validación de formularios)
- [Lucide React](https://lucide.dev/) (íconos)
- Desplegado en [Vercel](https://vercel.com/)

## Requisitos previos

- Node.js 20 o superior
- Una cuenta de Supabase con un proyecto creado

## Puesta en marcha local

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Copiar el archivo de variables de entorno y completarlo con tus credenciales:

   ```bash
   cp .env.example .env.local
   ```

   Ver la sección [Variables de entorno](#variables-de-entorno) para saber de dónde
   obtener cada valor.

3. Levantar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Comando         | Descripción                                   |
| ---------------- | ---------------------------------------------- |
| `npm run dev`    | Servidor de desarrollo con recarga en caliente |
| `npm run build`  | Build de producción                            |
| `npm run start`  | Sirve el build de producción localmente        |
| `npm run lint`   | Corre ESLint sobre el proyecto                 |

## Variables de entorno

Todas las variables están documentadas en [`.env.example`](./.env.example). Nunca subas
`.env.local` ni ningún archivo con credenciales reales al repositorio (ya están
ignorados en `.gitignore`).

| Variable                        | Dónde conseguirla                                                   | ¿Pública? |
| -------------------------------- | -------------------------------------------------------------------- | --------- |
| `NEXT_PUBLIC_SUPABASE_URL`       | Supabase → Project Settings → API → Project URL                     | Sí        |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | Supabase → Project Settings → API → anon public                     | Sí        |
| `SUPABASE_SERVICE_ROLE_KEY`      | Supabase → Project Settings → API → service_role                    | **No**    |
| `NEXT_PUBLIC_SITE_URL`           | URL pública del sitio (Vercel o dominio propio, sin barra final)     | Sí        |
| `RESEND_API_KEY`                | [resend.com](https://resend.com) → API Keys (opcional)              | **No**    |

`SUPABASE_SERVICE_ROLE_KEY` no se usa en la versión actual del sitio (el formulario de
contacto inserta datos usando la clave anónima, protegida por Row Level Security). Queda
reservada para una futura funcionalidad de administración segura del lado del servidor.
**Nunca** debe exponerse en el navegador ni usarse en variables `NEXT_PUBLIC_*`.

`RESEND_API_KEY` es opcional: si no está configurada, el formulario de contacto sigue
guardando las consultas en Supabase con total normalidad, simplemente no se envía el
aviso por email. Ver [Aviso por email de consultas nuevas](#aviso-por-email-de-consultas-nuevas).

## Estructura del proyecto

```text
src/
  app/                    Rutas de Next.js (App Router), una carpeta por página
    layout.tsx             Layout raíz: fuentes, metadata SEO, Navbar/Footer
    page.tsx                Inicio (hero + resumen de servicios + diferencial + CTA)
    servicios/page.tsx      Servicios + tienda digital destacada
    soluciones/page.tsx     Soluciones por tipo de organización
    proyectos/page.tsx      Proyectos demo
    sobre-orbita/page.tsx   Sobre ÓRBITA Digital + proceso de trabajo
    contacto/page.tsx       Formulario de contacto
    sitemap.ts, robots.ts   SEO
    opengraph-image.tsx     Imagen para redes sociales (Open Graph / Twitter)
    icon.png, apple-icon.png  Favicon (ícono de ÓRBITA Digital)
    not-found.tsx           Página 404
  components/
    brand/                 Logo de ÓRBITA Digital (variantes ícono / ícono+texto / +eslogan)
    layout/                Navbar y Footer
    sections/               Cada sección, reutilizada entre páginas (Hero, Servicios, Soluciones, etc.)
    ui/                     Componentes reutilizables (Button, Container, Badge, etc.)
    icons/                  Íconos de redes sociales y WhatsApp
  lib/
    config.ts               Archivo central de configuración (ver más abajo)
    validation.ts            Esquema de validación del formulario de contacto (Zod)
    rate-limit.ts             Límite simple de solicitudes anti-spam
    actions/contact.ts        Server Action que procesa el formulario de contacto
    supabase/server.ts        Cliente de Supabase para uso en el servidor
    quote-profile.ts          Preguntas de perfil según el tipo de servicio elegido
supabase/
  migrations/               Migración SQL de la tabla contact_requests + políticas RLS
public/
  brand/                    Assets oficiales de marca (ícono transparente, logotipo)
```

## Cómo editar el sitio

### Datos de contacto, enlaces, colores y textos principales

Todo lo que se cambia con frecuencia está centralizado en
[`src/lib/config.ts`](./src/lib/config.ts):

- **WhatsApp y email**: `contact.whatsappNumber`, `contact.whatsappDisplay`,
  `contact.email`. El sitio se entrega con valores de ejemplo (marcados con `TODO`):
  reemplazalos antes de publicar.
- **Redes sociales**: `socialLinks`. Dejá vacío (`""`) el enlace que no tengas: el ícono
  correspondiente no se muestra en el footer hasta que cargues una URL real.
- **Navegación**: `nav` (enlaces de la barra superior).
- **Tipos de servicio del formulario**: `serviceTypes`.
- **Slogan y frases institucionales**: `brand.slogan`, `brand.institutionalPhrase`,
  `brand.description`.

### Colores de marca

La paleta vive como variables CSS en [`src/app/globals.css`](./src/app/globals.css),
dentro del bloque `:root` (prefijo `--color-orbit-*`). Fue extraída del ícono oficial de
ÓRBITA Digital (azul profundo y celeste), con acentos en violeta suave y verde
tecnológico. Cambiar un valor ahí actualiza el color en todo el sitio.

### Logo e ícono de marca

El ícono transparente oficial está en `public/brand/orbita-icon.png` y se usa sin
recortes, deformaciones ni fondos agregados (favicon, navbar, footer, hero, página 404,
imagen Open Graph). El componente [`src/components/brand/Logo.tsx`](./src/components/brand/Logo.tsx)
combina ese ícono con el texto "ÓRBITA Digital" y admite tres variantes:

- `icon` — solo el ícono.
- `icon-text` — ícono + nombre (usado en la navbar).
- `full` — ícono + nombre + eslogan (usado en el footer).

### Textos de las secciones

El contenido de cada sección (títulos, descripciones, tarjetas de servicios, pasos del
proceso, proyectos demo, etc.) vive directamente en los componentes dentro de
`src/components/sections/`, cada uno con un nombre descriptivo de la sección que
representa.

## Supabase: formulario de contacto

Las consultas del formulario de contacto se guardan en la tabla `contact_requests`
(ver la migración en [`supabase/migrations/`](./supabase/migrations/)).

**Columnas**: `id`, `created_at`, `full_name`, `organization`, `whatsapp`, `email`,
`service_type`, `message`, `status` (inicia siempre en `nuevo`), `profile_details`
(JSON opcional con las respuestas a las preguntas personalizadas según el tipo de
servicio elegido — ver [`src/lib/quote-profile.ts`](./src/lib/quote-profile.ts)).

**Row Level Security**:

- Los visitantes (rol `anon`) pueden **insertar** consultas.
- Nadie puede leer, editar ni eliminar consultas de forma pública. La lectura queda
  reservada para una futura administración autenticada.

**Protección anti-spam**: honeypot (campo oculto invisible para personas), control de
tiempo mínimo de llenado y límite simple de solicitudes por IP, implementados en
[`src/lib/actions/contact.ts`](./src/lib/actions/contact.ts).

Si necesitás replicar la tabla en otro proyecto de Supabase, corré el contenido de
`supabase/migrations/20260702130000_create_contact_requests.sql` en el SQL Editor del
proyecto, o usá la [Supabase CLI](https://supabase.com/docs/guides/local-development)
si preferís un flujo de migraciones local.

## Aviso por email de consultas nuevas

Cada vez que alguien completa el formulario de contacto, además de guardarse en
Supabase, se envía un email de aviso (vía [Resend](https://resend.com)) a la dirección
configurada en `contact.email` dentro de [`src/lib/config.ts`](./src/lib/config.ts),
con los datos de la consulta y las respuestas de perfil si las hubo.

Para activarlo:

1. Creá una cuenta gratuita en [resend.com](https://resend.com).
2. Generá una API Key en **API Keys** dentro del dashboard.
3. Cargala como `RESEND_API_KEY` en `.env.local` (desarrollo) y en las variables de
   entorno de Vercel (producción).

Sin esa variable configurada, el formulario sigue funcionando exactamente igual: la
consulta se guarda en Supabase, simplemente no se envía el email. La lógica está en
[`src/lib/email.ts`](./src/lib/email.ts).

Los emails se envían desde la dirección de prueba `onboarding@resend.dev` de Resend.
Para enviarlos desde un dominio propio (por ejemplo `contacto@orbitadigital.com.ar`),
hay que verificar ese dominio en **Domains** dentro de Resend y actualizar el campo
`from` en `src/lib/email.ts`.

## Despliegue en Vercel

1. Importá el repositorio de GitHub en [Vercel](https://vercel.com/new).
2. Configurá las variables de entorno (ver tabla de arriba) en
   **Project Settings → Environment Variables**.
3. Desplegá. Vercel detecta Next.js automáticamente.
4. Una vez que tengas la URL de producción (o un dominio propio), actualizá
   `NEXT_PUBLIC_SITE_URL` en Vercel y volvé a desplegar para que el SEO
   (sitemap, Open Graph, metadatos) apunte a la URL correcta.

### Dominio propio

Desde **Project Settings → Domains** en Vercel podés agregar tu dominio y seguir las
instrucciones para apuntar los DNS. Recordá actualizar `NEXT_PUBLIC_SITE_URL` con el
dominio final.

## SEO y rendimiento

- Metadata, Open Graph y Twitter Card configurados en `src/app/layout.tsx`.
- Imagen social generada dinámicamente con la identidad de marca
  (`src/app/opengraph-image.tsx`).
- `sitemap.xml` y `robots.txt` generados automáticamente.
- Favicon e ícono de apple-touch basados en el ícono oficial de ÓRBITA Digital.
- Imágenes optimizadas con `next/image`.

## Licencia y uso

Código de uso interno de ÓRBITA Digital. Todos los derechos reservados.
