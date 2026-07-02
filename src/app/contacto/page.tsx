import type { Metadata } from "next";
import { Contacto } from "@/components/sections/Contacto";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactate con ÓRBITA Digital por WhatsApp, email o formulario y contanos qué necesitás digitalizar.",
};

export default function ContactoPage() {
  return <Contacto />;
}
