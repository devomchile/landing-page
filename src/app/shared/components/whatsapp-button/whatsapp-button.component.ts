import { Component, input } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  template: `
    <a [href]="whatsappUrl()" target="_blank" rel="noopener noreferrer">
      <ng-content />
    </a>
  `,
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
  private readonly phoneNumber = '56946432453';
  message = input<string>('Hola, me gustaría información sobre sus servicios', {
    alias: 'message',
  });

  whatsappUrl(): string {
    const encoded = encodeURIComponent(this.message());
    return `https://wa.me/${this.phoneNumber}?text=${encoded}`;
  }
}
