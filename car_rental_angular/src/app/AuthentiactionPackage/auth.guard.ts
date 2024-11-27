import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService =  inject(AuthenticationService)
  const router = inject(Router)
  
  const isAuthenticated = !!authService.getToken();

  if(!isAuthenticated) {
    router.navigate(['/login'])
    return false
  }

  return true


};
