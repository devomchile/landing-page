import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CardComponent],
  template: `
    <section class="section" style="background: var(--color-bg-secondary);">
      <div class="container">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                style="background: var(--color-accent-subtle); color: var(--color-accent); font-family: var(--font-body);">
            Servicios
          </span>
          <h2 class="text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-4"
              style="color: var(--color-text-primary); font-family: var(--font-heading); letter-spacing: -0.02em;">
            Todo lo que tu negocio necesita para
            <span class="gradient-text">crecer</span>
          </h2>
          <p class="text-lg max-w-[520px] mx-auto"
             style="color: var(--color-text-secondary); font-family: var(--font-body);">
            Ofrecemos soluciones completas para cada etapa de tu proyecto digital
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <app-card title="Desarrollo Web" icon="code" [hoverable]="true">
            Creamos sitios web modernos, rapidos y optimizados con las ultimas tecnologias del mercado.
          </app-card>
          <app-card title="Apps Moviles" icon="rocket" [hoverable]="true">
            Aplicaciones nativas e hibridas que brindan la mejor experiencia a tus usuarios.
          </app-card>
          <app-card title="Ciberseguridad" icon="shield" [hoverable]="true">
            Protegemos tu negocio con las mejores practicas de seguridad informatica.
          </app-card>
          <app-card title="Consultoria" icon="users" [hoverable]="true">
            Estrategia digital personalizada para optimizar tus procesos y maximizar resultados.
          </app-card>
          <app-card title="Cloud &amp; DevOps" icon="lightning" [hoverable]="true">
            Infraestructura escalable en la nube con despliegues automatizados y confiables.
          </app-card>
          <app-card title="Analytics" icon="chart" [hoverable]="true">
            Dashboards e insights basados en datos para tomar mejores decisiones de negocio.
          </app-card>
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {}
