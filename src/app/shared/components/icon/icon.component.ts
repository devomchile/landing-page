import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon',
  imports: [MatIconModule],
  template: `<mat-icon (click)="$clicked.emit()">
    <ng-content></ng-content>
  </mat-icon>`,
})
export class IconComponent {
  readonly $clicked = output({ alias: 'clicked' });
}
