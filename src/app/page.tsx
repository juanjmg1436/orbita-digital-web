import { Hero } from "@/components/sections/Hero";
import { PorQueDigitalizar } from "@/components/sections/PorQueDigitalizar";
import { ServiciosTeaser } from "@/components/sections/ServiciosTeaser";
import { Diferencial } from "@/components/sections/Diferencial";
import { CtaBand } from "@/components/sections/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <PorQueDigitalizar />
      <ServiciosTeaser />
      <Diferencial />
      <CtaBand />
    </>
  );
}
