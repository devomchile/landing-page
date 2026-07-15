import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  template: `
    <a class="nav-item" [class.nav-item--active]="active()"
       (clicked)="clicked.emit(); $event.preventDefault()" href="#">
      {{ label() }}
    </a>
  `,
  styles: [`
    .nav-item {
      color: var(--color-text-secondary);
      font-family: var(--font-body);
      font-size: 0.9375rem;
      font-weight: 500;
      padding: 0.5rem 0;
      position: relative;
      transition: color var(--transition-fast);
      text-decoration: none;
      letter-spacing: -0.01em;
    }

    .nav-item::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--gradient-brand);
      border-radius: 999px;
      transition: width var(--transition-base);
    }

    .nav-item:hover,
    .nav-item--active {
      color: var(--color-text-primary);
    }

    .nav-item:hover::after,
    .nav-item--active::after {
      width: 100%;
    }
  `]
})
export class NavItemComponent {
  label = input.required<string>();
  active = input(false);
  clicked = output();
}
