import type { ServiceTypeValue } from "@/lib/config";

/**
 * Preguntas adicionales del formulario de contacto, según el tipo de
 * servicio elegido. `label` se usa como texto de la pregunta en el
 * formulario y también como clave legible al guardar la respuesta.
 *
 * Se comparte entre el formulario (Contacto.tsx) y la Server Action
 * (actions/contact.ts) para que ambos lados coincidan siempre.
 */

export type ProfileQuestion = {
  name: string;
  label: string;
  type: "text" | "select";
  options?: string[];
  placeholder?: string;
};

export const profileQuestionsByService: Record<ServiceTypeValue, ProfileQuestion[]> = {
  "sitio-web-corporativo": [
    {
      name: "profile_tiene_sitio",
      label: "¿Ya tenés un sitio web?",
      type: "select",
      options: ["Sí", "No", "No estoy seguro"],
    },
    {
      name: "profile_tiene_dominio",
      label: "¿Contás con un dominio propio? (ej: tunegocio.com)",
      type: "select",
      options: ["Sí", "No", "No sé qué es un dominio"],
    },
  ],
  "tienda-digital": [
    {
      name: "profile_cantidad_productos",
      label: "¿Aproximadamente cuántos productos vas a cargar?",
      type: "select",
      options: ["Menos de 20", "Entre 20 y 100", "Más de 100"],
    },
    {
      name: "profile_manejo_stock",
      label: "¿Cómo manejás el stock hoy?",
      type: "text",
      placeholder: "Ej: en un cuaderno, en una planilla, todavía no llevo control...",
    },
  ],
  "sistema-aplicacion": [
    {
      name: "profile_proceso",
      label: "¿Qué proceso te gustaría organizar o automatizar?",
      type: "text",
      placeholder: "Ej: seguimiento de pedidos, control de clientes, presupuestos...",
    },
    {
      name: "profile_usuarios",
      label: "¿Cuántas personas usarían el sistema?",
      type: "select",
      options: ["Solo yo", "Un equipo pequeño (2 a 10)", "Más de 10"],
    },
  ],
  "capacitacion-corporativa": [
    {
      name: "profile_cantidad_personas",
      label: "¿Cuántas personas necesitan capacitarse?",
      type: "select",
      options: ["Menos de 10", "Entre 10 y 50", "Más de 50"],
    },
    {
      name: "profile_temas",
      label: "¿Qué temas te gustaría cubrir?",
      type: "text",
      placeholder: "Ej: atención al cliente, uso de un sistema, procedimientos internos...",
    },
  ],
  "proyecto-educativo": [
    {
      name: "profile_institucion",
      label: "¿Qué tipo de institución representás?",
      type: "text",
      placeholder: "Ej: escuela primaria, instituto, universidad...",
    },
    {
      name: "profile_objetivo",
      label: "¿Qué te gustaría lograr con la plataforma?",
      type: "text",
      placeholder: "Ej: capacitar docentes, organizar cursos, llevar registro de avance...",
    },
  ],
  otro: [],
};
