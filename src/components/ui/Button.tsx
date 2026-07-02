import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-orbit-navy-600 text-white shadow-lg shadow-orbit-navy-600/25 hover:bg-orbit-navy-700 hover:shadow-orbit-navy-700/30 focus-visible:outline-orbit-navy-600",
  secondary:
    "bg-white text-orbit-navy-800 border border-orbit-gray-200 hover:border-orbit-navy-300 hover:bg-orbit-gray-50 focus-visible:outline-orbit-navy-600",
  ghost:
    "bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm focus-visible:outline-white",
  whatsapp:
    "bg-orbit-green-500 text-white shadow-lg shadow-orbit-green-500/25 hover:bg-orbit-green-500/90 focus-visible:outline-orbit-green-500",
};

const sizeClasses: Record<Size, string> = {
  md: "text-sm px-5 py-2.5 gap-2",
  lg: "text-base px-7 py-3.5 gap-2.5",
};

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps<T>) {
  const Tag = as || "button";
  return (
    <Tag
      className={`inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition-all duration-200 outline-offset-2 hover:-translate-y-0.5 active:translate-y-0 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
