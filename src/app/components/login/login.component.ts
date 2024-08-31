import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  errMessage: string = '';
  successMessage: boolean = false;
  isLoading: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  })

  loginFormSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => { 
          if (res.message == 'success') { 
            this.errMessage = '';
            this.successMessage = true;
            localStorage.setItem('userToken', res.token);
            this._AuthService.saveUserData();
            setTimeout(() => {
              this._Router.navigate(['/home']);
            }, 2000)
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.errMessage = err.error.message;
          this.isLoading = false;
        }
      })
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}