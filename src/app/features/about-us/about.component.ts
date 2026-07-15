import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="section">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                  style="background: var(--color-accent-subtle); color: var(--color-accent); font-family: var(--font-body);">
              Nosotros
            </span>
            <h2 class="text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-6"
                style="color: var(--color-text-primary); font-family: var(--font-heading); letter-spacing: -0.02em;">
              Somos el equipo que tu empresa
              <span class="gradient-text">necesita</span>
            </h2>
            <p class="text-[1.05rem] leading-[1.8] mb-8"
               style="color: var(--color-text-secondary); font-family: var(--font-body);">
              En Devom somos un equipo apasionado por la tecnologia y la innovacion.
              Con mas de 10 anhos de experiencia, hemos ayudado a empresas de todos los tamanos
              a transformar su presencia digital y alcanzar sus objetivos de negocio.
            </p>

            <!-- Stats en glass cards -->
            <div class="flex gap-4">
              @for (stat of stats; track stat.label) {
                <div class="glass rounded-2xl px-5 py-4 flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
                     style="border: 1px solid var(--glass-border);"
                     [style.box-shadow]="'0 0 0 rgba(30,136,255,0)'"
                     (mouseenter)="glowOn($event)"
                     (mouseleave)="glowOff($event)">
                  <span class="text-2xl font-bold gradient-text" style="font-family: var(--font-heading);">{{ stat.value }}</span>
                  <span class="text-xs font-medium mt-1" style="color: var(--color-text-muted);">{{ stat.label }}</span>
                </div>
              }
            </div>
          </div>

          <div class="flex flex-col gap-6">
            <div class="glass p-7 transition-all duration-300 hover:-translate-y-1"
                 style="border-radius: 24px; border: 1px solid var(--glass-border);"
                 [style.box-shadow]="'0 0 0 rgba(30,136,255,0)'"
                 (mouseenter)="glowOn($event)"
                 (mouseleave)="glowOff($event)">
              <div class="text-3xl mb-4">🚀</div>
              <h3 class="text-xl font-bold mb-2"
                  style="color: var(--color-text-primary); font-family: var(--font-heading);">Mision</h3>
              <p class="leading-relaxed"
                 style="color: var(--color-text-secondary); font-family: var(--font-body);">
                Empoderar a las empresas con soluciones tecnologicas innovadoras que impulsen su crecimiento.
              </p>
            </div>
            <div class="glass p-7 transition-all duration-300 hover:-translate-y-1"
                 style="border-radius: 24px; border: 1px solid var(--glass-border);"
                 [style.box-shadow]="'0 0 0 rgba(30,136,255,0)'"
                 (mouseenter)="glowOn($event)"
                 (mouseleave)="glowOff($event)">
              <div class="text-3xl mb-4">🎯</div>
              <h3 class="text-xl font-bold mb-2"
                  style="color: var(--color-text-primary); font-family: var(--font-heading);">Vision</h3>
              <p class="leading-relaxed"
                 style="color: var(--color-text-secondary); font-family: var(--font-body);">
                Ser lideres en transformacion digital en Latinoamerica, reconocidos por nuestra excelencia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  stats = [
    { value: '150+', label: 'Proyectos' },
    { value: '98%', label: 'Satisfaccion' },
    { value: '10+', label: 'Anhos' },
  ];

  glowOn(e: Event) {
    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(30, 136, 255, 0.2)';
  }

  glowOff(e: Event) {
    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 rgba(30, 136, 255, 0)';
  }
}
