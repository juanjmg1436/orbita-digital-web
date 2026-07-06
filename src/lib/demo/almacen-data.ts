export type DemoView = "tienda" | "panel";

export type AlmacenProduct = {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  stockInicial: number;
  emoji: string;
};

export const LOW_STOCK_THRESHOLD = 5;

export const almacenProductosSeed: AlmacenProduct[] = [
  { id: "yerba", nombre: "Yerba mate 1kg", categoria: "Almacén", precio: 4200, stockInicial: 18, emoji: "🧉" },
  { id: "gaseosa", nombre: "Gaseosa cola 2.25L", categoria: "Bebidas", precio: 3100, stockInicial: 24, emoji: "🥤" },
  { id: "agua", nombre: "Agua mineral 500ml", categoria: "Bebidas", precio: 900, stockInicial: 6, emoji: "💧" },
  { id: "alfajor", nombre: "Alfajor de chocolate", categoria: "Golosinas", precio: 1200, stockInicial: 30, emoji: "🍫" },
  { id: "galletitas", nombre: "Galletitas dulces", categoria: "Almacén", precio: 1800, stockInicial: 15, emoji: "🍪" },
  { id: "cafe", nombre: "Café molido 500g", categoria: "Almacén", precio: 5200, stockInicial: 4, emoji: "☕" },
  { id: "snack", nombre: "Papas fritas 150g", categoria: "Snacks", precio: 2100, stockInicial: 20, emoji: "🍟" },
  { id: "cuaderno", nombre: "Cuaderno tapa dura", categoria: "Librería", precio: 3500, stockInicial: 10, emoji: "📓" },
];

export type OrderItem = {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  hora: string;
};

export function buildInitialStock(): Record<string, number> {
  return Object.fromEntries(almacenProductosSeed.map((p) => [p.id, p.stockInicial]));
}
