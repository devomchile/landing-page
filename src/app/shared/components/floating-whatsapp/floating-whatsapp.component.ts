import { Component, input } from '@angular/core';
import { WhatsappButtonComponent } from '../whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-floating-whatsapp',
  standalone: true,
  imports: [WhatsappButtonComponent],
  template: `
    <app-whatsapp-button [message]="message()">
      <div class="fab">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" width="28" height="28">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.374L1.054 31.25l6.118-1.974A15.91 15.91 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.316 22.594c-.39 1.096-1.932 2.008-3.146 2.27-.836.18-1.928.322-5.604-1.202-4.712-1.95-7.738-6.72-7.97-7.032-.226-.312-1.878-2.498-1.878-4.764 0-2.264 1.188-3.378 1.61-3.84.39-.428.924-.558 1.228-.558.302 0 .604.002.868.016.28.012.652-.106.892.68.248.816.84 2.814.914 3.014.074.2.124.434.024.7-.098.27-.148.436-.296.67-.148.234-.312.522-.446.698-.148.196-.302.408-.128.798.174.39.772 1.902 1.656 3.082 1.138 1.518 2.1 1.99 2.4 2.212.3.224.474.188.65-.112.174-.3.744-1.064.944-1.428.196-.364.394-.304.666-.182.274.12 1.734.818 2.032.968.298.148.498.224.572.348.074.124.074.72-.316 1.816z"/>
        </svg>
      </div>
    </app-whatsapp-button>
  `,
  styles: [`
    :host {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 998;
    }

    .fab {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background-color: #25D366;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-base, 250ms ease);
    }

    .fab:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 32px rgba(37, 211, 102, 0.4);
      background-color: #20bd5a;
    }

    .fab:active {
      transform: scale(0.95);
    }
  `]
})
export class FloatingWhatsappComponent {
  message = input('Hola, me gustaría información sobre sus servicios');
}
