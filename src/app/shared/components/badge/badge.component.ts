import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<span [class]="classes"><ng-content /></span>`,
  styles: [
    `
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.375rem 1rem;
        border-radius: 999px;
        font-family: var(--font-body);
        font-size: 0.8125rem;
        font-weight: 600;
        letter-spacing: 0.01em;
      }

      .badge--accent {
        background: rgba(30, 136, 255, 0.1);
        color: var(--color-accent);
        border: 1px solid rgba(30, 136, 255, 0.18);
      }

      .badge--glass {
        background: var(--glass-bg);
        backdrop-filter: blur(var(--glass-blur));
        border: 1px solid var(--glass-border);
        color: var(--color-text-secondary);
      }
    `,
  ],
})
export class BadgeComponent {
  variant = input<'accent' | 'glass'>('accent');

  get classes(): string {
    return `badge badge--${this.variant()}`;
  }
}
