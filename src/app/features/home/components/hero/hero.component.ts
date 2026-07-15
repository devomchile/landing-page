import { Component } from '@angular/core';
import {
  BadgeComponent,
  ButtonComponent,
  FeatureItemComponent,
  IconComponent,
} from '../../../../shared';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [IconComponent, ButtonComponent, FeatureItemComponent],
  templateUrl: './hero.component.html',
})
export class HeroComponent {}
