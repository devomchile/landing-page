import { ChangeDetectionStrategy, Component } from '@angular/core';

let uid = 0;

/** Símbolo "<D" de Devom con el degradado de la marca. */
@Component({
  selector: 'app-logo-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="180 300 900 640" aria-hidden="true">
      <defs>
        <linearGradient [attr.id]="gid" gradientUnits="userSpaceOnUse" x1="220" y1="0" x2="1030" y2="0">
          <stop offset="0" stop-color="#22D3F9" />
          <stop offset=".42" stop-color="#1E6BFF" />
          <stop offset=".78" stop-color="#7B2FF7" />
          <stop offset="1" stop-color="#C35CFF" />
        </linearGradient>
      </defs>
      <g fill="none" [attr.stroke]="'url(#' + gid + ')'" stroke-width="112" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="468,392 288,598 432,800" />
        <path d="M684,600 L536,846 H740 A228,228 0 0 0 740,390 H624" />
      </g>
    </svg>
  `,
  styles: `:host { display: contents; }`,
})
export class LogoMarkComponent {
  readonly gid = `devom-grad-${++uid}`;
}
