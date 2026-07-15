import { Component, signal, inject, HostListener } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { NavItemComponent } from '../../../shared/components/nav-item/nav-item.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavItemComponent, ButtonComponent, IconComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  menuOpen = signal(false);
  isScrolled = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }
}
