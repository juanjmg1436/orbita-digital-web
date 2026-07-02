import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

type LogoVariant = "icon" | "icon-text" | "full";
type LogoTheme = "light" | "dark";
type LogoSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<LogoSize, { icon: number; textClass: string; sloganClass: string }> = {
  sm: { icon: 36, textClass: "text-base", sloganClass: "text-[10px]" },
  md: { icon: 44, textClass: "text-xl", sloganClass: "text-xs" },
  lg: { icon: 64, textClass: "text-2xl", sloganClass: "text-sm" },
  xl: { icon: 96, textClass: "text-4xl", sloganClass: "text-base" },
};

type LogoProps = {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: LogoSize;
  href?: string | null;
  className?: string;
  priority?: boolean;
};

/**
 * Logotipo oficial de ÓRBITA Digital.
 * El ícono (public/brand/orbita-icon.png) se usa siempre íntegro, sin recortes,
 * deformaciones ni fondos agregados, tal como fue provisto.
 */
export function Logo({
  variant = "icon-text",
  theme = "light",
  size = "md",
  href = "/",
  className = "",
  priority = false,
}: LogoProps) {
  const { icon, textClass, sloganClass } = sizeMap[size];
  const primaryText = theme === "dark" ? "text-white" : "text-orbit-navy-900";
  const secondaryText = theme === "dark" ? "text-white/65" : "text-orbit-gray-600";
  const accentText = theme === "dark" ? "text-orbit-sky-300" : "text-orbit-sky-600";

  const content = (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/brand/orbita-icon.png"
        alt={siteConfig.brand.name}
        width={icon}
        height={icon}
        priority={priority}
        className="shrink-0 select-none"
      />
      {variant !== "icon" && (
        <span className="flex flex-col leading-none">
          <span className={`font-extrabold tracking-tight whitespace-nowrap ${textClass} ${primaryText}`}>
            ÓRBITA <span className={`font-medium ${secondaryText}`}>Digital</span>
          </span>
          {variant === "full" && (
            <span className={`mt-1.5 font-medium leading-snug ${sloganClass} ${secondaryText}`}>
              Tecnología para <span className={accentText}>vender, organizar y crecer.</span>
            </span>
          )}
        </span>
      )}
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} aria-label={`${siteConfig.brand.name} — Ir al inicio`} className="inline-flex w-fit">
      {content}
    </Link>
  );
}
