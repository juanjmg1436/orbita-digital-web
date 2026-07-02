import { Cog, Handshake, LayoutTemplate, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Differentiator = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const differentiators: Differentiator[] = [
  {
    icon: Target,
    title: "Soluciones adaptadas a cada organización",
    description: "Cada proyecto parte de tu forma real de trabajar, no de una plantilla genérica.",
  },
  {
    icon: LayoutTemplate,
    title: "Diseño claro y fácil de usar",
    description: "Pantallas simples que cualquier persona del equipo puede aprender a usar en minutos, sin necesitar ayuda técnica.",
  },
  {
    icon: Cog,
    title: "Tecnología pensada para procesos reales",
    description: "Cada herramienta resuelve una tarea concreta de tu día a día, sin funciones de más que solo compliquen las cosas.",
  },
  {
    icon: Handshake,
    title: "Acompañamiento durante la implementación",
    description: "Te acompañamos en la puesta en marcha y en los primeros pasos de uso.",
  },
];

export function Diferencial() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Diferencial"
          title="No solo desarrollamos tecnología: entendemos cómo funcionan las organizaciones."
          description="ÓRBITA Digital integra desarrollo web, gestión administrativa y experiencia en capacitación para crear soluciones claras, útiles y sostenibles en el tiempo."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-3xl border border-orbit-gray-200 bg-orbit-gray-50 p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orbit-navy-600 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold leading-snug text-orbit-navy-900">{title}</h3>
              <p className="text-sm leading-relaxed text-orbit-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
