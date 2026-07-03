import Image from "next/image";
import { Store, LayoutDashboard, ClipboardList, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Satellite = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  top: string;
  left: string;
  delay: string;
};

const satellites: Satellite[] = [
  {
    icon: Store,
    title: "Tienda digital",
    subtitle: "Catálogo y carrito",
    top: "6%",
    left: "0%",
    delay: "0s",
  },
  {
    icon: LayoutDashboard,
    title: "Panel de control",
    subtitle: "Pedidos en vivo",
    top: "10%",
    left: "62%",
    delay: "1.2s",
  },
  {
    icon: ClipboardList,
    title: "Todo organizado",
    subtitle: "Sin planillas sueltas",
    top: "68%",
    left: "-2%",
    delay: "0.6s",
  },
  {
    icon: GraduationCap,
    title: "Capacitación",
    subtitle: "Cursos fáciles de seguir",
    top: "72%",
    left: "60%",
    delay: "1.8s",
  },
];

// Puntos de anclaje (extremo interno de cada línea, en %) usados por el SVG de conexiones.
const lineTargets = [
  { x: 20, y: 16 },
  { x: 78, y: 20 },
  { x: 16, y: 80 },
  { x: 80, y: 78 },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg" aria-hidden="true">
      {/* Anillos orbitales */}
      <div className="absolute inset-[6%] rounded-full border border-white/10" />
      <div className="absolute inset-[18%] animate-orbit-spin-slow rounded-full border border-dashed border-white/15" />
      <div className="absolute inset-[32%] rounded-full border border-white/10" />

      {/* Líneas de conexión */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="orbitLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5fd3ef" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#5fd3ef" stopOpacity="0" />
          </linearGradient>
        </defs>
        {lineTargets.map((point, i) => (
          <line
            key={i}
            x1={50}
            y1={50}
            x2={point.x}
            y2={point.y}
            stroke="url(#orbitLine)"
            strokeWidth="0.4"
            strokeDasharray="1.5 2"
          />
        ))}
      </svg>

      {/* Ícono central */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/25 backdrop-blur-md sm:h-28 sm:w-28">
          <div className="absolute inset-0 -z-10 animate-orbit-pulse rounded-full bg-orbit-sky-400/25 blur-xl" />
          <Image src="/brand/orbita-icon.png" alt="ÓRBITA Digital" width={76} height={76} priority />
        </div>
      </div>

      {/* Tarjetas satélite */}
      {satellites.map(({ icon: Icon, title, subtitle, top, left, delay }) => (
        <div
          key={title}
          className="absolute w-[9.5rem] animate-orbit-float rounded-2xl border border-white/15 bg-white/[0.07] p-3 shadow-lg shadow-orbit-navy-950/20 backdrop-blur-md sm:w-40"
          style={{ top, left, animationDelay: delay }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orbit-sky-400/15 text-orbit-sky-300">
            <Icon className="h-4.5 w-4.5" />
          </div>
          <p className="mt-2 text-xs font-semibold text-white">{title}</p>
          <p className="text-[11px] text-white/55">{subtitle}</p>
        </div>
      ))}
    </div>
  );
}
