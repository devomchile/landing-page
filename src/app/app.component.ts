import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './features/layout/navbar/navbar.component';
import { FooterComponent } from './features/layout/footer/footer.component';
import { FloatingWhatsappComponent } from './shared/components/floating-whatsapp/floating-whatsapp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, FloatingWhatsappComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
