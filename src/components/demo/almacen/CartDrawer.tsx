"use client";

import { CheckCircle2, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import type { AlmacenProduct, Order } from "@/lib/demo/almacen-data";
import { formatPrice } from "./TiendaView";

type CartLine = AlmacenProduct & { cantidad: number; stock: number };

type Props = {
  open: boolean;
  cartItems: CartLine[];
  cartTotal: number;
  completedOrder: Order | null;
  onAdd: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  onViewPanel: () => void;
};

export function CartDrawer({
  open,
  cartItems,
  cartTotal,
  completedOrder,
  onAdd,
  onDecrease,
  onRemove,
  onClose,
  onConfirm,
  onViewPanel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={onClose}
        className="absolute inset-0 bg-orbit-navy-950/40 backdrop-blur-[2px]"
      />
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-orbit-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-orbit-navy-900">
            {completedOrder ? "Pedido confirmado" : "Tu carrito"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-orbit-gray-500 hover:bg-orbit-gray-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {completedOrder ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orbit-green-500/10 text-orbit-green-500">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-orbit-gray-500">Pedido {completedOrder.id}</p>
              <p className="text-2xl font-bold text-orbit-navy-900">
                {formatPrice(completedOrder.total)}
              </p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-orbit-gray-600">
              Pago simulado confirmado. El stock y la venta ya se actualizaron: mirá cómo se ve del
              lado del negocio.
            </p>
            <div className="mt-2 flex w-full flex-col gap-2">
              <button
                type="button"
                onClick={onViewPanel}
                className="inline-flex items-center justify-center rounded-full bg-orbit-navy-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orbit-navy-700"
              >
                Ver en el Panel de gestión
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border border-orbit-gray-200 px-5 py-2.5 text-sm font-semibold text-orbit-navy-700 hover:bg-orbit-gray-50"
              >
                Seguir comprando
              </button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center text-orbit-gray-500">
            <ShoppingCart className="h-10 w-10 text-orbit-gray-300" />
            <p className="text-sm">Todavía no agregaste productos.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orbit-gray-50 text-2xl">
                      {item.emoji}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-semibold text-orbit-navy-900">
                        {item.nombre}
                      </span>
                      <span className="text-xs text-orbit-gray-500">
                        {formatPrice(item.precio)} c/u
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onDecrease(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-orbit-gray-200 text-orbit-navy-700 hover:bg-orbit-gray-50"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-4 text-center text-sm font-semibold text-orbit-navy-900">
                        {item.cantidad}
                      </span>
                      <button
                        type="button"
                        onClick={() => onAdd(item.id)}
                        disabled={item.cantidad >= item.stock}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-orbit-gray-200 text-orbit-navy-700 hover:bg-orbit-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="text-orbit-gray-400 hover:text-red-500"
                      aria-label={`Quitar ${item.nombre}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 border-t border-orbit-gray-200 px-6 py-5">
              <div className="flex items-center justify-between text-base font-bold text-orbit-navy-900">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <button
                type="button"
                onClick={onConfirm}
                className="inline-flex items-center justify-center rounded-full bg-orbit-navy-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orbit-navy-700"
              >
                Confirmar pedido (pago simulado)
              </button>
              <p className="text-center text-[11px] text-orbit-gray-500">
                Modo demo: no se procesa ningún cobro real. En un proyecto real, este paso se
                integra con Mercado Pago.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
