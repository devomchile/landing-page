import { Component } from '@angular/core';
import { FooterLinkDto } from './dtos';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: 'footer.component.html',
})
export class FooterComponent {
  servicesLinks: FooterLinkDto[] = [
    {
      text: 'Desarrollo Web',
      link: '#',
    },
    {
      text: 'Apps Móviles',
      link: '#',
    },
    {
      text: 'Ciberseguridad',
      link: '#',
    },
    {
      text: 'Consultoría',
      link: '#',
    },
    {
      text: 'Infraestuctura',
      link: '#',
    },
    {
      text: 'Analytics',
      link: '#',
    },
  ];

  enterpriseLinks: FooterLinkDto[] = [
    {
      text: 'Inicio',
      link: '#home',
    },
    {
      text: 'Servicios',
      link: '#services',
    },
    {
      text: 'Nosotros',
      link: '#about',
    },
    {
      text: 'Precios',
      link: '#prices',
    },
    {
      text: 'Contacto',
      link: '#contact',
    },
  ];

  contactLinks: FooterLinkDto[] = [
    {
      text: 'contacto@devom.cl',
      link: '#home',
    },
    {
      text: '+569 46432453',
      link: '#home',
    },
    {
      text: 'Providencia - Santiago, Chile',
      link: '#home',
    },
  ];
}
