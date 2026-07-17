import { environment } from '../environment';

export const ApiPathEnum = {
  CONTACTS: `${environment.wordPressUrl}/wp-json/contact-form-7/v1/contact-forms`,
} as const;

export type ApiPathEnum = (typeof ApiPathEnum)[keyof typeof ApiPathEnum];
