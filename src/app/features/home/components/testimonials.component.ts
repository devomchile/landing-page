import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  template: `
    <section class="section">
      <div class="container">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                style="background: var(--color-accent-subtle); color: var(--color-accent); font-family: var(--font-body);">
            Testimonios
          </span>
          <h2 class="text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-4"
              style="color: var(--color-text-primary); font-family: var(--font-heading); letter-spacing: -0.02em;">
            Lo que dicen nuestros
            <span class="gradient-text">clientes</span>
          </h2>
          <p class="text-lg max-w-[520px] mx-auto"
             style="color: var(--color-text-secondary); font-family: var(--font-body);">
            Empresas que confiaron en nosotros para su transformacion digital
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (t of testimonials; track t.name) {
            <div class="glass rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 cursor-default"
                 style="border: 1px solid var(--glass-border);"
                 [style.box-shadow]="'0 0 0 rgba(30,136,255,0)'"
                 (mouseenter)="glowOn($event)"
                 (mouseleave)="glowOff($event)">
              <!-- Estrellas -->
              <div class="flex gap-1 mb-4">
                @for (s of [1,2,3,4,5]; track s) {
                  <svg class="w-5 h-5" style="color: var(--color-warning);" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                }
              </div>

              <p class="text-[0.95rem] leading-[1.7] mb-6"
                 style="color: var(--color-text-secondary); font-family: var(--font-body);">
                "{{ t.quote }}"
              </p>

              <div class="flex items-center gap-3 pt-4 border-t" style="border-color: var(--color-border);">
                <!-- Avatar placeholder -->
                <div class="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white"
                     style="background: var(--gradient-brand); font-family: var(--font-heading);">
                  {{ t.initials }}
                </div>
                <div>
                  <div class="text-sm font-semibold" style="color: var(--color-text-primary);">{{ t.name }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted);">{{ t.role }}</div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent {
  testimonials = [
    {
      name: 'Carlos Mendez',
      role: 'CEO, TechCorp',
      initials: 'CM',
      quote: 'Devom transformo nuestra presencia digital completamente. El equipo es profesional y el resultado supero nuestras expectativas.',
    },
    {
      name: 'Maria Fernandez',
      role: 'Directora de Marketing, InnovaLab',
      initials: 'MF',
      quote: 'La app movil que desarrollaron para nosotros aumento un 40% la interaccion con nuestros clientes. Excelente trabajo.',
    },
    {
      name: 'Roberto Silva',
      role: 'Fundador, StartupChile',
      initials: 'RS',
      quote: 'Desde que trabajamos con Devom, nuestros procesos se optimizaron y la escalabilidad de nuestra plataforma mejoro notablemente.',
    },
  ];

  glowOn(e: Event) {
    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(30, 136, 255, 0.2)';
  }

  glowOff(e: Event) {
    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 rgba(30, 136, 255, 0)';
  }
}
