import { Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-feature-item',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="flex items-center gap-2">
      <app-icon>{{ icon() }}</app-icon>
      <span
        class="text-sm font-medium"
        style="color: var(--color-text-secondary);"
        >{{ label() }}</span
      >
    </div>
  `,
})
export class FeatureItemComponent {
  icon = input.required<string>();
  label = input.required<string>();
}
