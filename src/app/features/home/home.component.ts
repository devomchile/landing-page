import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProcessComponent } from './process/process.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, AboutComponent, ServicesComponent, ProjectsComponent, ProcessComponent, ContactComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <app-hero />
      <app-about />
      <app-services />
      <app-projects />
      <app-process />
      <app-contact />
    </main>
  `,
})
export class HomeComponent {}
