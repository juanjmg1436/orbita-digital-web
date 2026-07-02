import { Check, Globe, GraduationCap, ShoppingCart, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  highlight?: string;
};

const services: Service[] = [
  {
    icon: Globe,
    title: "Sitios web corporativos",
    description:
      "Diseñamos sitios web profesionales para empresas, comercios, instituciones y profesionales que necesitan comunicar sus servicios, generar confianza y facilitar el contacto con sus clientes.",
    features: [
      "Diseño adaptable a celular",
      "Información clara de servicios",
      "Formularios de contacto",
      "Botón de WhatsApp",
      "Integración con redes",
      "Ubicación o Google Maps",
      "Dominio y presencia profesional",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Tiendas digitales a medida",
    description:
      "Creamos tiendas online propias para que tu negocio pueda mostrar productos, recibir pedidos, gestionar stock y cobrar de manera digital.",
    features: [
      "Catálogo de productos",
      "Carrito de compras",
      "Gestión de pedidos",
      "Control de stock",
      "Variantes de productos",
      "Retiro en local",
      "Opciones de entrega",
      "Pago con Mercado Pago",
    ],
    highlight: "Tu negocio, tu marca, tu tienda. Sin depender de plataformas genéricas.",
  },
  {
    icon: Workflow,
    title: "Sistemas y aplicaciones web",
    description:
      "Desarrollamos herramientas digitales para ordenar procesos internos, centralizar información y simplificar tareas administrativas.",
    features: [
      "Gestión de clientes",
      "Pedidos",
      "Presupuestos",
      "Stock",
      "Formularios internos",
      "Registros administrativos",
      "Paneles de control",
      "Sistemas a medida",
    ],
  },
  {
    icon: GraduationCap,
    title: "Capacitación corporativa interna",
    description:
      "Creamos plataformas de capacitación para que las organizaciones puedan formar a sus equipos con cursos breves, actividades, evaluaciones y seguimiento.",
    features: [
      "Inducción de personal",
      "Procedimientos internos",
      "Atención al cliente",
      "Seguridad e higiene",
      "Uso de sistemas",
      "Capacitación comercial",
      "Cursos autoasistidos",
      "Registro de avance y certificación",
    ],
  },
];

export function Servicios() {
  return (
    <section id="servicios" className="bg-white py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Servicios"
          title="Soluciones digitales para crecer y organizar mejor tu actividad."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map(({ icon: Icon, title, description, features, highlight }) => (
            <article
              key={title}
              className="flex flex-col gap-5 rounded-3xl border border-orbit-gray-200 bg-white p-8 shadow-sm shadow-orbit-navy-900/[0.03] transition-shadow hover:shadow-lg hover:shadow-orbit-navy-900/[0.06]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orbit-navy-600/10 text-orbit-navy-600">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-orbit-navy-900">{title}</h3>
              <p className="text-sm leading-relaxed text-orbit-gray-600">{description}</p>

              <ul className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-orbit-navy-800">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-orbit-sky-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {highlight && (
                <p className="mt-1 rounded-xl bg-orbit-navy-950 px-4 py-3 text-sm font-semibold text-white">
                  {highlight}
                </p>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
