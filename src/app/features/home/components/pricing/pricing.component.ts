import { Component } from '@angular/core';
import { ButtonComponent, IconComponent, WhatsappButtonComponent } from '../../../../shared';
import { PrincingDto } from './dtos';

@Component({
  selector: 'app-pricing',
  imports: [IconComponent, ButtonComponent, WhatsappButtonComponent],
  templateUrl: './pricing.component.html',
})
export class PricingComponent {
  plans: PrincingDto[] = [
    {
      name: 'Paquete inicio',
      desc: `Perfecto para profesionales y pymes que quieren presencia online`,
      price: '19.990',
      yearPrice: '199.000',
      saving: '40.000',
      featured: false,
      cta: 'Empezar',
      features: [
        '1 Landing page de hasta 1 sección',
        'Dominio .cl por un año',
        'Hosting rápido en Chile',
        'Formulario de contacto + Whatsapp',
        'Diseño responsive para celular',
        'Certificado SSL de seguridad',
        'Soporte por Whatsapp',
      ],
    },
    {
      name: 'Paquete PRO',
      desc: 'El más elegido por pymes',
      price: '39.990',
      saving: '80.000',
      yearPrice: '399.990',
      featured: true,
      cta: 'Empezar ahora',
      headFeature: 'Lo mismo que en Paquete Iniciom, más:',
      uniqueSetup: '59.990',
      features: [
        'Hasta 5 secciones: Inicio, Nosotros, Servicios, Galería y contacto',
        'Diseño personalizado con tu marca',
        'Integración con Google Maps + Redes sociales',
        'Optimización SEO básica',
        '2 cambios de contenido al mes',
        'Email corporativo: nombre@empresa.cl',
        'Prioridad de soporte 12h',
      ],
    },
    {
      name: 'Paquete Empresa',
      desc: 'Solución completa con marketing',
      price: '59.990',
      headFeature: 'Incluye todo lo del paquete PRO, más:',
      featured: false,
      cta: 'Empezar',
      yearPrice: '599.990',
      saving: '120.000',
      uniqueSetup: '89.000',
      features: [
        'Hasta 10 secciones',
        'Blog para atraer clientes de Google',
        'Integración con WooCommerce',
        'Campaña de Google Ads de $50.000 incluida',
        '5 Cambios de contenido al mes',
        'Reporte mensual de visitas',
        'Soporte prioritario de 6h',
      ],
    },
  ];
}
