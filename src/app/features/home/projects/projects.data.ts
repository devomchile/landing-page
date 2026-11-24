/**
 * Proyectos del portafolio.
 * Para agregar uno basta con sumar un elemento a PORTFOLIO. Más adelante (fase 3) se leerán desde WordPress.
 */
export interface FeaturedProject {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  features: string[];
}

export interface PortfolioItem {
  name: string;
  initials: string;
  description: string;
  tags: string[];
  /** URL pública del proyecto; si está vacía no se muestra el enlace. */
  url?: string;
  /** Captura en /public/proyectos; si no hay, se muestran las iniciales. */
  image?: string;
}

export const FEATURED: FeaturedProject = {
  name: 'Cuerpo de Bomberos Malalhue',
  description:
    'Un sitio pensado para la comunidad: acceso inmediato a los números de emergencia, noticias de la institución y un canal para sumar nuevos voluntarios.',
  image: 'proyectos/bomberos-malalhue.jpg',
  imageAlt: 'Sitio web del Cuerpo de Bomberos de Malalhue en computador y celular',
  tags: ['Sitio web', 'Responsive', 'Modo oscuro'],
  features: [
    'Emergencias a un clic: Bomberos, CONAF, Carabineros y Cesfam',
    'Novedades y compañías de la institución',
    'Postulación de voluntarios en línea',
    'Se adapta a celular y tiene modo oscuro',
  ],
};

const PENDING = 'Descripción pendiente: qué es, para quién y qué problema resuelve.';

export const PORTFOLIO: PortfolioItem[] = [
  { name: 'Redom', initials: 'R', description: PENDING, tags: ['Tipo por definir'] },
  { name: 'Gerab', initials: 'G', description: PENDING, tags: ['Tipo por definir'] },
  { name: 'Gescamp360', initials: 'G3', description: PENDING, tags: ['Tipo por definir'] },
];
