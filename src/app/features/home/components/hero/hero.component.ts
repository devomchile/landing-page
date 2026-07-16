import { Component } from '@angular/core';
import { ButtonComponent, FeatureItemComponent, WhatsappButtonComponent } from '../../../../shared';
import { HeroDashboardComponent } from './components';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent, FeatureItemComponent, HeroDashboardComponent, WhatsappButtonComponent],
  templateUrl: './hero.component.html',
})
export class HeroComponent {}
