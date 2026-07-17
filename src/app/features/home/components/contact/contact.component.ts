import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { WhatsappButtonComponent } from '../../../../shared/components/whatsapp-button/whatsapp-button.component';
import { FormService } from './access-data/form.service';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { environment } from '../../../../../environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    IconComponent,
    WhatsappButtonComponent,
    AsyncPipe,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly #fb = inject(FormBuilder);
  readonly formService = inject(FormService);
  readonly #toastService = inject(ToastService);

  form = this.#fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  get whatsappMessage(): string {
    const v = this.form.value;
    const parts = [
      `Hola, me comunico desde la pagina web.`,
      v.name ? `Nombre: ${v.name}` : '',
      v.email ? `Email: ${v.email}` : '',
      v.phone ? `Telefono: ${v.phone}` : '',
      v.subject ? `Asunto: ${v.subject}` : '',
      v.message ? `Mensaje: ${v.message}` : '',
    ];
    return parts.filter(Boolean).join('%0A');
  }

  constructor() {
    this.formService.success$
      .pipe(
        takeUntilDestroyed(),
        tap(() => {
          this.#toastService.success(
            'Mensaje enviado correctamente. Te contactaremos pronto.'
          );
          this.form.reset();
        })
      )
      .subscribe();

    this.formService.isLoading$
      .pipe(
        takeUntilDestroyed(),
        filter(Boolean),
        tap(() => this.#toastService.info('Enviando mensaje...'))
      )
      .subscribe();

    this.formService.hasError$
      .pipe(
        takeUntilDestroyed(),
        filter(Boolean),
        tap(() =>
          this.#toastService.error(
            'Hubo un error al enviar el mensaje. Intenta nuevamente.'
          )
        )
      )
      .subscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      const v = this.form.value;
      const formData = new FormData();
      formData.append('your-name', v.name ?? '');
      formData.append('your-email', v.email ?? '');
      formData.append('your-telefono', v.phone ?? '');
      formData.append('your-asunto', v.subject ?? '');
      formData.append('your-message', v.message ?? '');
      formData.append('_wpcf7_unit_tag', `wpcf7-f${environment.cf7FormId}-p${environment.cf7FormId}`);

      this.formService
        .submitForm(formData)
        .pipe(tap(() => this.form.reset()))
        .subscribe();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
