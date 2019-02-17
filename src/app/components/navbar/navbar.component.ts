import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Roles } from '../auth/roles.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  roles = null;
  adminIsAuthenticated = false;
  clerkIsAuthenticated = false;
  authenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authenticated = this.authService.getIsAuth();
    this.roles = this.authService.getRole();
    if (this.roles === Roles.Admin) {
      this.adminIsAuthenticated = this.authenticated;
      this.clerkIsAuthenticated = false;
    } else if (this.roles === Roles.Clerk) {
      this.clerkIsAuthenticated = this.authenticated;
      this.adminIsAuthenticated = false;
    }

    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.authenticated = isAuthenticated;
        this.roles = this.authService.getRole();
        if (this.roles === Roles.Admin) {
          this.adminIsAuthenticated = this.authenticated;
          this.clerkIsAuthenticated = false;
        } else if (this.roles === Roles.Clerk) {
          this.clerkIsAuthenticated = this.authenticated;
          this.adminIsAuthenticated = false;
        }
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
