"use client";

import Link from "next/link";
import { ArrowLeft, LayoutDashboard, RefreshCw, ShoppingCart, Store } from "lucide-react";
import type { DemoView } from "@/lib/demo/almacen-data";

type Props = {
  view: DemoView;
  onChangeView: (view: DemoView) => void;
  onReset: () => void;
  cartCount: number;
  onOpenCart: () => void;
};

export function DemoBanner({ view, onChangeView, onReset, cartCount, onOpenCart }: Props) {
  return (
    <div className="sticky top-18 z-40 border-b border-orbit-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <div className="flex items-center gap-3">
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orbit-navy-700 hover:text-orbit-navy-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Proyectos
          </Link>
          <span className="hidden h-8 w-px bg-orbit-gray-200 sm:block" />
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-bold text-orbit-navy-900">Almacén La Esquina</span>
            <span className="text-xs text-orbit-gray-500">
              Demo interactiva — pago simulado, no es un cliente real
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-orbit-gray-200 bg-orbit-gray-50 p-1">
            <button
              type="button"
              onClick={() => onChangeView("tienda")}
              aria-pressed={view === "tienda"}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                view === "tienda"
                  ? "bg-orbit-navy-600 text-white shadow-sm"
                  : "text-orbit-navy-700 hover:bg-white"
              }`}
            >
              <Store className="h-4 w-4" />
              Tienda
            </button>
            <button
              type="button"
              onClick={() => onChangeView("panel")}
              aria-pressed={view === "panel"}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                view === "panel"
                  ? "bg-orbit-navy-600 text-white shadow-sm"
                  : "text-orbit-navy-700 hover:bg-white"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Panel de gestión
            </button>
          </div>

          {view === "tienda" && (
            <button
              type="button"
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-1.5 rounded-full bg-orbit-navy-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orbit-navy-700"
            >
              <ShoppingCart className="h-4 w-4" />
              Carrito
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-orbit-green-500 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onReset}
            title="Reiniciar demo"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-orbit-gray-200 text-orbit-gray-500 hover:bg-orbit-gray-50 hover:text-orbit-navy-700"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="bg-orbit-navy-950 py-1.5 text-center text-xs font-medium text-white/80 sm:hidden">
        Demo interactiva — pago simulado, no es un cliente real
      </div>
    </div>
  );
}
