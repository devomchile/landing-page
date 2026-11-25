import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiPathEnum } from '../../../../environments/enums';

/** Respuesta del endpoint de feedback de Contact Form 7. */
export interface Cf7Response {
  status: 'mail_sent' | 'mail_failed' | 'validation_failed' | 'spam' | 'acceptance_missing' | string;
  message: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/**
 * Envía el formulario a Contact Form 7 en WordPress.
 * El endpoint es público: no necesita token ni credenciales.
 */
@Injectable({ providedIn: 'root' })
export class ContactFormService {
  readonly #http = inject(HttpClient);

  send(msg: ContactMessage): Observable<Cf7Response> {
    const id = environment.cf7FormId;
    const data = new FormData();
    data.append('your-name', msg.name);
    data.append('your-email', msg.email);
    data.append('your-telefono', msg.phone);
    data.append('your-asunto', msg.subject);
    data.append('your-message', msg.message);
    data.append('_wpcf7_unit_tag', `wpcf7-f${id}-p${id}`);
    return this.#http.post<Cf7Response>(`${ApiPathEnum.CONTACTS}/${id}/feedback`, data);
  }
}
