import type { ReactNode } from "react";

type BadgeTone = "navy" | "sky" | "violet" | "green" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  navy: "bg-orbit-navy-600/10 text-orbit-navy-700",
  sky: "bg-orbit-sky-500/10 text-orbit-sky-600",
  violet: "bg-orbit-violet-500/10 text-orbit-violet-500",
  green: "bg-orbit-green-500/10 text-orbit-green-500",
  neutral: "bg-orbit-gray-100 text-orbit-gray-600",
};

export function Badge({
  children,
  tone = "navy",
  className = "",
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
