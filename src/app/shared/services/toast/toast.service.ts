import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  Injectable,
  inject,
  signal,
} from '@angular/core';
import { ToastComponent, ToastType } from '../../components/toast/toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly #appRef = inject(ApplicationRef);
  readonly #toasts = signal<ComponentRef<ToastComponent>[]>([]);
  readonly #container = this.#createContainer();

  show(type: ToastType, message: string, delay = 4000) {
    const ref = createComponent(ToastComponent, {
      environmentInjector: this.#appRef.injector,
    });

    ref.setInput('type', type);
    ref.setInput('message', message);

    ref.instance.dismiss.subscribe(() => {
      this.#remove(ref);
    });

    this.#appRef.attachView(ref.hostView);
    this.#container.appendChild(ref.location.nativeElement);

    ref.changeDetectorRef.detectChanges();

    const wrapper = ref.location.nativeElement;
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'translateX(24px)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wrapper.style.transition = 'all 250ms ease';
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateX(0)';
      });
    });

    this.#toasts.update((t) => [...t, ref]);

    setTimeout(() => this.#remove(ref), delay);
  }

  success(message: string, delay?: number) {
    this.show('success', message, delay);
  }

  error(message: string, delay?: number) {
    this.show('error', message, delay);
  }

  info(message: string, delay?: number) {
    this.show('info', message, delay);
  }

  #remove(ref: ComponentRef<ToastComponent>) {
    const wrapper = ref.location.nativeElement;
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'translateX(24px)';

    setTimeout(() => {
      this.#appRef.detachView(ref.hostView);
      ref.destroy();
      wrapper.remove();
    }, 250);

    this.#toasts.update((t) => t.filter((t) => t !== ref));
  }

  #createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'app-toast-container';
    container.style.cssText = `
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      pointer-events: none;
    `;
    document.body.appendChild(container);
    return container;
  }
}
