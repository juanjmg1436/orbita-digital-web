import type { Metadata } from "next";
import { SobreOrbita } from "@/components/sections/SobreOrbita";
import { Proceso } from "@/components/sections/Proceso";

export const metadata: Metadata = {
  title: "Sobre ÓRBITA",
  description:
    "Tecnología, gestión y capacitación al servicio de las organizaciones. Conocé la propuesta de ÓRBITA Digital y cómo trabajamos.",
};

export default function SobreOrbitaPage() {
  return (
    <>
      <SobreOrbita />
      <Proceso />
    </>
  );
}
