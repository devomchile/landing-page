import { Component } from '@angular/core';
import { AboutComponent } from '../about-us/about.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services';
import { TestimonialsComponent } from './components/testimonials';
import { PricingComponent } from './components/pricing';
import { CtaComponent } from './components/cta';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    TestimonialsComponent,
    PricingComponent,
    CtaComponent,
  ],
  template: `
    <main>
      <app-hero />
      <app-services />
      <app-about />
      <app-testimonials />
      <app-pricing />
      <app-cta />
    </main>
  `,
})
export class HomeComponent {}
