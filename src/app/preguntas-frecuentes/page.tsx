import type { Metadata } from "next";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas a las dudas más comunes sobre tiempos, costos, Mercado Pago y cómo es trabajar con ÓRBITA Digital.",
};

export default function PreguntasFrecuentesPage() {
  return <Faq />;
}
