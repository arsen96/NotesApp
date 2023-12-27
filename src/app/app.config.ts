import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './usertoken.interceptor';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(),provideHttpClient(),[CookieService],{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  AuthGuard,
  AuthService,
]
};
