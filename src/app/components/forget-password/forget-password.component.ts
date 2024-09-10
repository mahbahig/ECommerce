import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  verifyEmail: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  })

  verifyCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.minLength(6)]]
  })

  resetPassword: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
  })

  currentStep: number = 1;
  isLoading: boolean = false;

  validateVerifyEmail(): void {
    if (this.verifyEmail.valid) {
      this.isLoading = true;
      this._AuthService.verifyEmailReset(this.verifyEmail.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.statusMsg == 'success') {
            this.resetPassword.get('email')?.patchValue(this.verifyEmail.get('email')?.value);
            this.currentStep += 1;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
        },
      })
    }
    else {
      this.verifyEmail.markAllAsTouched();
    }
  }

  validateVerifyCode(): void {
    if (this.verifyCode.valid) {
      this.isLoading = true;
      this._AuthService.verifyCodeReset(this.verifyCode.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.status == 'Success') {
            this.currentStep += 1;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
        }
      })
    }
    else {
      this.verifyCode.markAllAsTouched();
    }
  }

  validateResetPassword(): void {
    if (this.resetPassword.valid) {
      this.isLoading = true;
      this._AuthService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.token) {
            localStorage.setItem('userToken', res.token);
            this._Router.navigate(['/home']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
        }
      })
    }
    else {
      this.resetPassword.markAllAsTouched();
    }
  }
}