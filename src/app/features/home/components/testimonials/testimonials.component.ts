import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.component.html',
})
export class TestimonialsComponent {
  testimonials = [
    {
      name: 'Carlos Mendez',
      role: 'CEO, TechCorp',
      initials: 'CM',
      quote:
        'Devom transformo nuestra presencia digital completamente. El equipo es profesional y el resultado supero nuestras expectativas.',
    },
    {
      name: 'Maria Fernandez',
      role: 'Directora de Marketing, InnovaLab',
      initials: 'MF',
      quote:
        'La app movil que desarrollaron para nosotros aumento un 40% la interaccion con nuestros clientes. Excelente trabajo.',
    },
    {
      name: 'Roberto Silva',
      role: 'Fundador, StartupChile',
      initials: 'RS',
      quote:
        'Desde que trabajamos con Devom, nuestros procesos se optimizaron y la escalabilidad de nuestra plataforma mejoro notablemente.',
    },
  ];

  glowOn(e: Event) {
    (e.currentTarget as HTMLElement).style.boxShadow =
      '0 0 40px rgba(30, 136, 255, 0.2)';
  }

  glowOff(e: Event) {
    (e.currentTarget as HTMLElement).style.boxShadow =
      '0 0 0 rgba(30, 136, 255, 0)';
  }
}
