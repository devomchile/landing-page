import { Component } from '@angular/core';
import { ButtonComponent, WhatsappButtonComponent } from '../../../../shared';

@Component({
  selector: 'app-cta',
  imports: [ButtonComponent, WhatsappButtonComponent],
  templateUrl: './cta.component.html',
})
export class CtaComponent {}
