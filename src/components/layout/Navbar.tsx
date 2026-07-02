"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/90 backdrop-blur-md shadow-sm shadow-orbit-navy-900/5"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-18 items-center justify-between py-3">
        <Logo variant="icon-text" theme={solid ? "light" : "dark"} size="sm" priority />

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-sm font-semibold tracking-tight transition-colors ${
                    solid
                      ? "text-orbit-navy-800 hover:text-orbit-navy-600"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button as="a" href={siteConfig.ctaPrimary.href} variant="primary" size="md">
            {siteConfig.ctaPrimary.label}
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex items-center justify-center rounded-full p-2.5 transition-colors lg:hidden ${
            solid
              ? "text-orbit-navy-900 hover:bg-orbit-gray-100"
              : "text-white hover:bg-white/10"
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container className="pb-6">
          <nav aria-label="Navegación móvil">
            <ul className="flex flex-col gap-1 rounded-2xl bg-white p-3 shadow-lg shadow-orbit-navy-900/10">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-orbit-navy-800 hover:bg-orbit-gray-50"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  as="a"
                  href={siteConfig.ctaPrimary.href}
                  variant="primary"
                  size="lg"
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  {siteConfig.ctaPrimary.label}
                </Button>
              </li>
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
}
