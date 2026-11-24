import { DOCUMENT, Injectable, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'devom-theme';

/**
 * Modo día / noche.
 * Sin elección guardada sigue la preferencia del sistema; al alternar se guarda en localStorage.
 * Deja la clase `is-light` en <html> para los estilos y los canvas.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly #root = inject(DOCUMENT).documentElement;
  readonly #mq =
    typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: light)') : null;

  readonly isLight = signal(false);

  constructor() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved) this.#root.setAttribute('data-theme', saved);
    } catch {
      /* almacenamiento bloqueado: se usa la preferencia del sistema */
    }
    this.#mq?.addEventListener('change', () => this.#sync());
    this.#sync();
  }

  toggle(): void {
    const next: Theme = this.isLight() ? 'dark' : 'light';
    this.#root.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* sin persistencia */
    }
    this.#sync();
  }

  #sync(): void {
    const attr = this.#root.getAttribute('data-theme');
    const light = attr ? attr === 'light' : !!this.#mq?.matches;
    this.isLight.set(light);
    this.#root.classList.toggle('is-light', light);
  }
}
