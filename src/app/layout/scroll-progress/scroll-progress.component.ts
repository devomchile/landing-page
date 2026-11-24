import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';

/** Barra fina con el degradado de la marca que muestra cuánto se ha recorrido la página. */
@Component({
  selector: 'app-scroll-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="progress" aria-hidden="true"></div>`,
})
export class ScrollProgressComponent {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const bar = host.querySelector<HTMLElement>('.progress')!;
      let ticking = false;
      const update = () => {
        ticking = false;
        const h = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
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
