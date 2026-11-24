import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../../shared/reveal/reveal.directive';

@Component({
  selector: 'app-services',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="services" id="servicios">
      <div class="in">
        <div class="sec-head" appReveal>
          <span class="eyebrow">Qué hacemos</span>
          <h2>Del primer boceto a producción.</h2>
        </div>
        <div class="grid4">
          @for (s of services; track s.title) {
            <article class="svc" appReveal (pointermove)="spotlight($event)">
              <span class="tag">{{ s.tag }}</span>
              <h3>{{ s.title }}</h3>
              <p class="muted">{{ s.text }}</p>
              <ul>
                @for (item of s.items; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `:host { display: contents; }`,
})
export class ServicesComponent {
  readonly services = [
    {
      tag: '<web />',
      title: 'Sitios web y landing pages',
      text: 'Presencia profesional que comunica quién eres y convierte visitas en contactos.',
      items: ['Diseño responsive', 'Modo claro y oscuro', 'Optimizado para Google'],
    },
    {
      tag: '<sistemas />',
      title: 'Sistemas a medida',
      text: 'Plataformas internas que ordenan tus procesos y te ahorran planillas y correos.',
      items: ['Paneles de administración', 'Gestión de usuarios y roles', 'Reportes'],
    },
    {
      tag: '<apps />',
      title: 'Aplicaciones web',
      text: 'Herramientas que tus clientes o tu equipo usan desde el computador o el celular.',
      items: ['Formularios y postulaciones', 'Reservas y agendamiento', 'Integraciones'],
    },
    {
      tag: '<soporte />',
      title: 'Mantención y hosting',
      text: 'Nos encargamos de que tu sitio siga funcionando, seguro y al día.',
      items: ['Dominio y hosting', 'Actualizaciones de contenido', 'Respaldos y seguridad'],
    },
  ];

  /** Brillo que sigue al mouse dentro de la tarjeta. */
  spotlight(e: PointerEvent): void {
    const card = e.currentTarget as HTMLElement;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }
}
