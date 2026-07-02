import Link from "next/link";
import { ArrowRight, Boxes, CreditCard, ShoppingBag, ShoppingCart, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type FlowStep = {
  icon: LucideIcon;
  title: string;
};

const flow: FlowStep[] = [
  { icon: ShoppingBag, title: "Cliente elige productos" },
  { icon: ShoppingCart, title: "Arma su carrito" },
  { icon: CreditCard, title: "Paga con Mercado Pago" },
  { icon: Store, title: "El comercio recibe la venta" },
  { icon: Boxes, title: "El sistema actualiza pedido y stock" },
];

export function TiendaDigital() {
  return (
    <section className="relative overflow-hidden bg-orbit-navy-950 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-orbit-sky-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-orbit-violet-500/10 blur-3xl" />
      </div>

      <Container className="relative flex flex-col gap-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <Badge tone="sky" className="bg-orbit-sky-400/10 text-orbit-sky-300">
            Tiendas digitales a medida
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
            Convertí tu catálogo en una tienda digital lista para vender.
          </h2>
          <p className="text-lg leading-relaxed text-white/70 text-pretty">
            Desarrollamos una tienda online propia con tu identidad visual, catálogo, carrito,
            pedidos, stock y cobro digital mediante Mercado Pago.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 lg:flex-row lg:items-center">
          {flow.map(({ icon: Icon, title }, index) => (
            <div key={title} className="flex items-center gap-3 lg:flex-1">
              <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-center backdrop-blur-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orbit-sky-400/15 text-orbit-sky-300">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold leading-snug text-white text-balance">
                  {title}
                </p>
              </div>
              {index < flow.length - 1 && (
                <ArrowRight className="hidden h-5 w-5 shrink-0 text-white/25 lg:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <p className="rounded-2xl border border-orbit-green-400/30 bg-orbit-green-400/10 px-6 py-4 text-sm font-medium leading-relaxed text-orbit-green-400 text-pretty">
            El dinero se acredita directamente en la cuenta de Mercado Pago del comercio.
          </p>
          <Button as={Link} href="/contacto" variant="primary" size="lg">
            Quiero mi tienda digital
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
