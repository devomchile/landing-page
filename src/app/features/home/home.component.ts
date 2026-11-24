import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <app-hero />
    </main>
  `,
})
export class HomeComponent {}
