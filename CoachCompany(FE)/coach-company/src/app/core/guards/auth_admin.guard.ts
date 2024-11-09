import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getAuthStatus() && this.authService.getAdminStatus()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
