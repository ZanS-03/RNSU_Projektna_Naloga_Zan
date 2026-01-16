import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  public email: string;
  public password: string;
  public errorMessage: string;

  public constructor(private authService: AuthService) {

    this.email = '';
    this.password = '';
    this.errorMessage = '';

  }

  public onSubmit(signupForm: NgForm): void {

    this.errorMessage = '';

    if (!signupForm.valid) {

      this.errorMessage = 'Polja niso pravilno izpolnjena.';
      return;
      
    }

    const result = this.authService.signup(this.email, this.password);

  }
}
