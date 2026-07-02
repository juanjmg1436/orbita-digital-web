import { z } from "zod";
import { siteConfig } from "./config";

const serviceTypeValues = siteConfig.serviceTypes.map((s) => s.value) as [
  string,
  ...string[],
];

export const contactFormSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre y apellido.")
    .max(120, "El nombre es demasiado largo."),
  organization: z
    .string()
    .trim()
    .max(160, "El campo es demasiado largo.")
    .optional(),
  whatsapp: z
    .string()
    .trim()
    .min(6, "Ingresá un número de WhatsApp válido.")
    .max(30, "Revisá el número de WhatsApp.")
    .regex(/^[0-9+()\s-]+$/, "Usá solo números, espacios, +, ( ) y -."),
  email: z.email("Ingresá un email válido.").trim().max(160),
  service_type: z.enum(serviceTypeValues, "Seleccioná un tipo de servicio."),
  message: z
    .string()
    .trim()
    .min(10, "Contanos un poco más sobre tu proyecto.")
    .max(2000, "El mensaje es demasiado largo."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
