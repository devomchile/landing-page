import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { LogoMarkComponent } from '../../shared/logo-mark/logo-mark.component';

@Component({
  selector: 'app-navbar',
  imports: [LogoMarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav>
      <div class="in">
        <a class="lockup" href="#inicio" aria-label="Devom, inicio"><app-logo-mark /><span>devom</span></a>
        <div class="links">
          @for (link of links; track link.href) {
            <a [href]="link.href">{{ link.label }}</a>
          }
          <button
            class="theme"
            type="button"
            (click)="theme.toggle()"
            [attr.aria-label]="theme.isLight() ? 'Cambiar a modo noche' : 'Cambiar a modo día'"
          >
            <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          </button>
          <a class="btn btn-p" href="#contacto">Conversemos</a>
        </div>
      </div>
    </nav>
  `,
  styles: `:host { display: contents; }`,
})
export class NavbarComponent {
  readonly theme = inject(ThemeService);
  readonly links = [
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#proyectos', label: 'Proyectos' },
    { href: '#proceso', label: 'Cómo trabajamos' },
  ];
}
