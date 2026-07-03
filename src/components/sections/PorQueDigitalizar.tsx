import { Clock, MessageCircleMore, ShieldCheck, Timer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    icon: Clock,
    title: "Vendé incluso cuando no estás",
    description:
      "Con una tienda digital tus clientes pueden ver productos y hacer pedidos a cualquier hora, no solo cuando el local está abierto. Cada visita fuera de horario es una venta que ya no se pierde.",
  },
  {
    icon: MessageCircleMore,
    title: "No perdés clientes por tardar en responder",
    description:
      "Un sitio claro con botón de WhatsApp hace que alguien interesado te encuentre y te escriba en el momento, en lugar de seguir buscando en otro lado mientras lo pensás.",
  },
  {
    icon: Timer,
    title: "Menos tiempo perdido en tareas repetitivas",
    description:
      "Ordenar pedidos, stock o clientes en un sistema simple te libera tiempo del día a día para ocuparte de las decisiones que realmente hacen crecer tu negocio.",
  },
  {
    icon: ShieldCheck,
    title: "Más confianza, más contacto",
    description:
      "Un sitio prolijo y profesional transmite seriedad. La gente se anima a escribirte y a comprar cuando siente que del otro lado hay algo confiable.",
  },
];

export function PorQueDigitalizar() {
  return (
    <section className="bg-orbit-gray-50 py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Por qué digitalizar"
          title="La tecnología, bien usada, se nota en las ventas y en el orden del día a día."
          description="No hace falta ser una empresa grande para aprovecharla: alcanza con que la herramienta esté pensada para cómo trabajás vos."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-4 rounded-3xl border border-orbit-gray-200 bg-white p-7"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orbit-sky-500/10 text-orbit-sky-600">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold leading-snug text-orbit-navy-900">{title}</h3>
                <p className="text-sm leading-relaxed text-orbit-gray-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
