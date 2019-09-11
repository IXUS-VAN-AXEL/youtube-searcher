import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// imports
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbSearchModule,
  NbSidebarModule,
  NbThemeModule,
} from '@nebular/theme';

// modules
import { SharedModule } from './modules/shared/shared.module';

// services
import { TokenInterceptor } from './services';

// components
import {
  AppComponent,
  VideoListComponent,
  VideoSearchbarComponent,
  VideoCardComponent,
  FavoritesListComponent,
} from './components';

@NgModule({
  declarations: [AppComponent, VideoListComponent, VideoSearchbarComponent, VideoCardComponent, FavoritesListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbSearchModule,
    NbCardModule,
    NbListModule,
    NbBadgeModule,
    NbIconModule,
    NbInputModule,
    NbEvaIconsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
