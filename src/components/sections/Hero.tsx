import { ArrowRight, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { siteConfig } from "@/lib/config";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-orbit-navy-950 pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Fondo abstracto: degradados y grilla sutil */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 -top-20 h-96 w-96 rounded-full bg-orbit-navy-600/40 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-orbit-sky-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-orbit-violet-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
      </div>

      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="flex flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orbit-sky-300">
            <Compass className="h-3.5 w-3.5" />
            {siteConfig.brand.institutionalPhrase}
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white text-balance sm:text-5xl lg:text-[3.4rem]">
            Impulsamos negocios y organizaciones con soluciones digitales a medida.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-white/70 text-pretty">
            Creamos sitios web, tiendas digitales, sistemas de gestión y plataformas de
            capacitación para ayudarte a vender, organizar procesos y crecer.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button as="a" href={siteConfig.ctaPrimary.href} variant="primary" size="lg">
              Solicitar presupuesto
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href="#servicios" variant="ghost" size="lg">
              Ver soluciones
            </Button>
          </div>

          <p className="pt-2 text-sm font-medium text-white/45">
            Tecnología pensada para necesidades reales.
          </p>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
