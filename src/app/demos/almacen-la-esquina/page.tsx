import type { Metadata } from "next";
import { AlmacenDemo } from "@/components/demo/almacen/AlmacenDemo";

export const metadata: Metadata = {
  title: "Almacén La Esquina — Demo interactiva",
  description:
    "Demo interactiva de una tienda digital con panel de gestión conectado: catálogo, carrito, pago simulado y stock que se actualiza en tiempo real. Proyecto propio, no es un cliente real.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function AlmacenLaEsquinaPage() {
  return <AlmacenDemo />;
}
