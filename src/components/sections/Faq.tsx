import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "¿Cuánto tiempo tarda en desarrollarse mi sitio o sistema?",
    answer:
      "Depende del alcance de cada proyecto: no es lo mismo un sitio institucional simple que una tienda digital completa o un sistema a medida. En la primera conversación te damos un panorama realista de los tiempos antes de empezar.",
  },
  {
    question: "¿Cuánto cuesta trabajar con ÓRBITA Digital?",
    answer:
      "Cada proyecto es distinto, así que no manejamos un precio único ni de catálogo. Contanos qué necesitás por el formulario o por WhatsApp y te armamos un presupuesto a medida, sin compromiso.",
  },
  {
    question: "¿Necesito saber de tecnología para usar mi sitio o sistema?",
    answer:
      "No. Diseñamos cada herramienta para que cualquier persona pueda usarla sin conocimientos técnicos, y te acompañamos en los primeros pasos hasta que te sientas cómodo.",
  },
  {
    question: "Ya tengo un sitio o una tienda online, ¿pueden mejorarlo?",
    answer:
      "Sí. Podemos revisar lo que ya tenés y proponerte mejoras puntuales o una renovación completa, según lo que necesites.",
  },
  {
    question: "¿Cómo funciona el cobro con Mercado Pago en mi tienda digital?",
    answer:
      "El dinero se acredita directo en tu cuenta de Mercado Pago: nosotros no lo manejamos en ningún momento. Nuestro trabajo es que la tienda quede bien conectada para que cada venta se cobre sola.",
  },
  {
    question: "¿Puedo pedir cambios después de que el sitio esté funcionando?",
    answer:
      "Sí, es normal que surjan ajustes una vez que empezás a usarlo en el día a día. Te acompañamos en la puesta en marcha y podés pedirnos cambios más adelante.",
  },
  {
    question: "¿Trabajan con instituciones educativas o entidades sin fines de lucro?",
    answer:
      "Sí, es una de las áreas en las que nos especializamos: campus virtuales, plataformas de capacitación y sistemas de gestión pensados para instituciones educativas.",
  },
  {
    question: "¿El dominio y el sitio quedan a mi nombre?",
    answer:
      "Sí, trabajamos para que tengas el control de tu dominio y tu presencia digital. Te explicamos cómo funciona antes de empezar, sin letra chica.",
  },
  {
    question: "¿Qué necesito preparar antes de empezar?",
    answer:
      "No hace falta que tengas todo listo. En la primera conversación te contamos qué información o materiales son útiles para arrancar, y avanzamos juntos desde ahí.",
  },
];

export function Faq() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Dudas comunes antes de empezar un proyecto."
          description="Si no encontrás la respuesta que buscás, escribinos: preferimos aclarar todo antes de arrancar."
        />

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          {faqs.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-2xl border border-orbit-gray-200 bg-orbit-gray-50 open:border-orbit-sky-500/40 open:bg-white open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-semibold text-orbit-navy-900 [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown className="h-5 w-5 shrink-0 text-orbit-navy-400 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-orbit-gray-600">{answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
