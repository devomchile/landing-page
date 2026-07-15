import { Component } from '@angular/core';
import { ServicesComponent } from './components/services.component';
import { AboutComponent } from '../about-us/about.component';
import { TestimonialsComponent } from './components/testimonials.component';
import { PricingComponent } from './components/pricing.component';
import { CtaComponent } from './components/cta.component';
import { HeroComponent } from './components/hero/hero.component';

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
