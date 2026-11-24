import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoMarkComponent } from '../../shared/logo-mark/logo-mark.component';

@Component({
  selector: 'app-footer',
  imports: [LogoMarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <div class="in">
        <a class="lockup" href="#inicio" aria-label="Devom, volver al inicio"><app-logo-mark /><span>devom</span></a>
        <span>© {{ year }} Devom · Desarrollo de software · devom.cl</span>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
