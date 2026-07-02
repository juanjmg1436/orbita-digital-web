import { Ear, FlaskConical, PencilRuler, Rocket, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = {
  icon: LucideIcon;
  title: string;
};

const steps: Step[] = [
  { icon: Ear, title: "Escuchamos tu necesidad" },
  { icon: Search, title: "Analizamos cómo funciona tu negocio u organización" },
  { icon: PencilRuler, title: "Diseñamos una propuesta adaptada" },
  { icon: FlaskConical, title: "Desarrollamos y probamos la solución" },
  { icon: Rocket, title: "Te acompañamos en la puesta en marcha" },
];

export function Proceso() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Proceso de trabajo"
          title="De la idea a una solución digital concreta."
          description="No se trata solo de tener una página web. Se trata de crear una herramienta útil para vender, organizar procesos, mejorar la comunicación o capacitar personas."
        />

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          <div
            className="absolute top-6 left-0 hidden h-px w-full bg-gradient-to-r from-orbit-gray-200 via-orbit-sky-300 to-orbit-gray-200 lg:block"
            aria-hidden="true"
          />
          {steps.map(({ icon: Icon, title }, index) => (
            <div key={title} className="relative flex flex-col items-start gap-4 lg:items-center lg:text-center">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orbit-navy-600 text-white shadow-md shadow-orbit-navy-600/25">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-2 lg:flex-col lg:gap-1">
                <span className="text-xs font-bold uppercase tracking-wider text-orbit-sky-600">
                  Paso {index + 1}
                </span>
              </div>
              <p className="text-sm font-semibold leading-snug text-orbit-navy-900 text-balance">
                {title}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
