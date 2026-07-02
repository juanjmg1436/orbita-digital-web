import type { Metadata } from "next";
import { Proyectos } from "@/components/sections/Proyectos";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos que integran tecnología, educación y gestión: plataformas de capacitación, simuladores administrativos, sistemas de gestión y soluciones de comercio digital.",
};

export default function ProyectosPage() {
  return <Proyectos />;
}
