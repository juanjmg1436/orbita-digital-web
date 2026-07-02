"use client";

import { useState } from "react";
import { Building2, Check, Rocket, School } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type SolutionTab = {
  key: string;
  icon: LucideIcon;
  label: string;
  text: string;
  items: string[];
};

const tabs: SolutionTab[] = [
  {
    key: "emprendedores",
    icon: Rocket,
    label: "Emprendedores y comercios",
    text: "Convertí tu catálogo en una herramienta de venta disponible todos los días.",
    items: [
      "Tiendas digitales",
      "Catálogo de productos",
      "Carrito de compras",
      "Pagos online",
      "Pedidos",
      "Stock",
      "WhatsApp",
      "Presencia digital",
    ],
  },
  {
    key: "empresas",
    icon: Building2,
    label: "Empresas y organizaciones",
    text: "Digitalizá tareas repetitivas y centralizá la información importante de tu organización.",
    items: [
      "Sitios institucionales",
      "Sistemas internos",
      "Gestión de procesos",
      "Formularios digitales",
      "Presupuestos",
      "Tableros de información",
      "Capacitación de equipos",
    ],
  },
  {
    key: "educativas",
    icon: School,
    label: "Instituciones educativas",
    text: "Creamos entornos digitales que fortalecen la enseñanza, la capacitación y la organización institucional.",
    items: [
      "Campus virtual",
      "Cursos autoasistidos",
      "Plataformas de capacitación",
      "Simuladores administrativos",
      "Sistemas de gestión",
      "Recursos educativos digitales",
    ],
  },
];

export function Soluciones() {
  const [active, setActive] = useState(tabs[0].key);
  const current = tabs.find((tab) => tab.key === active) ?? tabs[0];

  return (
    <section id="soluciones" className="bg-orbit-gray-50 py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Soluciones" title="Tecnología pensada para cada necesidad." />

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 sm:flex-row sm:rounded-full sm:border sm:border-orbit-gray-200 sm:bg-white sm:p-1.5">
          {tabs.map(({ key, icon: Icon, label }) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                aria-pressed={isActive}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-orbit-navy-600 text-white shadow-md shadow-orbit-navy-600/25"
                    : "text-orbit-navy-700 hover:bg-orbit-navy-600/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>

        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-10 rounded-3xl border border-orbit-gray-200 bg-white p-8 sm:p-10 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orbit-sky-500/10 text-orbit-sky-600">
              <current.icon className="h-6 w-6" />
            </div>
            <p className="text-xl font-bold leading-snug tracking-tight text-orbit-navy-900 text-balance">
              {current.text}
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {current.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-orbit-navy-800">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-orbit-sky-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
