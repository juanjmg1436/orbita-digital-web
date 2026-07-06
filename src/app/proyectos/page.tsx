import type { Metadata } from "next";
import { Proyectos } from "@/components/sections/Proyectos";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "GEST-AR: el ecosistema de gestión fiscal, comercial y de sueldos que desarrollamos para la Escuela Normal Superior N°9, en uso real. Más una demo interactiva de tienda digital y panel de gestión.",
};

export default function ProyectosPage() {
  return <Proyectos />;
}
