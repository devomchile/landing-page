import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, WhatsappButtonComponent } from '../../../../shared';

@Component({
  selector: 'app-cta',
  imports: [ButtonComponent, WhatsappButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './cta.component.html',
})
export class CtaComponent {}
