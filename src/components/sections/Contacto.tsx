"use client";

import { useActionState, useState } from "react";
import type { ChangeEvent } from "react";
import { CircleCheck, Loader2, Mail, MessageCircle, TriangleAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { submitContactForm } from "@/lib/actions/contact";
import { initialContactFormState } from "@/lib/actions/contact-state";
import { siteConfig, getWhatsAppLink } from "@/lib/config";

const inputClasses =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-orbit-navy-900 placeholder:text-orbit-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orbit-sky-500/40";

function fieldBorder(hasError?: string) {
  return hasError ? "border-red-400 focus:border-red-400" : "border-orbit-gray-200 focus:border-orbit-sky-500";
}

const emptyValues = {
  full_name: "",
  organization: "",
  whatsapp: "",
  email: "",
  service_type: "",
  message: "",
};

export function Contacto() {
  // Momento de montaje del formulario, usado para el control anti-bot de
  // tiempo mínimo de llenado. Se liga a la acción con bind() (inicializador
  // perezoso de useState, se calcula una sola vez) en vez de viajar como
  // campo del formulario, así no depende del ciclo de vida del <form> ni de
  // que un input oculto sobreviva al reseteo automático que React hace de
  // los campos no controlados después de cada envío.
  const [mountTime] = useState(() => Date.now());
  const boundSubmitContactForm = submitContactForm.bind(null, mountTime);
  const [state, formAction, pending] = useActionState(boundSubmitContactForm, initialContactFormState);

  // Campos controlados: a diferencia de un input sin controlar, React no los
  // vacía automáticamente después de cada envío de la Server Action. Así, si
  // el envío falla por un error de validación, la persona no pierde lo que
  // ya había escrito.
  const [values, setValues] = useState(emptyValues);

  // Ajuste de estado durante el renderizado (no en un efecto) al detectar un
  // envío exitoso nuevo: es el patrón que recomienda React para "resetear"
  // estado en respuesta a un cambio, evitando un renderizado extra.
  const [lastHandledState, setLastHandledState] = useState(state);
  if (state !== lastHandledState) {
    setLastHandledState(state);
    if (state.status === "success") {
      setValues(emptyValues);
    }
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  const errors = state.fieldErrors ?? {};

  return (
    <section id="contacto" className="bg-white py-24 sm:py-28">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            eyebrow="Contacto"
            title="Hablemos de tu idea."
            description="Contame qué necesitás digitalizar y construyamos una solución adaptada a tu negocio u organización."
            className="max-w-none"
          />

          <div className="flex flex-col gap-3">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-orbit-navy-800 transition-colors hover:text-orbit-navy-600"
            >
              <WhatsAppIcon className="h-4 w-4 text-orbit-green-500" />
              {siteConfig.contact.whatsappDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-orbit-navy-800 transition-colors hover:text-orbit-navy-600"
            >
              <Mail className="h-4 w-4 text-orbit-sky-500" />
              {siteConfig.contact.email}
            </a>
          </div>

          <Button
            as="a"
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            className="w-fit"
          >
            <MessageCircle className="h-4.5 w-4.5" />
            Consultar por WhatsApp
          </Button>
        </div>

        <form
          action={formAction}
          noValidate
          className="flex flex-col gap-5 rounded-3xl border border-orbit-gray-200 bg-orbit-gray-50 p-6 sm:p-8"
        >
          {/* Honeypot anti-spam: invisible para personas, visible para bots */}
          <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="company_website">No completar este campo</label>
            <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="full_name" className="text-sm font-semibold text-orbit-navy-900">
                Nombre y apellido
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                autoComplete="name"
                value={values.full_name}
                onChange={handleChange}
                className={`${inputClasses} ${fieldBorder(errors.full_name)}`}
                placeholder="Tu nombre completo"
              />
              {errors.full_name && <p className="text-xs text-red-500">{errors.full_name}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="organization" className="text-sm font-semibold text-orbit-navy-900">
                Organización o emprendimiento
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                autoComplete="organization"
                value={values.organization}
                onChange={handleChange}
                className={`${inputClasses} ${fieldBorder(errors.organization)}`}
                placeholder="Nombre de tu negocio (opcional)"
              />
              {errors.organization && <p className="text-xs text-red-500">{errors.organization}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="whatsapp" className="text-sm font-semibold text-orbit-navy-900">
                WhatsApp
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                autoComplete="tel"
                value={values.whatsapp}
                onChange={handleChange}
                className={`${inputClasses} ${fieldBorder(errors.whatsapp)}`}
                placeholder="+54 9 11 0000-0000"
              />
              {errors.whatsapp && <p className="text-xs text-red-500">{errors.whatsapp}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-orbit-navy-900">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                className={`${inputClasses} ${fieldBorder(errors.email)}`}
                placeholder="tu@email.com"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="service_type" className="text-sm font-semibold text-orbit-navy-900">
              Tipo de servicio
            </label>
            <select
              id="service_type"
              name="service_type"
              required
              value={values.service_type}
              onChange={handleChange}
              className={`${inputClasses} ${fieldBorder(errors.service_type)} appearance-none`}
            >
              <option value="" disabled>
                Seleccioná una opción
              </option>
              {siteConfig.serviceTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.service_type && <p className="text-xs text-red-500">{errors.service_type}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-semibold text-orbit-navy-900">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={values.message}
              onChange={handleChange}
              className={`${inputClasses} ${fieldBorder(errors.message)} resize-none`}
              placeholder="Contanos qué necesitás digitalizar..."
            />
            {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
          </div>

          <Button type="submit" variant="primary" size="lg" disabled={pending} className="justify-center">
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar consulta"
            )}
          </Button>

          {state.status !== "idle" && (
            <div
              role="status"
              aria-live="polite"
              className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
                state.status === "success"
                  ? "bg-orbit-green-500/10 text-orbit-green-500"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {state.status === "success" ? (
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <span>{state.message}</span>
            </div>
          )}
        </form>
      </Container>
    </section>
  );
}
