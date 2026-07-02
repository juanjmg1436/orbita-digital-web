import type { Metadata } from "next";
import { Servicios } from "@/components/sections/Servicios";
import { TiendaDigital } from "@/components/sections/TiendaDigital";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Sitios web corporativos, tiendas digitales a medida, sistemas y aplicaciones web, y capacitación corporativa para tu negocio u organización.",
};

export default function ServiciosPage() {
  return (
    <>
      <Servicios />
      <TiendaDigital />
    </>
  );
}
