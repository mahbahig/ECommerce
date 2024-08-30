import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router)

  isLoading: boolean = false;
  errMessage: string = '';
  successMessage: boolean = false

  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword: [null],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, {validators: this.confirmPassword});

  registerFormSubmit(): void {
    if (this.registerForm.valid) {
      this.errMessage = '';
      this.isLoading = true;
      this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.successMessage = true;
            setTimeout(() => {
              this._Router.navigate(['/login'])
            }, 2000)
          }
          this.isLoading = false;
          this.registerForm.reset()
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.errMessage = err.error.message;
          this.registerForm.reset()
        }
      })
    }
    else {
      this.registerForm.setErrors({ mismatch: true })
      this.registerForm.markAllAsTouched()
    }
  }

  confirmPassword(g: AbstractControl): null | { mismatch: true } {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null
    }
    else {
      return { mismatch: true }
    }
  }
}