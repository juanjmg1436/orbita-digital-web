"use client";

import { Plus } from "lucide-react";
import { LOW_STOCK_THRESHOLD, type AlmacenProduct } from "@/lib/demo/almacen-data";

type ProductWithStock = AlmacenProduct & { stock: number };

type Props = {
  products: ProductWithStock[];
  cart: Record<string, number>;
  onAdd: (id: string) => void;
  onOpenCart: () => void;
};

export function formatPrice(value: number) {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

export function TiendaView({ products, cart, onAdd }: Props) {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-8 lg:px-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-orbit-navy-900 sm:text-3xl">
          Catálogo
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-orbit-gray-600">
          Agregá productos al carrito y confirmá un pedido simulado: vas a ver el stock y la venta
          reflejados al instante en el Panel de gestión.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const enCarrito = cart[product.id] ?? 0;
          const sinStock = product.stock <= 0;
          const alcanzoLimite = enCarrito >= product.stock;

          return (
            <div
              key={product.id}
              className="flex flex-col gap-3 rounded-2xl border border-orbit-gray-200 bg-white p-4 shadow-sm shadow-orbit-navy-900/[0.03]"
            >
              <div className="flex h-20 items-center justify-center rounded-xl bg-orbit-gray-50 text-4xl">
                {product.emoji}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-orbit-sky-600">
                  {product.categoria}
                </span>
                <h3 className="text-sm font-bold leading-snug text-orbit-navy-900">
                  {product.nombre}
                </h3>
                <span className="text-base font-bold text-orbit-navy-900">
                  {formatPrice(product.precio)}
                </span>
                {!sinStock && product.stock <= LOW_STOCK_THRESHOLD && (
                  <span className="text-xs font-medium text-orbit-violet-500">
                    Últimas unidades ({product.stock})
                  </span>
                )}
                {sinStock && <span className="text-xs font-medium text-red-500">Sin stock</span>}
              </div>
              <button
                type="button"
                onClick={() => onAdd(product.id)}
                disabled={sinStock || alcanzoLimite}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-orbit-navy-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-orbit-navy-700 disabled:cursor-not-allowed disabled:bg-orbit-gray-200 disabled:text-orbit-gray-500"
              >
                <Plus className="h-3.5 w-3.5" />
                {enCarrito > 0 ? `En el carrito (${enCarrito})` : "Agregar"}
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
