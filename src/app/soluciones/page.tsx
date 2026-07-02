import type { Metadata } from "next";
import { Soluciones } from "@/components/sections/Soluciones";

export const metadata: Metadata = {
  title: "Soluciones",
  description:
    "Tecnología pensada para cada necesidad: emprendedores y comercios, empresas y organizaciones, e instituciones educativas.",
};

export default function SolucionesPage() {
  return <Soluciones />;
}
