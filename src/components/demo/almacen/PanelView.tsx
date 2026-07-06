"use client";

import { AlertTriangle, Receipt, TrendingUp } from "lucide-react";
import { LOW_STOCK_THRESHOLD, type AlmacenProduct, type Order } from "@/lib/demo/almacen-data";
import { formatPrice } from "./TiendaView";

type ProductWithStock = AlmacenProduct & { stock: number };

type Props = {
  products: ProductWithStock[];
  orders: Order[];
};

export function PanelView({ products, orders }: Props) {
  const totalVentas = orders.reduce((sum, o) => sum + o.total, 0);
  const stockBajo = products.filter((p) => p.stock <= LOW_STOCK_THRESHOLD);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-8 lg:px-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-orbit-navy-900 sm:text-3xl">
          Panel de gestión
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-orbit-gray-600">
          Así ve el negocio lo que pasa en la tienda: cada pedido confirmado actualiza estas cifras
          en tiempo real.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-orbit-gray-200 bg-white p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orbit-green-500/10 text-orbit-green-500">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orbit-gray-500">
              Ventas
            </p>
            <p className="text-xl font-bold text-orbit-navy-900">{formatPrice(totalVentas)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-orbit-gray-200 bg-white p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orbit-sky-500/10 text-orbit-sky-600">
            <Receipt className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orbit-gray-500">
              Pedidos
            </p>
            <p className="text-xl font-bold text-orbit-navy-900">{orders.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-orbit-gray-200 bg-white p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orbit-violet-500/10 text-orbit-violet-500">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orbit-gray-500">
              Stock bajo
            </p>
            <p className="text-xl font-bold text-orbit-navy-900">
              {stockBajo.length} producto{stockBajo.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-orbit-navy-900">Pedidos</h2>
          <div className="overflow-x-auto rounded-2xl border border-orbit-gray-200 bg-white">
            {orders.length === 0 ? (
              <p className="p-6 text-center text-sm text-orbit-gray-500">
                Todavía no se registraron pedidos. Probá comprar algo en la Tienda.
              </p>
            ) : (
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-orbit-gray-50 text-xs font-semibold uppercase tracking-wider text-orbit-gray-500">
                  <tr>
                    <th className="px-5 py-3">Pedido</th>
                    <th className="px-5 py-3">Hora</th>
                    <th className="px-5 py-3">Productos</th>
                    <th className="px-5 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orbit-gray-100">
                  {[...orders].reverse().map((order) => (
                    <tr key={order.id}>
                      <td className="px-5 py-3 font-semibold text-orbit-navy-900">{order.id}</td>
                      <td className="px-5 py-3 text-orbit-gray-600">{order.hora}</td>
                      <td className="px-5 py-3 text-orbit-gray-600">
                        {order.items.map((i) => `${i.cantidad}× ${i.nombre}`).join(", ")}
                      </td>
                      <td className="px-5 py-3 text-right font-semibold text-orbit-navy-900">
                        {formatPrice(order.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-orbit-navy-900">Stock</h2>
          <div className="overflow-x-auto rounded-2xl border border-orbit-gray-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-orbit-gray-50 text-xs font-semibold uppercase tracking-wider text-orbit-gray-500">
                <tr>
                  <th className="px-5 py-3">Producto</th>
                  <th className="px-5 py-3 text-right">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orbit-gray-100">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-5 py-3 text-orbit-gray-700">
                      <span className="mr-2">{product.emoji}</span>
                      {product.nombre}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          product.stock <= 0
                            ? "bg-red-50 text-red-600"
                            : product.stock <= LOW_STOCK_THRESHOLD
                              ? "bg-orbit-violet-500/10 text-orbit-violet-500"
                              : "bg-orbit-green-500/10 text-orbit-green-500"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
