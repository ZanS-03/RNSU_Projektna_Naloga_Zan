import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  public email: string;
  public password: string;

  public errorMessage: string;

  public constructor(

    private authService: AuthService,
    private router: Router

  ) {

    this.email = '';
    this.password = '';
    this.errorMessage = '';

  }

  public onSubmit(loginForm: NgForm): void {

    this.errorMessage = '';

    if (!loginForm.valid) {

      this.errorMessage = 'Polja niso pravilno izpolnjena.';
      return;

    }

    const result = this.authService.login(this.email, this.password);

    if (result.ok) {

      this.router.navigate(['/game']);

    } else {

      this.errorMessage = result.message;

    }

  }
}

