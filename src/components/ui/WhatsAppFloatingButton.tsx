import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { getWhatsAppLink } from "@/lib/config";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-orbit-green-500 text-white shadow-xl shadow-orbit-green-500/30 transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-orbit-navy-950 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 sm:block">
        Escribinos por WhatsApp
      </span>
    </a>
  );
}
