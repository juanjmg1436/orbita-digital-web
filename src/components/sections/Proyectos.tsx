import {
  ClipboardList,
  FlaskConical,
  GraduationCap,
  LayoutDashboard,
  Rocket,
  School,
  ShoppingCart,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";

type ProjectStatus = "Proyecto desarrollado" | "Demo funcional" | "En desarrollo";

type Project = {
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  status: ProjectStatus;
  gradient: string;
};

const statusTone: Record<ProjectStatus, "green" | "sky" | "violet"> = {
  "Proyecto desarrollado": "green",
  "Demo funcional": "sky",
  "En desarrollo": "violet",
};

const projects: Project[] = [
  {
    icon: GraduationCap,
    category: "Plataformas de capacitación autoasistida",
    title: "Campus de inducción y procedimientos internos",
    description:
      "Cursos breves, actividades y evaluaciones para formar equipos de trabajo con seguimiento de avance.",
    status: "Demo funcional",
    gradient: "from-orbit-navy-600 to-orbit-sky-500",
  },
  {
    icon: FlaskConical,
    category: "Simuladores administrativos",
    title: "Simulador de trámites y gestión administrativa",
    description:
      "Entorno interactivo para practicar procesos administrativos antes de aplicarlos en un sistema real.",
    status: "Demo funcional",
    gradient: "from-orbit-violet-500 to-orbit-navy-600",
  },
  {
    icon: Users,
    category: "Sistemas de recursos humanos",
    title: "Sistema de gestión de personal",
    description:
      "Registro de legajos, licencias y seguimiento de capacitaciones del equipo de trabajo.",
    status: "En desarrollo",
    gradient: "from-orbit-sky-500 to-orbit-green-400",
  },
  {
    icon: LayoutDashboard,
    category: "Aplicaciones de gestión",
    title: "Panel de gestión de pedidos y stock",
    description:
      "Aplicación para centralizar pedidos, clientes y control de inventario en un solo lugar.",
    status: "Proyecto desarrollado",
    gradient: "from-orbit-navy-700 to-orbit-violet-500",
  },
  {
    icon: Rocket,
    category: "Herramientas para emprendedores",
    title: "Catálogo y tienda digital para emprendimientos",
    description:
      "Tienda online con carrito, pedidos y cobro digital pensada para pequeños negocios.",
    status: "Proyecto desarrollado",
    gradient: "from-orbit-green-500 to-orbit-sky-500",
  },
  {
    icon: School,
    category: "Sitios institucionales educativos",
    title: "Sitio institucional para instituciones educativas",
    description:
      "Presencia digital clara con información institucional, novedades y canales de contacto.",
    status: "Proyecto desarrollado",
    gradient: "from-orbit-sky-600 to-orbit-navy-700",
  },
  {
    icon: ShoppingCart,
    category: "Soluciones de comercio digital",
    title: "Tienda digital con Mercado Pago integrado",
    description:
      "Cobro digital, gestión de pedidos y actualización automática de stock ante cada venta.",
    status: "Demo funcional",
    gradient: "from-orbit-violet-500 to-orbit-sky-400",
  },
  {
    icon: ClipboardList,
    category: "Sistemas de registro y organización",
    title: "Sistema de registro y turnos",
    description:
      "Organización de solicitudes, turnos o inscripciones con seguimiento de estado en tiempo real.",
    status: "En desarrollo",
    gradient: "from-orbit-navy-600 to-orbit-green-400",
  },
];

export function Proyectos() {
  return (
    <section id="proyectos" className="bg-orbit-gray-50 py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Proyectos"
          title="Proyectos que integran tecnología, educación y gestión."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map(({ icon: Icon, category, title, description, status, gradient }) => (
            <article
              key={title}
              className="flex flex-col overflow-hidden rounded-3xl border border-orbit-gray-200 bg-white shadow-sm shadow-orbit-navy-900/[0.03] transition-shadow hover:shadow-lg hover:shadow-orbit-navy-900/[0.06]"
            >
              <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${gradient}`}>
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: "radial-gradient(circle at 20% 20%, white 0, transparent 45%), radial-gradient(circle at 80% 80%, white 0, transparent 40%)",
                }} />
                <Icon className="h-11 w-11 text-white/90" strokeWidth={1.5} />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-orbit-sky-600">
                  {category}
                </span>
                <h3 className="text-base font-bold leading-snug text-orbit-navy-900">{title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-orbit-gray-600">{description}</p>
                <Badge tone={statusTone[status]} className="w-fit">
                  {status}
                </Badge>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto max-w-2xl text-center text-sm text-orbit-gray-600">
          Algunos proyectos se encuentran en etapa de desarrollo, implementación o demostración.
        </p>
      </Container>
    </section>
  );
}
