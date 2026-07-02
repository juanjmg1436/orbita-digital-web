import { Hero } from "@/components/sections/Hero";
import { Servicios } from "@/components/sections/Servicios";
import { Soluciones } from "@/components/sections/Soluciones";
import { TiendaDigital } from "@/components/sections/TiendaDigital";
import { Proceso } from "@/components/sections/Proceso";
import { Proyectos } from "@/components/sections/Proyectos";
import { Diferencial } from "@/components/sections/Diferencial";
import { SobreOrbita } from "@/components/sections/SobreOrbita";
import { Contacto } from "@/components/sections/Contacto";

export default function Home() {
  return (
    <>
      <Hero />
      <Servicios />
      <Soluciones />
      <TiendaDigital />
      <Proceso />
      <Proyectos />
      <Diferencial />
      <SobreOrbita />
      <Contacto />
    </>
  );
}
