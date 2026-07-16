import { Component } from '@angular/core';
import { CardComponent } from '../../../../shared';
import { CardServiceDto } from './dtos';

@Component({
  selector: 'app-services',
  imports: [CardComponent],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  cardData: CardServiceDto[] = [
    {
      title: 'Desarrollo web',
      icon: 'code',
      description:
        'Creamos sitios web modernos, rapidos y optimizados con las ultimas tecnologias del mercado.',
    },
    {
      title: 'Apps Móviles',
      icon: 'devices_other',
      description: `Aplicaciones nativas e híbridas que brindan la mejor experiencia a tus
         usuarios.`,
    },
    {
      title: 'Ciberseguridad',
      icon: 'vpn_lock',
      description: ` Protegemos tu negocio con las mejores prácticas de seguridad
          informática.`,
    },
    {
      title: 'Consultoría',
      icon: 'psychology_alt',
      description: `Estrategia digital personalizada para optimizar tus procesos y maximizar
        resultados.`,
    },
    {
      title: `Infraestuctura`,
      icon: 'factory',
      description: `Infraestructura escalable en la nube con despliegues automatizados y
        confiables.`,
    },
    {
      title: `Analytics`,
      icon: 'bar_chart',
      description: `Dashboards e insights basados en datos para tomar mejores decisiones de
        negocio.`,
    },
  ];
}
