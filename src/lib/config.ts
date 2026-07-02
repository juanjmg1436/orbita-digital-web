/**
 * Configuración centralizada de ÓRBITA Digital.
 *
 * Editá este archivo para actualizar datos de contacto, enlaces, colores de marca
 * y textos institucionales sin tener que buscar en los componentes.
 *
 * IMPORTANTE: los campos marcados con "TODO" son placeholders. Reemplazalos por
 * los datos reales antes de publicar el sitio en producción.
 */

export const siteConfig = {
  brand: {
    name: "ÓRBITA Digital",
    shortName: "ÓRBITA",
    slogan: "Tecnología para vender, organizar y crecer.",
    institutionalPhrase: "Soluciones digitales para negocios y organizaciones.",
    description:
      "Creamos sitios web, tiendas digitales, sistemas de gestión y plataformas de capacitación para negocios, organizaciones e instituciones.",
  },

  // URL pública del sitio. Se actualiza automáticamente en Vercel mediante la
  // variable de entorno NEXT_PUBLIC_SITE_URL. En desarrollo local cae en localhost.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  contact: {
    // Formato sin espacios ni símbolos, con código de país + 9 (Argentina, línea móvil).
    whatsappNumber: "5493757516108",
    whatsappDisplay: "+54 9 3757 51-6108",
    whatsappDefaultMessage:
      "Hola ÓRBITA Digital, quiero hacer una consulta sobre sus servicios.",
    email: "juanjmg1436@gmail.com",
  },

  // Redes sociales: dejá vacío ("") el enlace que todavía no exista.
  // El footer y las secciones solo muestran los íconos de las redes con URL cargada.
  socialLinks: {
    instagram: "",
    linkedin: "",
    facebook: "",
  },

  nav: [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Soluciones", href: "/soluciones" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Sobre ÓRBITA", href: "/sobre-orbita" },
    { label: "FAQ", href: "/preguntas-frecuentes" },
    { label: "Contacto", href: "/contacto" },
  ],

  ctaPrimary: {
    label: "Solicitar presupuesto",
    href: "/contacto",
  },

  serviceTypes: [
    { value: "sitio-web-corporativo", label: "Sitio web corporativo" },
    { value: "tienda-digital", label: "Tienda digital a medida" },
    { value: "sistema-aplicacion", label: "Sistema o aplicación web" },
    { value: "capacitacion-corporativa", label: "Capacitación corporativa" },
    { value: "proyecto-educativo", label: "Proyecto educativo" },
    { value: "otro", label: "Otro" },
  ],

  legal: {
    text: "Todos los derechos reservados.",
  },
} as const;

export type ServiceTypeValue = (typeof siteConfig.serviceTypes)[number]["value"];

export function getWhatsAppLink(message?: string) {
  const text = encodeURIComponent(message ?? siteConfig.contact.whatsappDefaultMessage);
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`;
}
