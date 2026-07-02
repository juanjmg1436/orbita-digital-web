"use client";

import { useActionState, useState } from "react";
import type { ChangeEvent } from "react";
import Link from "next/link";
import { ArrowRight, CircleCheck, Loader2, Mail, MessageCircle, TriangleAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { submitContactForm } from "@/lib/actions/contact";
import { initialContactFormState } from "@/lib/actions/contact-state";
import { siteConfig, getWhatsAppLink } from "@/lib/config";
import { profileQuestionsByService } from "@/lib/quote-profile";

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

  // Preguntas de perfil según el tipo de servicio elegido, para personalizar
  // el pedido de presupuesto.
  const [profileValues, setProfileValues] = useState<Record<string, string>>({});

  // Ajustes de estado durante el renderizado (no en un efecto): evitan un
  // renderizado extra respecto de hacerlo en un useEffect.
  const [lastHandledState, setLastHandledState] = useState(state);
  if (state !== lastHandledState) {
    setLastHandledState(state);
    if (state.status === "success") {
      setValues(emptyValues);
      setProfileValues({});
    }
  }

  const [lastServiceType, setLastServiceType] = useState(values.service_type);
  if (values.service_type !== lastServiceType) {
    setLastServiceType(values.service_type);
    setProfileValues({});
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleProfileChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setProfileValues((prev) => ({ ...prev, [name]: value }));
  }

  const profileQuestions =
    values.service_type in profileQuestionsByService
      ? profileQuestionsByService[values.service_type as keyof typeof profileQuestionsByService]
      : [];

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

          <Link
            href="/preguntas-frecuentes"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-orbit-navy-600 hover:text-orbit-navy-800"
          >
            ¿Tenés dudas? Mirá las preguntas frecuentes
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
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

          {profileQuestions.length > 0 && (
            <div className="flex flex-col gap-5 rounded-2xl border border-orbit-sky-500/20 bg-orbit-sky-500/5 p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-orbit-sky-600">
                Contanos un poco más para armar tu presupuesto
              </p>
              {profileQuestions.map((question) => (
                <div key={question.name} className="flex flex-col gap-1.5">
                  <label htmlFor={question.name} className="text-sm font-semibold text-orbit-navy-900">
                    {question.label}
                  </label>
                  {question.type === "select" ? (
                    <select
                      id={question.name}
                      name={question.name}
                      value={profileValues[question.name] ?? ""}
                      onChange={handleProfileChange}
                      className={`${inputClasses} border-orbit-gray-200 focus:border-orbit-sky-500 appearance-none`}
                    >
                      <option value="" disabled>
                        Seleccioná una opción
                      </option>
                      {question.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={question.name}
                      name={question.name}
                      type="text"
                      value={profileValues[question.name] ?? ""}
                      onChange={handleProfileChange}
                      placeholder={question.placeholder}
                      className={`${inputClasses} border-orbit-gray-200 focus:border-orbit-sky-500`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

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
