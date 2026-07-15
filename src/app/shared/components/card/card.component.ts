import { Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div [class]="cardClasses">
      @if (icon()) {
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
             style="background: var(--gradient-card);">
          <app-icon [name]="icon()!" [size]="28" />
        </div>
      }
      @if (title()) {
        <h3 class="text-lg font-bold mb-2" style="color: var(--color-text-primary); font-family: var(--font-heading);">
          {{ title() }}
        </h3>
      }
      <div class="leading-relaxed text-[0.9375rem]" style="color: var(--color-text-secondary); font-family: var(--font-body);">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    .card {
      padding: 1.75rem;
      border-radius: 24px;
      transition: all var(--transition-base);
      height: 100%;
    }

    .card--hover:hover {
      transform: translateY(-4px);
      background: var(--color-bg-card-hover);
      border-color: var(--color-border-hover);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 0 40px rgba(30, 136, 255, 0.15);
    }
  `]
})
export class CardComponent {
  title = input<string>();
  icon = input<string>();
  hoverable = input(true);

  get cardClasses(): string {
    return `card glass ${this.hoverable() ? 'card--hover' : ''}`;
  }
}
