import { Component } from '@angular/core';
import { CardsBannerDto } from './dtos';
import { IconComponent } from '../../../../../shared';

@Component({
  selector: 'app-hero-dashboard',
  templateUrl: './hero-dashboard.component.html',
  imports: [IconComponent],
})
export class HeroDashboardComponent {
  cardsBanner: CardsBannerDto[] = [
    {
      name: 'Proyecto',
      count: 13,
      icon: 'add_task',
      porcent: 12,
    },
    {
      name: 'Clientes',
      count: 12,
      icon: 'person_check',
      porcent: 8,
    },
    {
      name: 'Ingresos',
      count: 1213,
      icon: 'attach_money',
      porcent: 24,
    },
  ];
}
