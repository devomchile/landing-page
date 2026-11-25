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

export const PORTFOLIO: PortfolioItem[] = [
  {
    name: 'Redom',
    initials: 'R',
    description:
      'SaaS para administrar restaurantes en un solo lugar: punto de venta con mesas y comandas a cocina, carta digital con QR, pedidos y delivery, inventario con recetas y costeo, caja y finanzas.',
    tags: ['SaaS', 'Restaurantes', 'Modo oscuro'],
    image: 'proyectos/redom.jpg',
  },
  {
    name: 'Gerab',
    initials: 'G',
    description:
      'Plataforma para cuerpos de bomberos: central de alarmas con mapa táctico de grifos y desfibriladores, despacho y estado del material mayor y disponibilidad de voluntarios.',
    tags: ['Plataforma web', 'App Android e iOS', 'Bomberos'],
    url: 'https://gerab.cl',
    image: 'proyectos/gerab.jpg',
  },
  {
    name: 'Gescamp360',
    initials: 'G3',
    description:
      'SaaS de gestión política que acompaña al candidato en campaña, Día D, gobierno y reelección: CRM de simpatizantes y líderes, app de terreno offline, sala de guerra con apoderados en vivo y un estratega con IA.',
    tags: ['SaaS', 'Gestión política', 'Web, iOS y Android'],
    image: 'proyectos/gescamp360.jpg',
  },
];
