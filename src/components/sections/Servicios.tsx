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
      "Tu sitio web suele ser la primera impresión que se lleva un cliente. Lo diseñamos para que se vea profesional, cuente con claridad lo que ofrecés y le facilite encontrarte y escribirte, desde la computadora o el celular.",
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
      "Vender por internet no debería depender de una plataforma ajena. Creamos una tienda propia, con tu identidad, para que puedas mostrar tus productos, recibir pedidos y cobrar online sin complicarte.",
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
      "Cuando la información vive repartida en planillas, cuadernos o mensajes sueltos, es fácil perder el control. Desarrollamos herramientas simples para ordenar tus procesos internos y tener todo a mano cuando lo necesites.",
    features: [
      "Gestión de clientes",
      "Pedidos",
      "Presupuestos",
      "Stock",
      "Formularios internos",
      "Registros administrativos",
      "Paneles de control",
      "Adaptado a tu forma de trabajar",
    ],
  },
  {
    icon: GraduationCap,
    title: "Capacitación corporativa interna",
    description:
      "Formar a un equipo lleva tiempo y no siempre es fácil de sostener en el día a día. Creamos plataformas de capacitación con cursos breves y seguimiento, para que cada persona aprenda a su ritmo sin frenar el trabajo.",
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
