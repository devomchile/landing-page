import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
} from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { prefersReducedMotion } from '../../../core/utils/motion';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}
interface Pulse {
  a: Node;
  b: Node;
  t: number;
}

const COLS = [
  [34, 211, 249],
  [30, 107, 255],
  [123, 47, 247],
  [195, 92, 255],
];

/**
 * Red de nodos animada que llena su contenedor (el host del componente padre).
 * Los nodos se acercan al mouse y por las conexiones viajan pulsos de luz.
 */
@Component({
  selector: 'app-network-background',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas class="net" aria-hidden="true"></canvas>`,
  styles: `:host { display: contents; }`,
})
export class NetworkBackgroundComponent {
  readonly #host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly #theme = inject(ThemeService);
  readonly #reduce = prefersReducedMotion();

  #g!: CanvasRenderingContext2D;
  #canvas!: HTMLCanvasElement;
  #W = 0;
  #H = 0;
  #nodes: Node[] = [];
  #pulses: Pulse[] = [];
  readonly #m = { x: -999, y: -999 };
  #vis = false;
  #run = false;
  #destroyed = false;

  constructor() {
    const destroyRef = inject(DestroyRef);
    effect(() => {
      this.#theme.isLight();
      if (this.#reduce && this.#g) this.#step();
    });

    afterNextRender(() => {
      this.#canvas = this.#host.querySelector('canvas')!;
      this.#g = this.#canvas.getContext('2d')!;
      const sec = this.#canvas.parentElement!;

      const move = (e: PointerEvent) => {
        const r = sec.getBoundingClientRect();
        this.#m.x = e.clientX - r.left;
        this.#m.y = e.clientY - r.top;
      };
      const leave = () => (this.#m.x = this.#m.y = -999);
      sec.addEventListener('pointermove', move);
      sec.addEventListener('pointerleave', leave);

      const io = new IntersectionObserver(([e]) => {
        this.#vis = e.isIntersecting;
        this.#go();
      });
      io.observe(sec);

      let t: ReturnType<typeof setTimeout>;
      const ro = new ResizeObserver(() => {
        clearTimeout(t);
        t = setTimeout(() => {
          this.#size(sec);
          this.#go();
        }, 150);
      });
      ro.observe(sec);

      const onVisibility = () => this.#go();
      document.addEventListener('visibilitychange', onVisibility);

      destroyRef.onDestroy(() => {
        this.#destroyed = true;
        io.disconnect();
        ro.disconnect();
        clearTimeout(t);
        sec.removeEventListener('pointermove', move);
        sec.removeEventListener('pointerleave', leave);
        document.removeEventListener('visibilitychange', onVisibility);
      });

      this.#size(sec);
      this.#go();
    });
  }

  #colAt(x: number): string {
    const t = Math.max(0, Math.min(0.999, x / this.#W)) * 3;
    const i = Math.floor(t);
    const u = t - i;
    const a = COLS[i];
    const b = COLS[i + 1];
    return [0, 1, 2].map((k) => Math.round(a[k] + (b[k] - a[k]) * u)).join(',');
  }

  #size(sec: HTMLElement): void {
    const r = sec.getBoundingClientRect();
    const d = Math.min(devicePixelRatio || 1, 2);
    this.#W = r.width;
    this.#H = r.height;
    this.#canvas.width = this.#W * d;
    this.#canvas.height = this.#H * d;
    this.#g.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.round(Math.min(110, (this.#W * this.#H) / 11000));
    this.#nodes = Array.from({ length: n }, () => ({
      x: Math.random() * this.#W,
      y: Math.random() * this.#H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 1.8,
    }));
  }

  #go(): void {
    if (!this.#run && this.#vis && !this.#destroyed) {
      this.#run = true;
      requestAnimationFrame(this.#step);
    }
  }

  #step = (): void => {
    if (this.#destroyed || !this.#vis || document.hidden) {
      this.#run = false;
      return;
    }
    const g = this.#g;
    const { x: mx0, y: my0 } = this.#m;
    const W = this.#W;
    g.clearRect(0, 0, W, this.#H);
    const light = this.#theme.isLight();
    const D = W < 700 ? 110 : 150;
    const nodes = this.#nodes;

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (!this.#reduce) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > this.#H) a.vy *= -1;
        const mx = mx0 - a.x;
        const my = my0 - a.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 180 && md > 1) {
          a.x += (mx / md) * 0.25;
          a.y += (my / md) * 0.25;
        }
      }
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < D) {
          g.strokeStyle = `rgba(${this.#colAt((a.x + b.x) / 2)},${((1 - d / D) * (light ? 0.35 : 0.45)).toFixed(3)})`;
          g.lineWidth = 1;
          g.beginPath();
          g.moveTo(a.x, a.y);
          g.lineTo(b.x, b.y);
          g.stroke();
          if (!this.#reduce && Math.random() < 0.0009 && this.#pulses.length < 14) {
            this.#pulses.push({ a, b, t: 0 });
          }
        }
      }
      const ca = this.#colAt(a.x);
      g.fillStyle = `rgb(${ca})`;
      g.beginPath();
      g.arc(a.x, a.y, a.r, 0, 6.283);
      g.fill();
      const md2 = Math.hypot(mx0 - a.x, my0 - a.y);
      if (md2 < 180) {
        g.strokeStyle = `rgba(${ca},${((1 - md2 / 180) * 0.6).toFixed(3)})`;
        g.beginPath();
        g.moveTo(a.x, a.y);
        g.lineTo(mx0, my0);
        g.stroke();
      }
    }

    this.#pulses = this.#pulses.filter((p) => {
      p.t += 0.02;
      if (p.t >= 1) return false;
      const x = p.a.x + (p.b.x - p.a.x) * p.t;
      const y = p.a.y + (p.b.y - p.a.y) * p.t;
      const cc = this.#colAt(x);
      const gr = g.createRadialGradient(x, y, 0, x, y, 8);
      gr.addColorStop(0, `rgba(${cc},1)`);
      gr.addColorStop(1, `rgba(${cc},0)`);
      g.fillStyle = gr;
      g.beginPath();
      g.arc(x, y, 8, 0, 6.283);
      g.fill();
      return true;
    });

    if (this.#reduce) {
      this.#run = false;
      return;
    }
    requestAnimationFrame(this.#step);
  };
}
