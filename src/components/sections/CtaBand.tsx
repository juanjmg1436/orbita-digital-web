import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { getWhatsAppLink } from "@/lib/config";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-orbit-navy-950 py-20 sm:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-orbit-sky-500/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
          ¿Hablamos de tu idea?
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-white/70 text-pretty">
          Contame qué necesitás digitalizar y construyamos una solución adaptada a tu negocio
          u organización.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button as={Link} href="/contacto" variant="primary" size="lg">
            Solicitar presupuesto
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            as="a"
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Consultar por WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
