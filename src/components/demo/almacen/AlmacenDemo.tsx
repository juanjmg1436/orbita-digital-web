"use client";

import { useState } from "react";
import {
  almacenProductosSeed,
  buildInitialStock,
  type DemoView,
  type Order,
} from "@/lib/demo/almacen-data";
import { DemoBanner } from "./DemoBanner";
import { TiendaView } from "./TiendaView";
import { CartDrawer } from "./CartDrawer";
import { PanelView } from "./PanelView";

export function AlmacenDemo() {
  const [stock, setStock] = useState<Record<string, number>>(buildInitialStock);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const [view, setView] = useState<DemoView>("tienda");
  const [cartOpen, setCartOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const products = almacenProductosSeed.map((p) => ({ ...p, stock: stock[p.id] ?? 0 }));

  const cartItems = Object.entries(cart)
    .filter(([, cantidad]) => cantidad > 0)
    .map(([id, cantidad]) => {
      const product = almacenProductosSeed.find((p) => p.id === id)!;
      return { ...product, cantidad, stock: stock[id] ?? 0 };
    });

  const cartCount = cartItems.reduce((sum, i) => sum + i.cantidad, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.precio * i.cantidad, 0);

  function addToCart(id: string) {
    const disponible = stock[id] ?? 0;
    const enCarrito = cart[id] ?? 0;
    if (enCarrito >= disponible) return;
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  function decreaseFromCart(id: string) {
    setCart((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] ?? 0) - 1) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  }

  function removeFromCart(id: string) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function confirmCheckout() {
    if (cartItems.length === 0) return;
    const order: Order = {
      id: `PED-${String(orders.length + 1).padStart(3, "0")}`,
      items: cartItems.map((i) => ({
        nombre: i.nombre,
        cantidad: i.cantidad,
        precioUnitario: i.precio,
      })),
      total: cartTotal,
      hora: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
    };

    setStock((prev) => {
      const next = { ...prev };
      cartItems.forEach((i) => {
        next[i.id] = (next[i.id] ?? 0) - i.cantidad;
      });
      return next;
    });
    setOrders((prev) => [...prev, order]);
    setCart({});
    setCompletedOrder(order);
  }

  function closeCart() {
    setCartOpen(false);
    setCompletedOrder(null);
  }

  function resetDemo() {
    setStock(buildInitialStock());
    setCart({});
    setOrders([]);
    setCompletedOrder(null);
    setCartOpen(false);
    setView("tienda");
  }

  return (
    <div className="flex min-h-screen flex-col bg-orbit-gray-50 pt-18">
      <DemoBanner
        view={view}
        onChangeView={setView}
        onReset={resetDemo}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {view === "tienda" ? (
        <TiendaView products={products} cart={cart} onAdd={addToCart} onOpenCart={() => setCartOpen(true)} />
      ) : (
        <PanelView products={products} orders={orders} />
      )}

      <CartDrawer
        open={cartOpen}
        cartItems={cartItems}
        cartTotal={cartTotal}
        completedOrder={completedOrder}
        onDecrease={decreaseFromCart}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onClose={closeCart}
        onConfirm={confirmCheckout}
        onViewPanel={() => {
          setView("panel");
          closeCart();
        }}
      />
    </div>
  );
}
