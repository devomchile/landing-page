import { environment } from '../../../../environments/environment';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  template: `
    <a [href]="whatsappUrl()" target="_blank" rel="noopener noreferrer">
      <ng-content />
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      a {
        display: inline-flex;
        text-decoration: none;
        color: inherit;
      }
    `,
  ],
})
export class WhatsappButtonComponent {
  private readonly phoneNumber = environment.whatsappNumber;
  message = input<string>('Hola, me gustaría información sobre sus servicios', {
    alias: 'message',
  });

  whatsappUrl(): string {
    const encoded = encodeURIComponent(this.message());
    return `https://wa.me/${this.phoneNumber}?text=${encoded}`;
  }
}
