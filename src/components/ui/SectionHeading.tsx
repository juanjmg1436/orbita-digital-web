import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const titleColor = tone === "dark" ? "text-white" : "text-orbit-navy-900";
  const descColor = tone === "dark" ? "text-white/70" : "text-orbit-gray-600";

  return (
    <div className={`flex flex-col gap-4 max-w-3xl ${alignClasses} ${className}`}>
      {eyebrow && (
        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider ${
            tone === "dark"
              ? "border-orbit-sky-400/40 bg-orbit-sky-400/10 text-orbit-sky-300"
              : "border-orbit-navy-600/15 bg-orbit-navy-600/5 text-orbit-navy-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${tone === "dark" ? "bg-orbit-sky-300" : "bg-orbit-sky-500"}`}
          />
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight text-balance ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base sm:text-lg leading-relaxed text-pretty ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}
