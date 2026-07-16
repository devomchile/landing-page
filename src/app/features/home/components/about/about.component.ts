import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  stats = [
    { value: '15+', label: 'Proyectos' },
    { value: '98%', label: 'Satisfaccion' },
    { value: '4+', label: 'Años' },
  ];

  glowOn(e: Event) {
    (e.currentTarget as HTMLElement).style.boxShadow =
      '0 0 40px rgba(30, 136, 255, 0.2)';
  }

  glowOff(e: Event) {
    (e.currentTarget as HTMLElement).style.boxShadow =
      '0 0 0 rgba(30, 136, 255, 0)';
  }
}
