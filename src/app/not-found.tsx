import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden bg-orbit-navy-950 py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-orbit-sky-500/15 blur-3xl" />
      </div>

      <Container className="relative flex flex-col items-center gap-6 text-center">
        <Image
          src="/brand/orbita-icon.png"
          alt="ÓRBITA Digital"
          width={72}
          height={72}
          className="animate-orbit-float"
        />
        <p className="text-sm font-semibold uppercase tracking-wider text-orbit-sky-300">
          Error 404
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Esta página salió de órbita.
        </h1>
        <p className="max-w-md text-base leading-relaxed text-white/70">
          No encontramos el contenido que buscás. Puede que el enlace esté roto o que la página
          se haya movido.
        </p>
        <Button as="a" href="/" variant="primary" size="lg">
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Button>
      </Container>
    </section>
  );
}
