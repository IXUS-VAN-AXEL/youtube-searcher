import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// nebular
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
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
import { AppComponent, VideoListComponent, VideoSearchbarComponent, VideoCardComponent } from './components';

@NgModule({
  declarations: [AppComponent, VideoListComponent, VideoSearchbarComponent, VideoCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
