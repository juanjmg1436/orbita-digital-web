import Link from "next/link";
import { ArrowRight, Globe, GraduationCap, ShoppingCart, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type ServicePreview = {
  icon: LucideIcon;
  title: string;
};

const services: ServicePreview[] = [
  { icon: Globe, title: "Sitios web corporativos" },
  { icon: ShoppingCart, title: "Tiendas digitales a medida" },
  { icon: Workflow, title: "Sistemas y aplicaciones web" },
  { icon: GraduationCap, title: "Capacitación corporativa" },
];

export function ServiciosTeaser() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Servicios"
          title="Soluciones digitales para crecer y organizar mejor tu actividad."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-4 rounded-2xl border border-orbit-gray-200 bg-orbit-gray-50 p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orbit-navy-600/10 text-orbit-navy-600">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-bold leading-snug text-orbit-navy-900">{title}</p>
            </div>
          ))}
        </div>

        <Button as={Link} href="/servicios" variant="secondary" size="md" className="mx-auto">
          Ver todos los servicios
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Container>
    </section>
  );
}
