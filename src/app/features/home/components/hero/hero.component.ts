import { Component } from '@angular/core';
import { ButtonComponent, FeatureItemComponent } from '../../../../shared';
import { HeroDashboardComponent } from './components';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent, FeatureItemComponent, HeroDashboardComponent],
  templateUrl: './hero.component.html',
})
export class HeroComponent {}
