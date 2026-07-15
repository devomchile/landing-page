import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer
      class="border-t"
      style="background: var(--color-bg-secondary); border-color: var(--color-border);"
    >
      <div class="container py-16">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg"
                style="background: var(--gradient-brand); font-family: var(--font-heading);"
              >
                D
              </div>
              <span
                class="text-xl font-bold"
                style="color: var(--color-text-primary); font-family: var(--font-heading);"
                >Devom</span
              >
            </div>
            <p
              class="text-sm leading-relaxed"
              style="color: var(--color-text-secondary);"
            >
              Tecnologia que impulsa tu negocio.
            </p>
          </div>

          <div>
            <h4
              class="text-xs font-semibold uppercase tracking-wider mb-5"
              style="color: var(--color-text-primary); font-family: var(--font-body);"
            >
              Servicios
            </h4>
            <ul class="flex flex-col gap-2.5">
              <li>
                <a
                  class="text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                  style="color: var(--color-text-secondary);"
                  href="#"
                  >Desarrollo Web</a
                >
              </li>
              <li>
                <a
                  class="text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                  style="color: var(--color-text-secondary);"
                  href="#"
                  >Apps Moviles</a
                >
              </li>
              <li>
                <a
                  class="text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                  style="color: var(--color-text-secondary);"
                  href="#"
                  >Consultoria</a
                >
              </li>
              <li>
                <a
                  class="text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                  style="color: var(--color-text-secondary);"
                  href="#"
                  >Cloud &amp; DevOps</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h4
              class="text-xs font-semibold uppercase tracking-wider mb-5"
              style="color: var(--color-text-primary); font-family: var(--font-body);"
            >
              Empresa
            </h4>
            <ul class="flex flex-col gap-2.5">
              <li>
                <a
                  class="text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                  style="color: var(--color-text-secondary);"
                  href="#"
                  >Nosotros</a
                >
              </li>
              <li>
                <a
                  class="text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                  style="color: var(--color-text-secondary);"
                  href="#"
                  >Blog</a
                >
              </li>
              <li>
                <a
                  class="text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                  style="color: var(--color-text-secondary);"
                  href="#"
                  >Carreras</a
                >
              </li>
              <li>
                <a
                  class="text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                  style="color: var(--color-text-secondary);"
                  href="#"
                  >Contacto</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h4
              class="text-xs font-semibold uppercase tracking-wider mb-5"
              style="color: var(--color-text-primary); font-family: var(--font-body);"
            >
              Contacto
            </h4>
            <ul class="flex flex-col gap-2.5">
              <li>
                <a
                  class="text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                  style="color: var(--color-text-secondary);"
                  href="mailto:hola&#64;devom.cl"
                  >hola&#64;devom.cl</a
                >
              </li>
              <li>
                <a
                  class="text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                  style="color: var(--color-text-secondary);"
                  href="#"
                  >+56 9 XXXX XXXX</a
                >
              </li>
              <li>
                <a
                  class="text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                  style="color: var(--color-text-secondary);"
                  href="#"
                  >Santiago, Chile</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row justify-between items-center pt-8 border-t gap-4"
          style="border-color: var(--color-border);"
        >
          <p class="text-sm" style="color: var(--color-text-muted);">
            &copy; 2026 Devom. Todos los derechos reservados.
          </p>
          <div class="flex gap-6">
            <a
              class="text-sm transition-colors duration-200 hover:text-[var(--color-text-primary)]"
              style="color: var(--color-text-muted);"
              href="#"
              >Privacidad</a
            >
            <a
              class="text-sm transition-colors duration-200 hover:text-[var(--color-text-primary)]"
              style="color: var(--color-text-muted);"
              href="#"
              >Terminos</a
            >
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
