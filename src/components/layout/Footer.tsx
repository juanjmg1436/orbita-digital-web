import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsAppIcon,
} from "@/components/icons/SocialIcons";
import { siteConfig, getWhatsAppLink } from "@/lib/config";

const socialEntries = [
  { key: "instagram", href: siteConfig.socialLinks.instagram, label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin", href: siteConfig.socialLinks.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { key: "facebook", href: siteConfig.socialLinks.facebook, label: "Facebook", Icon: FacebookIcon },
].filter((entry) => entry.href);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-orbit-navy-950 text-white/70">
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-orbit-navy-600/20 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo variant="icon-text" theme="dark" size="md" href="/" />
            <p className="max-w-sm text-sm leading-relaxed">{siteConfig.brand.slogan}</p>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              {siteConfig.brand.institutionalPhrase}
            </p>
            {socialEntries.length > 0 && (
              <div className="mt-2 flex items-center gap-3">
                {socialEntries.map(({ key, href, label, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-orbit-sky-400/60 hover:text-orbit-sky-300"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">
              Enlaces
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">
              Contacto
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.brand.name}. {siteConfig.legal.text}
          </p>
          <p>Desarrollado por {siteConfig.brand.name}</p>
        </div>
      </Container>
    </footer>
  );
}
