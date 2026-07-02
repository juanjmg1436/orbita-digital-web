import "server-only";
import { Resend } from "resend";
import { siteConfig } from "@/lib/config";

type NewLeadEmailInput = {
  full_name: string;
  organization: string | null;
  whatsapp: string;
  email: string;
  service_type: string;
  message: string;
  profile_details: Record<string, string> | null;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string) {
  return `<tr><td style="padding:4px 12px 4px 0;color:#566079;">${escapeHtml(label)}</td><td style="padding:4px 0;font-weight:600;">${escapeHtml(value)}</td></tr>`;
}

/**
 * Envía un email a ÓRBITA Digital avisando que llegó una consulta nueva.
 * Si todavía no se configuró RESEND_API_KEY, no hace nada: la consulta ya
 * quedó guardada en Supabase de todos modos, así que esto es un "extra" que
 * no debe romper ni bloquear el envío del formulario.
 */
export async function sendNewLeadNotification(lead: NewLeadEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const serviceLabel =
    siteConfig.serviceTypes.find((s) => s.value === lead.service_type)?.label ?? lead.service_type;

  const profileRows = lead.profile_details
    ? Object.entries(lead.profile_details)
        .map(([question, answer]) => row(question, answer))
        .join("")
    : "";

  const html = `
    <div style="font-family: sans-serif; color: #10192e; max-width: 480px;">
      <h2 style="color:#1848b8; margin-bottom: 16px;">Nueva consulta desde el sitio</h2>
      <table style="border-collapse:collapse;">
        ${row("Nombre", lead.full_name)}
        ${row("Organización", lead.organization ?? "-")}
        ${row("WhatsApp", lead.whatsapp)}
        ${row("Email", lead.email)}
        ${row("Servicio", serviceLabel)}
        ${profileRows}
      </table>
      <p style="margin-top:16px;"><strong>Mensaje:</strong><br />${escapeHtml(lead.message).replace(/\n/g, "<br />")}</p>
      <p style="margin-top:24px;color:#94a1b8;font-size:12px;">
        También queda guardada en la tabla contact_requests de Supabase.
      </p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "ÓRBITA Digital <onboarding@resend.dev>",
      to: siteConfig.contact.email,
      replyTo: lead.email,
      subject: `Nueva consulta: ${lead.full_name} (${serviceLabel})`,
      html,
    });
  } catch (err) {
    // No dejamos que un error de email tumbe el envío del formulario: la
    // consulta ya se guardó correctamente en Supabase antes de llegar acá.
    console.error("No se pudo enviar el email de notificación:", err);
  }
}
