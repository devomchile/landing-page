import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Subject,
  catchError,
  switchMap,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../../../../environments/environment';
import { ApiPathEnum } from '../../../../../../environments/enums';

@Injectable({ providedIn: 'root' })
export class FormService {
  readonly #httpClient = inject(HttpClient);

  readonly #isLoading$ = new BehaviorSubject<boolean>(false);
  readonly #hasError$ = new Subject<boolean>();
  readonly #success$ = new Subject<void>();

  readonly #sendContactForm$ = new Subject<{
    formData: FormData;
    formId: string;
  }>();

  readonly isLoading$ = this.#isLoading$.asObservable();
  readonly hasError$ = this.#hasError$.asObservable();
  readonly success$ = this.#success$.asObservable();

  constructor() {
    this.#sendContactForm$
      .pipe(
        takeUntilDestroyed(),
        tap(() => this.#isLoading$.next(true)),
        tap(() => this.#hasError$.next(false)),
        switchMap(({ formId, formData }) =>
          this.#httpClient
            .post(
              `${ApiPathEnum.CONTACTS}/${formId}/feedback`,
              formData,
              {
                headers: new HttpHeaders({
                  Authorization: `Bearer ${environment.tokenWPApi}`,
                }),
              }
            )
            .pipe(
              catchError(() => {
                this.#isLoading$.next(false);
                this.#hasError$.next(true);
                return EMPTY;
              }),
              tap(() => this.#success$.next())
            )
        ),
        tap(() => this.#isLoading$!.next(false))
      )
      .subscribe();
  }

  submitForm(formData: FormData) {
    this.#sendContactForm$.next({ formData, formId: environment.cf7FormId });
    return this.success$;
  }
}
