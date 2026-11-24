import { environment } from '../../../environments/environment';

/** Enlace a WhatsApp con el número de Devom y, opcionalmente, un mensaje ya escrito. */
export function whatsappLink(text = ''): string {
  const base = `https://wa.me/${environment.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
