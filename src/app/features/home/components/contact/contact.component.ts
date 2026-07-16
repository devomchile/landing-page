import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { WhatsappButtonComponent } from '../../../../shared/components/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    IconComponent,
    WhatsappButtonComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  get whatsappMessage(): string {
    const v = this.form.value;
    const parts = [
      `Hola, me comunico desde la página web.`,
      v.name ? `Nombre: ${v.name}` : '',
      v.email ? `Email: ${v.email}` : '',
      v.phone ? `Teléfono: ${v.phone}` : '',
      v.subject ? `Asunto: ${v.subject}` : '',
      v.message ? `Mensaje: ${v.message}` : '',
    ];
    return parts.filter(Boolean).join('%0A');
  }

  onSubmit() {
    if (this.form.valid) {
      const msg = encodeURIComponent(this.whatsappMessage);
      window.open(`https://wa.me/56946432453?text=${msg}`, '_blank');
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
