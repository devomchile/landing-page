import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main></main>
  `,
})
export class HomeComponent {}
