import { ApplicationConfig, provideZoneChangeDetection/*importProvidersFrom*/ } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';

//import { AuthenticationService } from './authentication.service';
//import { TokenInterceptor } from './token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

//   importProvidersFrom( 
      provideRouter(routes), 
      provideClientHydration(),
      provideHttpClient(withFetch())
  // ),
    //{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    //AuthenticationService,
  ]
};