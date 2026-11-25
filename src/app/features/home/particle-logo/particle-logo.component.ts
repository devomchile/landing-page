import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { prefersReducedMotion } from '../../../core/utils/motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  c: string;
  r: number;
  ph: number;
  delay: number;
}

const STOPS: [number, number[]][] = [
  [0, [34, 211, 249]],
  [0.42, [30, 107, 255]],
  [0.78, [123, 47, 247]],
  [1, [195, 92, 255]],
];

function gradientAt(t: number): string {
  for (let k = 1; k < STOPS.length; k++) {
    if (t <= STOPS[k][0]) {
      const [a, ca] = STOPS[k - 1];
      const [b, cb] = STOPS[k];
      const u = (t - a) / (b - a);
      return `rgb(${ca.map((v, j) => Math.round(v + (cb[j] - v) * u)).join(',')})`;
    }
  }
  return 'rgb(195,92,255)';
}

/**
 * Logo "<D" formado por partículas.
 * Las partículas se reúnen en el trazo del símbolo, se apartan del mouse y explotan al hacer clic o tocar.
 */
@Component({
  selector: 'app-particle-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stage" #stage>
      <canvas #canvas aria-label="Partículas que forman el logo de Devom" role="img"></canvas>
      <span class="hint">Pasa el mouse o toca para dispersar</span>
    </div>
  `,
  styles: `:host { display: block; min-width: 0; }`,
})
export class ParticleLogoComponent {
  private readonly stage = viewChild.required<ElementRef<HTMLDivElement>>('stage');
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  readonly #theme = inject(ThemeService);
  readonly #destroyRef = inject(DestroyRef);

  #ctx!: CanvasRenderingContext2D;
  #parts: Particle[] = [];
  #w = 0;
  #h = 0;
  #start = 0;
  #running = false;
  #visible = true;
  #destroyed = false;
  readonly #mouse = { x: -9999, y: -9999, on: false };
  readonly #reduce = prefersReducedMotion();

  constructor() {
    afterNextRender(() => this.#init());
    // Con movimiento reducido no hay animación continua: se repinta al cambiar el tema.
    effect(() => {
      this.#theme.isLight();
      if (this.#reduce && this.#ctx) this.#draw();
    });
  }

  #init(): void {
    const stage = this.stage().nativeElement;
    this.#ctx = this.canvas().nativeElement.getContext('2d')!;

    const pos = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      this.#mouse.x = e.clientX - r.left;
      this.#mouse.y = e.clientY - r.top;
    };
    stage.addEventListener('pointermove', (e) => {
      pos(e);
      this.#mouse.on = true;
    });
    stage.addEventListener('pointerleave', () => (this.#mouse.on = false));
    stage.addEventListener('pointerdown', (e) => {
      pos(e);
      this.#scatter(true);
    });
    stage.addEventListener('pointerup', () => (this.#mouse.on = false));

    let wasOut = false;
    const io = new IntersectionObserver(
      ([e]) => {
        this.#visible = e.isIntersecting;
        if (this.#visible) {
          if (wasOut && !this.#reduce) this.#scatter(false);
          this.#kick();
        } else wasOut = true;
      },
      { threshold: 0.05 },
    );
    io.observe(stage);

    let rt: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(rt);
      rt = setTimeout(() => this.#build(), 120);
    });
    ro.observe(stage);

    const onVisibility = () => this.#kick();
    document.addEventListener('visibilitychange', onVisibility);

    this.#destroyRef.onDestroy(() => {
      this.#destroyed = true;
      io.disconnect();
      ro.disconnect();
      clearTimeout(rt);
      document.removeEventListener('visibilitychange', onVisibility);
    });

    this.#build();
    if (!this.#reduce) this.#scatter(false);
  }

  /** Muestrea el trazo del logo en un canvas oculto y asigna un destino a cada partícula. */
  #build(): void {
    const stage = this.stage().nativeElement;
    const canvas = this.canvas().nativeElement;
    const r = stage.getBoundingClientRect();
    if (!r.width) return;

    const dpr = Math.min(devicePixelRatio || 1, 2);
    const W = (this.#w = r.width);
    const H = (this.#h = r.height);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    this.#ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const off = document.createElement('canvas');
    off.width = Math.round(W);
    off.height = Math.round(H);
    const o = off.getContext('2d')!;
    const s = Math.min(W / 900, H / 640) * 0.86;
    const ox = (W - 900 * s) / 2 - 180 * s;
    const oy = (H - 640 * s) / 2 - 300 * s - H * 0.03;
    o.setTransform(s, 0, 0, s, ox, oy);
    o.lineWidth = 112;
    o.lineCap = 'round';
    o.lineJoin = 'round';
    o.strokeStyle = '#fff';
    o.stroke(new Path2D('M468,392 L288,598 L432,800'));
    o.stroke(new Path2D('M684,600 L536,846 H740 A228,228 0 0 0 740,390 H624'));

    const d = o.getImageData(0, 0, off.width, off.height).data;
    const step = Math.max(5, Math.round(W / 90));
    const targets: [number, number][] = [];
    for (let y = 0; y < off.height; y += step) {
      for (let x = 0; x < off.width; x += step) {
        if (d[(y * off.width + x) * 4 + 3] > 128) targets.push([x, y]);
      }
    }

    const x0 = ox + 220 * s;
    const x1 = ox + 1030 * s;
    const old = this.#parts;
    this.#parts = targets.map(([tx, ty], k) => {
      const p: Particle = old[k] ?? {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: 0,
        vy: 0,
        tx: 0,
        ty: 0,
        c: '',
        r: 0,
        ph: 0,
        delay: 0,
      };
      p.tx = tx + (Math.random() - 0.5) * step * 0.4;
      p.ty = ty + (Math.random() - 0.5) * step * 0.4;
      const u = Math.min(1, Math.max(0, (tx - x0) / (x1 - x0)));
      p.c = gradientAt(u);
      p.r = step * 0.3 + Math.random() * step * 0.2;
      p.ph = Math.random() * 6.283;
      p.delay = u * 900 + Math.random() * 350;
      return p;
    });

    if (this.#reduce) {
      for (const p of this.#parts) {
        p.x = p.tx;
        p.y = p.ty;
      }
      this.#draw();
    } else this.#kick();
  }

  #scatter(fromCenter: boolean): void {
    this.#start = performance.now();
    for (const p of this.#parts) {
      if (fromCenter) {
        const a = Math.random() * 6.283;
        const s = 4 + Math.random() * 14;
        p.vx = Math.cos(a) * s;
        p.vy = Math.sin(a) * s;
      } else {
        p.x = Math.random() * this.#w;
        p.y = Math.random() * this.#h;
        p.vx = (Math.random() - 0.5) * 2;
        p.vy = (Math.random() - 0.5) * 2;
      }
    }
    this.#kick();
  }

  #draw(): void {
    const ctx = this.#ctx;
    ctx.clearRect(0, 0, this.#w, this.#h);
    ctx.globalCompositeOperation = this.#theme.isLight() ? 'source-over' : 'lighter';
    for (const p of this.#parts) {
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  #frame = (now: number): void => {
    if (this.#destroyed || !this.#visible || document.hidden) {
      this.#running = false;
      return;
    }
    const t = now - this.#start;
    const m = this.#mouse;
    const R = this.#w * 0.14;
    for (const p of this.#parts) {
      const tx = p.tx + Math.sin(now / 900 + p.ph) * 1.2;
      const ty = p.ty + Math.cos(now / 1100 + p.ph) * 1.2;
      if (t > p.delay) {
        p.vx += (tx - p.x) * 0.045;
        p.vy += (ty - p.y) * 0.045;
      }
      if (m.on) {
        const dx = p.x - m.x;
        const dy = p.y - m.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / R) * 6;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
      p.vx *= 0.84;
      p.vy *= 0.84;
      p.x += p.vx;
      p.y += p.vy;
    }
    this.#draw();
    requestAnimationFrame(this.#frame);
  };

  #kick(): void {
    if (!this.#running && !this.#reduce && !this.#destroyed) {
      this.#running = true;
      requestAnimationFrame(this.#frame);
    }
  }
}
