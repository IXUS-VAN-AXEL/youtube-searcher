import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <app-video-searchbar></app-video-searchbar>
      </nb-layout-header>
      <nb-sidebar>Sidebar</nb-sidebar>

      <nb-layout-column>
        <app-video-list></app-video-list>

        <router-outlet></router-outlet>
      </nb-layout-column>

      <nb-layout-footer fixed> </nb-layout-footer>
    </nb-layout>
  `,
  styles: [],
})
export class AppComponent {}
