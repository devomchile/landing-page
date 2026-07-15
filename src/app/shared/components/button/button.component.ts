import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button [class]="classes" [disabled]="disabled()" [type]="type()">
      <ng-content />
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-family: var(--font-body);
      font-weight: 600;
      border-radius: 16px;
      transition: all var(--transition-base);
      cursor: pointer;
      border: none;
      white-space: nowrap;
      letter-spacing: -0.01em;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn--sm { padding: 0.5rem 1.25rem; font-size: 0.875rem; }
    .btn--md { padding: 0.75rem 1.75rem; font-size: 0.9375rem; }
    .btn--lg { padding: 1rem 2.25rem; font-size: 1rem; }

    .btn--primary {
      background: var(--gradient-brand);
      color: #ffffff;
      box-shadow: 0 4px 20px rgba(30, 136, 255, 0.35);
    }

    .btn--primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(30, 136, 255, 0.5);
      filter: brightness(1.1);
    }

    .btn--glass {
      background: var(--glass-bg);
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
      border: 1px solid var(--glass-border);
      color: var(--color-text-primary);
    }

    .btn--glass:hover:not(:disabled) {
      background: var(--color-bg-card-hover);
      border-color: var(--color-border-hover);
      transform: translateY(-2px);
    }

    .btn--outline {
      background: transparent;
      border: 2px solid var(--color-accent);
      color: var(--color-accent);
    }

    .btn--outline:hover:not(:disabled) {
      background: var(--color-accent);
      color: #ffffff;
      transform: translateY(-2px);
    }
  `]
})
export class ButtonComponent {
  variant = input<'primary' | 'glass' | 'outline'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input(false);
  type = input<'button' | 'submit'>('button');

  get classes(): string {
    return `btn btn--${this.variant()} btn--${this.size()}`;
  }
}
