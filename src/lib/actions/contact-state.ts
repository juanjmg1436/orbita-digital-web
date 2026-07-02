// Tipo y estado inicial del formulario de contacto.
//
// Vive en un módulo aparte (sin "use server") a propósito: un archivo con la
// directiva "use server" solo debe exportar funciones async. Exportar además
// una constante de datos desde ese mismo archivo hace que el valor no llegue
// correctamente al cliente (useActionState recibe un estado inicial roto).

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<string, string>>;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
};
