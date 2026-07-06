import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  GraduationCap,
  Landmark,
  Receipt,
  Rocket,
  Store,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type ProjectStatus = "Proyecto propio" | "En desarrollo";

type EcosystemApp = {
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  status: ProjectStatus;
  gradient: string;
  href: string;
};

const statusTone: Record<ProjectStatus, "green" | "violet"> = {
  "Proyecto propio": "green",
  "En desarrollo": "violet",
};

const ecosystemApps: EcosystemApp[] = [
  {
    icon: Landmark,
    category: "Gestión fiscal y administrativa",
    title: "Tribut.Ar",
    description:
      "Alta registral, IVA, Ganancias, Monotributo y Autónomos, e Ingresos Brutos de Misiones, simulados con la lógica real de cada trámite.",
    status: "Proyecto propio",
    gradient: "from-orbit-navy-600 to-orbit-sky-500",
    href: "https://tributar2026nuevo.vercel.app/",
  },
  {
    icon: Receipt,
    category: "Gestión comercial y operativa",
    title: "PyMEZ 360",
    description:
      "Ventas y compras con IVA, facturación A/B/C, cuentas bancarias y caja, conectado con el Punto de Venta de Tribut.Ar.",
    status: "Proyecto propio",
    gradient: "from-orbit-green-500 to-orbit-sky-500",
    href: "https://pymez-360.vercel.app/",
  },
  {
    icon: Wallet,
    category: "Liquidación de sueldos",
    title: "Sueldos 360",
    description:
      "Alta de empleados por convenio, liquidación mensual automática, cargas patronales y recibos de sueldo listos para imprimir.",
    status: "Proyecto propio",
    gradient: "from-orbit-violet-500 to-orbit-navy-600",
    href: "https://sueldos360.vercel.app/",
  },
  {
    icon: Rocket,
    category: "Planificación para emprendedores",
    title: "EmprendePlan",
    description:
      "Canvas de modelo de negocio interactivo, proyección de ingresos y costos, y una guía paso a paso para nuevos emprendimientos.",
    status: "Proyecto propio",
    gradient: "from-orbit-sky-500 to-orbit-green-400",
    href: "https://emprendeplan.vercel.app/",
  },
  {
    icon: FileText,
    category: "Documentación con IA",
    title: "Documentar",
    description:
      "Generación asistida de contratos, notas e informes administrativos, con plantillas listas y exportación a PDF profesional.",
    status: "Proyecto propio",
    gradient: "from-orbit-sky-600 to-orbit-navy-700",
    href: "https://documentar.vercel.app/",
  },
  {
    icon: GraduationCap,
    category: "Capacitación y cursos",
    title: "Campus Virtual GESTAR",
    description:
      "Cursos autoasistidos y gratuitos con certificado al completar. Algunos módulos todavía están en revisión.",
    status: "En desarrollo",
    gradient: "from-orbit-navy-700 to-orbit-violet-500",
    href: "https://campus-virtual-ens9-smoky.vercel.app/cursos",
  },
];

export function Proyectos() {
  return (
    <section id="proyectos" className="bg-orbit-gray-50 py-24 sm:py-28">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Proyectos"
          title="Mirá cómo trabajamos con negocios, con un ecosistema propio ya en producción."
          description="Armamos una demo interactiva de tienda digital y panel de gestión conectado para mostrarte el resultado. Y como prueba de que esto ya funciona en el mundo real: GEST-AR, el ecosistema que desarrollamos para la Escuela Normal Superior N°9 (Wanda, Misiones), con aplicaciones reales en uso hoy."
        />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-orbit-violet-500">
              Demo comercial · caso de ejemplo
            </span>
            <p className="text-sm text-orbit-gray-600">
              Todavía no representa a un cliente real: es una muestra de lo que construimos.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 rounded-3xl border border-orbit-sky-500/20 bg-gradient-to-br from-orbit-navy-950 to-orbit-navy-800 p-8 text-center sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orbit-sky-400/15 text-orbit-sky-300">
              <Store className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <Badge tone="sky" className="bg-orbit-sky-400/10 text-orbit-sky-300">
              Demo interactiva
            </Badge>
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Almacén La Esquina
            </h3>
            <p className="max-w-xl text-white/70">
              Un caso de ejemplo para mostrarte cómo funcionaría tu negocio digitalizado: catálogo,
              carrito, pago simulado y un panel de gestión que se actualiza solo con cada pedido.
            </p>
            <Button as={Link} href="/demos/almacen-la-esquina" variant="primary" size="lg">
              Probar la demo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-orbit-sky-600">
              Ecosistema GEST-AR · en uso real
            </span>
            <p className="text-sm text-orbit-gray-600">
              Cada tarjeta abre la aplicación en vivo en una pestaña nueva.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystemApps.map(({ icon: Icon, category, title, description, status, gradient, href }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-3xl border border-orbit-gray-200 bg-white shadow-sm shadow-orbit-navy-900/[0.03] transition-shadow hover:shadow-lg hover:shadow-orbit-navy-900/[0.06]"
              >
                <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${gradient}`}>
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 20%, white 0, transparent 45%), radial-gradient(circle at 80% 80%, white 0, transparent 40%)",
                    }}
                  />
                  <Icon className="h-11 w-11 text-white/90" strokeWidth={1.5} />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-orbit-sky-600">
                    {category}
                  </span>
                  <h3 className="text-base font-bold leading-snug text-orbit-navy-900">{title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-orbit-gray-600">{description}</p>
                  <div className="flex items-center justify-between gap-2">
                    <Badge tone={statusTone[status]}>{status}</Badge>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-orbit-sky-600 group-hover:underline">
                      Abrir app
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
