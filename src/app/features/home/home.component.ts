import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services';
import { PricingComponent } from './components/pricing';
import { CtaComponent } from './components/cta';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    PricingComponent,
    CtaComponent,
    ContactComponent,
  ],
  template: `
    <main>
      <app-hero />
      <app-services />
      <app-about />
      <app-pricing />
      <app-contact />
      <app-cta />
    </main>
  `,
})
export class HomeComponent {}
