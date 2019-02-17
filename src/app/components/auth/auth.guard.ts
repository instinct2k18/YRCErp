import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      const isAuth = this.authService.getIsAuth();
      const roles = this.authService.getRole();
      if (!isAuth) {
        if (route.data.roles && route.data.roles.indexOf(roles) === -1) {
          this.router.navigate(['/admin']);
          return false;
      }
        this.router.navigate(['/login']);
      }
      return isAuth;
  }
}
