import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../../shared/reveal/reveal.directive';

@Component({
  selector: 'app-process',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="proceso">
      <div class="in">
        <div class="sec-head" appReveal>
          <span class="eyebrow">Cómo trabajamos</span>
          <h2>Un proceso simple y transparente.</h2>
        </div>
        <div class="steps">
          @for (s of steps; track s.title) {
            <div class="step" appReveal>
              <h3>{{ s.title }}</h3>
              <p class="muted">{{ s.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `:host { display: contents; }`,
})
export class ProcessComponent {
  readonly steps = [
    { title: 'Conversamos', text: 'Entendemos tu organización, tus objetivos y lo que necesitas resolver.' },
    { title: 'Diseñamos', text: 'Te mostramos una propuesta visual y la ajustamos contigo antes de programar.' },
    { title: 'Desarrollamos', text: 'Construimos con avances visibles, para que veas el proyecto crecer.' },
    {
      title: 'Lanzamos y acompañamos',
      text: 'Publicamos, te enseñamos a usarlo y seguimos disponibles para lo que venga.',
    },
  ];
}
