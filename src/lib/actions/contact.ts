"use server";

import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/validation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { profileQuestionsByService } from "@/lib/quote-profile";
import type { ServiceTypeValue } from "@/lib/config";
import type { ContactFormState } from "@/lib/actions/contact-state";

const MAX_PROFILE_ANSWER_LENGTH = 300;

function buildProfileDetails(serviceType: ServiceTypeValue, formData: FormData) {
  const questions = profileQuestionsByService[serviceType] ?? [];
  if (questions.length === 0) return null;

  const details: Record<string, string> = {};
  for (const question of questions) {
    const answer = String(formData.get(question.name) ?? "").trim().slice(0, MAX_PROFILE_ANSWER_LENGTH);
    if (answer) {
      details[question.label] = answer;
    }
  }
  return Object.keys(details).length > 0 ? details : null;
}

// Tiempo mínimo esperado entre que se renderiza el formulario y se envía.
// Los bots suelen completar y enviar formularios en milisegundos.
const MIN_FILL_TIME_MS = 2500;

export async function submitContactForm(
  renderedAt: number,
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: campo oculto para personas, tentador para bots.
  const honeypot = String(formData.get("company_website") ?? "").trim();
  if (honeypot.length > 0) {
    // No delatamos la detección: respondemos como si el envío hubiera sido exitoso.
    return {
      status: "success",
      message:
        "¡Gracias! Recibimos tu consulta y te vamos a contactar a la brevedad.",
    };
  }

  // Control de tiempo de llenado (protección anti-bot adicional). `renderedAt`
  // llega ligado a la acción vía bind() desde el componente cliente (momento
  // de montaje), no como campo de formulario, para que no dependa del ciclo
  // de vida del DOM del <form>.
  if (renderedAt && Date.now() - renderedAt < MIN_FILL_TIME_MS) {
    return {
      status: "error",
      message:
        "No pudimos procesar tu consulta. Esperá unos segundos y volvé a intentarlo.",
    };
  }

  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return {
      status: "error",
      message:
        "Recibimos varias consultas desde tu conexión. Probá nuevamente en unos minutos.",
    };
  }

  const raw = {
    full_name: String(formData.get("full_name") ?? ""),
    organization: String(formData.get("organization") ?? ""),
    whatsapp: String(formData.get("whatsapp") ?? ""),
    email: String(formData.get("email") ?? ""),
    service_type: String(formData.get("service_type") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<string, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Revisá los datos marcados antes de enviar el formulario.",
      fieldErrors,
    };
  }

  try {
    const supabase = getSupabaseServerClient();

    const profileDetails = buildProfileDetails(
      parsed.data.service_type as ServiceTypeValue,
      formData
    );

    const { error } = await supabase.from("contact_requests").insert({
      full_name: parsed.data.full_name,
      organization: parsed.data.organization || null,
      whatsapp: parsed.data.whatsapp,
      email: parsed.data.email,
      service_type: parsed.data.service_type,
      message: parsed.data.message,
      profile_details: profileDetails,
    });

    if (error) {
      console.error("Error al guardar la consulta en Supabase:", error.message);
      return {
        status: "error",
        message:
          "No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.",
      };
    }
  } catch (err) {
    console.error("Error inesperado al enviar la consulta:", err);
    return {
      status: "error",
      message:
        "No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.",
    };
  }

  return {
    status: "success",
    message:
      "¡Gracias! Recibimos tu consulta y te vamos a contactar a la brevedad.",
  };
}
