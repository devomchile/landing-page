import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  template: `
    <section class="section" style="background: var(--color-bg-secondary);">
      <div class="container">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                style="background: var(--color-accent-subtle); color: var(--color-accent); font-family: var(--font-body);">
            Precios
          </span>
          <h2 class="text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-4"
              style="color: var(--color-text-primary); font-family: var(--font-heading); letter-spacing: -0.02em;">
            Planes que se adaptan a tu
            <span class="gradient-text">negocio</span>
          </h2>
          <p class="text-lg max-w-[520px] mx-auto"
             style="color: var(--color-text-secondary); font-family: var(--font-body);">
            Elige el plan perfecto para comenzar tu transformacion digital
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1050px] mx-auto items-start">
          @for (plan of plans; track plan.name) {
            <div class="glass rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 relative"
                 [class.ring-2]="plan.featured"
                 [style.borderColor]="plan.featured ? 'var(--color-accent)' : 'var(--glass-border)'"
                 [style.box-shadow]="plan.featured ? '0 0 50px rgba(30,136,255,0.15)' : 'none'">

              @if (plan.featured) {
                <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                     style="background: var(--gradient-brand);">
                  Mas popular
                </div>
              }

              <div class="mb-6">
                <h3 class="text-xl font-bold mb-2"
                    style="color: var(--color-text-primary); font-family: var(--font-heading);">
                  {{ plan.name }}
                </h3>
                <p class="text-sm" style="color: var(--color-text-secondary);">{{ plan.desc }}</p>
              </div>

              <div class="mb-8">
                <span class="text-4xl font-bold" style="color: var(--color-text-primary); font-family: var(--font-heading);">{{ '$' + plan.price }}</span>
                <span class="text-sm ml-1" style="color: var(--color-text-muted);">/mes</span>
              </div>

              <ul class="flex flex-col gap-3 mb-8">
                @for (f of plan.features; track f) {
                  <li class="flex items-center gap-2.5 text-sm" style="color: var(--color-text-secondary);">
                    <app-icon name="arrow" [size]="14" />
                    {{ f }}
                  </li>
                }
              </ul>

              <app-button
                [variant]="plan.featured ? 'primary' : 'outline'"
                size="md"
                class="w-full">
                {{ plan.cta }}
              </app-button>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class PricingComponent {
  plans = [
    {
      name: 'Basico',
      desc: 'Para pequenos negocios',
      price: '49',
      featured: false,
      cta: 'Empezar',
      features: [
        'Hasta 5 paginas web',
        'Diseno responsivo',
        'Soporte por email',
        'Hosting incluido',
        'Certificado SSL',
      ],
    },
    {
      name: 'Profesional',
      desc: 'Para empresas en crecimiento',
      price: '149',
      featured: true,
      cta: 'Empezar ahora',
      features: [
        'Hasta 20 paginas',
        'App movil basica',
        'SEO optimizado',
        'Soporte prioritario',
        'Analytics avanzado',
        'Integraciones API',
      ],
    },
    {
      name: 'Enterprise',
      desc: 'Para grandes organizaciones',
      price: '399',
      featured: false,
      cta: 'Contactar',
      features: [
        'Paginas ilimitadas',
        'App movil completa',
        'Ciberseguridad avanzada',
        'Soporte 24/7',
        'DevOps & Cloud',
        'Consultoria dedicada',
      ],
    },
  ];
}
