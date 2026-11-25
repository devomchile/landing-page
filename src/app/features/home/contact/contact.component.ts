import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { RevealDirective } from '../../../shared/reveal/reveal.directive';
import { WhatsappIconComponent } from '../../../shared/whatsapp/whatsapp-icon.component';
import { whatsappLink } from '../../../shared/whatsapp/whatsapp-link';
import { ContactFormService } from './contact-form.service';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'invalid';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RevealDirective, WhatsappIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styles: `:host { display: contents; }`,
})
export class ContactComponent {
  readonly #service = inject(ContactFormService);

  readonly needs = [
    'Sitio web o landing page',
    'Sistema a medida',
    'Aplicación web',
    'Mantención o soporte',
    'Otro',
  ];

  readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: [this.needs[0], Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly status = signal<Status>('idle');
  readonly feedback = signal('');

  readonly #values = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

  /** El botón de WhatsApp lleva lo que la persona ya escribió en el formulario. */
  readonly whatsappHref = computed(() => {
    const v = this.#values();
    const lines = [
      'Hola, vengo desde devom.cl y quiero cotizar un proyecto.',
      v.subject ? `Necesito: ${v.subject}` : '',
      v.name ? `Nombre: ${v.name}` : '',
      v.message ? `Mensaje: ${v.message}` : '',
    ];
    return whatsappLink(lines.filter(Boolean).join('\n'));
  });

  invalid(field: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[field];
    return c.invalid && (c.touched || this.status() === 'invalid');
  }

  submit(): void {
    if (this.status() === 'sending') return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status.set('invalid');
      this.feedback.set('Revisa tu nombre, un correo válido y un mensaje de al menos 10 caracteres.');
      return;
    }

    this.status.set('sending');
    this.feedback.set('Enviando…');
    this.#service.send(this.form.getRawValue()).subscribe({
      next: (res) => {
        if (res.status === 'mail_sent') {
          this.status.set('sent');
          this.feedback.set('¡Gracias! Recibimos tu mensaje y te responderemos pronto.');
          this.form.reset();
        } else {
          this.status.set('error');
          this.feedback.set(res.message || 'No pudimos enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp.');
        }
      },
      error: () => {
        this.status.set('error');
        this.feedback.set('No pudimos enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp.');
      },
    });
  }
}
