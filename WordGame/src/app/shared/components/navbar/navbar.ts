import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  public constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

