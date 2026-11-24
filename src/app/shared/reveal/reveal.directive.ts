import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';
import { prefersReducedMotion } from '../../core/utils/motion';

export type RevealVariant = '' | 'l' | 'r' | 's';

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          observer?.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  return observer;
}

/**
 * Hace aparecer el elemento al entrar en pantalla.
 * Uso: `<div appReveal>`, o con dirección: `appReveal="l"` (izquierda), `"r"` (derecha), `"s"` (escala).
 * Los hermanos con la directiva entran escalonados.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'rv',
    '[class.rv-l]': 'appReveal() === "l"',
    '[class.rv-r]': 'appReveal() === "r"',
    '[class.rv-s]': 'appReveal() === "s"',
  },
})
export class RevealDirective implements OnDestroy {
  readonly appReveal = input<RevealVariant>('');
  readonly #el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    afterNextRender(() => {
      const siblings = Array.from(this.#el.parentElement?.children ?? []).filter((c) =>
        c.classList.contains('rv'),
      );
      this.#el.style.setProperty('--d', `${siblings.indexOf(this.#el) * 0.09}s`);

      if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
        this.#el.classList.add('on');
        return;
      }
      getObserver().observe(this.#el);
    });
  }

  ngOnDestroy(): void {
    observer?.unobserve(this.#el);
  }
}
