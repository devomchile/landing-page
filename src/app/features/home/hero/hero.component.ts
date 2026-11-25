import { ChangeDetectionStrategy, Component, DOCUMENT, afterNextRender, inject } from '@angular/core';
import { ParticleLogoComponent } from '../particle-logo/particle-logo.component';

@Component({
  selector: 'app-hero',
  imports: [ParticleLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styles: `:host { display: contents; }`,
})
export class HeroComponent {
  /** El título entra palabra por palabra; la última palabra lleva el degradado. */
  readonly words = ['Construimos', 'el', 'software', 'que', 'tu', 'organización'];
  readonly highlight = 'necesita';

  constructor() {
    const root = inject(DOCUMENT).documentElement;
    afterNextRender(() => requestAnimationFrame(() => root.classList.add('loaded')));
  }
}
