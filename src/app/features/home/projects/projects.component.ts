import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { RevealDirective } from '../../../shared/reveal/reveal.directive';
import { NetworkBackgroundComponent } from '../network-background/network-background.component';
import { prefersReducedMotion } from '../../../core/utils/motion';
import { FEATURED, PORTFOLIO } from './projects.data';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective, NetworkBackgroundComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styles: `:host { display: contents; }`,
})
export class ProjectsComponent {
  readonly featured = FEATURED;
  readonly portfolio = PORTFOLIO;
  private readonly shot = viewChild.required<ElementRef<HTMLImageElement>>('shot');

  constructor() {
    const destroyRef = inject(DestroyRef);
    // Parallax suave de la captura destacada.
    afterNextRender(() => {
      if (prefersReducedMotion()) return;
      const img = this.shot().nativeElement;
      let ticking = false;
      const update = () => {
        ticking = false;
        const r = img.parentElement!.getBoundingClientRect();
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        img.style.transform = `translateY(${(p * -24).toFixed(1)}px) scale(1.03)`;
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };
      addEventListener('scroll', onScroll, { passive: true });
      update();
      destroyRef.onDestroy(() => removeEventListener('scroll', onScroll));
    });
  }
}
