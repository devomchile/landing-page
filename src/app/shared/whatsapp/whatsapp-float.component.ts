import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { prefersReducedMotion } from '../../core/utils/motion';
import { WhatsappIconComponent } from './whatsapp-icon.component';
import { whatsappLink } from './whatsapp-link';

const CLOSED_KEY = 'devom-wa-closed';
const MESSAGE = '¿Tienes un proyecto? Escríbenos, respondemos rápido.';

/**
 * Botón flotante de WhatsApp con efecto vidrio.
 * Aparece al pasar la mitad del hero, sigue un poco al cursor y muestra una burbuja que "escribe" un mensaje.
 */
@Component({
  selector: 'app-whatsapp-float',
  imports: [WhatsappIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wa" [class.on]="shown()">
      <div class="wa-bubble" role="status" [class.show]="bubble()" (click)="btn.click()">
        <button class="x" type="button" aria-label="Cerrar mensaje" (click)="close($event)">✕</button>
        @if (typing()) {
          <span class="wa-dots">Escribiendo</span>
        } @else {
          <span>{{ text() }}</span>
        }
      </div>
      <a
        #btn
        class="wa-btn"
        [href]="href"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
      >
        <app-whatsapp-icon />
      </a>
    </div>
  `,
  styles: `:host { display: contents; }`,
})
export class WhatsappFloatComponent {
  readonly href = whatsappLink('Hola, vengo desde devom.cl y quiero cotizar un proyecto.');
  readonly btn = viewChild.required<ElementRef<HTMLAnchorElement>>('btn');

  readonly shown = signal(false);
  readonly bubble = signal(false);
  readonly typing = signal(false);
  readonly text = signal('');

  #closed = false;
  #said = false;
  readonly #reduce = prefersReducedMotion();
  readonly #timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    try {
      this.#closed = sessionStorage.getItem(CLOSED_KEY) === '1';
    } catch {
      /* sin almacenamiento */
    }
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const check = () => {
        const hero = document.getElementById('inicio');
        const past = scrollY > (hero ? hero.offsetHeight * 0.5 : 300);
        if (past && !this.shown()) {
          this.shown.set(true);
          if (!this.#closed) this.#later(() => this.#say(), 1800);
        } else if (!past && this.shown() && scrollY < 80) {
          this.shown.set(false);
          this.bubble.set(false);
        }
      };
      addEventListener('scroll', check, { passive: true });
      check();

      // Efecto magnético: el botón se acerca un poco al cursor.
      const btn = this.btn().nativeElement;
      const magnet = (e: PointerEvent) => {
        if (!this.shown()) return;
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy);
        const k = d < 140 ? (1 - d / 140) * 0.35 : 0;
        btn.style.setProperty('--tx', `${(dx * k).toFixed(1)}px`);
        btn.style.setProperty('--ty', `${(dy * k).toFixed(1)}px`);
      };
      const magnetic = !this.#reduce && matchMedia('(hover: hover)').matches;
      if (magnetic) addEventListener('pointermove', magnet, { passive: true });

      destroyRef.onDestroy(() => {
        removeEventListener('scroll', check);
        if (magnetic) removeEventListener('pointermove', magnet);
        this.#timers.forEach(clearTimeout);
      });
    });
  }

  close(e: Event): void {
    e.stopPropagation();
    this.#closed = true;
    this.bubble.set(false);
    try {
      sessionStorage.setItem(CLOSED_KEY, '1');
    } catch {
      /* sin almacenamiento */
    }
  }

  #say(): void {
    if (this.#closed || !this.shown() || this.#said) return;
    this.#said = true;
    this.bubble.set(true);
    if (this.#reduce) {
      this.text.set(MESSAGE);
      return;
    }
    this.typing.set(true);
    this.#later(() => {
      this.typing.set(false);
      let i = 0;
      const tick = () => {
        this.text.set(MESSAGE.slice(0, ++i));
        if (i < MESSAGE.length) this.#later(tick, 28);
      };
      tick();
    }, 1100);
  }

  #later(fn: () => void, ms: number): void {
    this.#timers.push(setTimeout(fn, ms));
  }
}
