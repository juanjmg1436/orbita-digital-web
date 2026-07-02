import { Hero } from "@/components/sections/Hero";
import { ServiciosTeaser } from "@/components/sections/ServiciosTeaser";
import { Diferencial } from "@/components/sections/Diferencial";
import { CtaBand } from "@/components/sections/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiciosTeaser />
      <Diferencial />
      <CtaBand />
    </>
  );
}
