import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export function SobreOrbita() {
  return (
    <section id="sobre-orbita" className="bg-orbit-gray-50 py-24 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/*
          Espacio para foto profesional: reemplazar este bloque por
          <Image src="/brand/juan-manuel-gomez.jpg" ... /> cuando esté disponible.
          El diseño de la sección no depende de esta imagen.
        */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rounded-[2rem] border border-dashed border-orbit-navy-600/15" aria-hidden="true" />
          <div className="relative flex aspect-[4/5] flex-col items-center justify-center gap-4 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-orbit-navy-800 via-orbit-navy-700 to-orbit-sky-600 shadow-xl shadow-orbit-navy-900/15">
            <div className="pointer-events-none absolute inset-0 opacity-25" style={{
              backgroundImage: "radial-gradient(circle at 25% 20%, white 0, transparent 35%), radial-gradient(circle at 80% 75%, white 0, transparent 40%)",
            }} />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/25 bg-white/10 text-3xl font-extrabold text-white backdrop-blur-sm">
              JMG
            </div>
            <p className="relative px-6 text-center text-sm font-semibold text-white">
              Juan Manuel Gómez
            </p>
            <p className="relative px-8 text-center text-xs text-white/70">
              Fundador de ÓRBITA Digital
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Badge tone="navy" className="w-fit">
            Sobre ÓRBITA Digital
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-orbit-navy-900 text-balance sm:text-4xl">
            Tecnología, gestión y capacitación al servicio de las organizaciones.
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-orbit-gray-600 text-pretty">
            <p>
              Soy Juan Manuel Gómez, docente y profesional vinculado con la educación, la
              gestión y el desarrollo de soluciones digitales. Mi trabajo integra la creación de
              sitios web, aplicaciones de gestión, plataformas de capacitación y herramientas
              tecnológicas pensadas para resolver necesidades concretas de emprendedores,
              empresas e instituciones.
            </p>
            <p>
              Creo que la tecnología tiene más valor cuando ayuda a ordenar procesos, facilitar
              decisiones, mejorar la comunicación y generar oportunidades reales de crecimiento.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
