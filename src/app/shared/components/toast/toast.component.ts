import { Component, input, output } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="toast" [class]="'toast--' + type()" (click)="dismiss.emit()">
      <span class="toast__icon" [class]="'toast__icon--' + type()">
        {{ icon() }}
      </span>
      <span class="toast__message">{{ message() }}</span>
    </div>
  `,
  styles: `
    .toast {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1.25rem;
      border-radius: 16px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      font-family: var(--font-body);
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-text-primary);
      cursor: pointer;
      transition: all 250ms ease;
      max-width: 380px;
      pointer-events: auto;
    }

    .toast:hover {
      transform: translateX(-4px);
    }

    .toast__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      flex-shrink: 0;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .toast__icon--success {
      background: rgba(25, 195, 125, 0.2);
      color: var(--color-success);
    }

    .toast__icon--error {
      background: rgba(255, 77, 103, 0.2);
      color: var(--color-error);
    }

    .toast__icon--info {
      background: rgba(30, 136, 255, 0.2);
      color: var(--color-accent);
    }

    .toast__message {
      flex: 1;
      line-height: 1.4;
      color: var(--color-text-primary);
    }
  `,
})
export class ToastComponent {
  type = input.required<ToastType>();
  message = input.required<string>();
  dismiss = output<void>();

  icon(): string {
    switch (this.type()) {
      case 'success':
        return '\u2713';
      case 'error':
        return '\u2717';
      case 'info':
        return 'i';
    }
  }
}
