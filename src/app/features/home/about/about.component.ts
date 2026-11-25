import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../../shared/reveal/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="about" id="nosotros">
      <div class="in">
        <div class="sec-head" appReveal="l" style="margin: 0">
          <span class="eyebrow">Quiénes somos</span>
          <h2>Un equipo chico, cercano y técnico.</h2>
        </div>
        <div style="display: flex; flex-direction: column; gap: 32px">
          <p class="big" appReveal>
            En Devom transformamos ideas y procesos en herramientas digitales que la gente realmente
            usa. Trabajamos directo contigo, sin intermediarios, y explicamos cada decisión en simple.
          </p>
          <div class="values">
            @for (v of values; track v.title) {
              <div class="value" appReveal="r">
                <span class="ic">{{ v.icon }}</span>
                <div>
                  <h3>{{ v.title }}</h3>
                  <p class="muted">{{ v.text }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `:host { display: contents; }`,
})
export class AboutComponent {
  readonly values = [
    {
      icon: '</>',
      title: 'Hecho a la medida',
      text: 'Nada de plantillas genéricas. Cada sitio o sistema parte de lo que tu organización necesita.',
    },
    {
      icon: '{ }',
      title: 'Calidad en los detalles',
      text: 'Sitios rápidos, accesibles y que se ven bien en cualquier pantalla, también en modo oscuro.',
    },
    {
      icon: '://',
      title: 'Acompañamiento real',
      text: 'Seguimos contigo después del lanzamiento: mejoras, soporte y mantención.',
    },
  ];
}
