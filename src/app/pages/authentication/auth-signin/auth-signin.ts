import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../../../shared/service/common.service';
import { SpinnerService } from '../../../shared/service/spinner.service';
import { ApiUrlHelper } from '../../../shared/helpers/api-url-helper';
import { MatDialog } from '@angular/material/dialog';
import { VerificationDilog } from '../verification-dilog/verification-dilog';

@Component({
  selector: 'app-auth-signin',
  standalone: false,
  templateUrl: './auth-signin.html',
  styleUrl: './auth-signin.scss',
})
export class AuthSignin {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private api: ApiUrlHelper,
    private spinner: SpinnerService,
    private router: Router,
    private readonly cookieService: CookieService,
    private dialog: MatDialog 
  ) {
   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });


  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      const loginData = this.loginForm.value;
      const url = this.api.apiUrl.account.login;

      this.commonService.doPost(url, loginData).subscribe({
        next: (response: any) => {
          this.spinner.hide();
          if (response.success) {
            const userId = response.data?.UserId;
            const uniqueId = response.data?.UniqueId;
            const emailId = this.loginForm.value.UserEmail;
            const password = this.loginForm.value.UserPassword;
            if (this.loginForm.value.rememberMe) {
              const expireDays = 7;
              const path = '/';
              this.cookieService.set('rememberMe', 'yes', expireDays, path);
              this.cookieService.set('emailId', this.loginForm.value.UserEmail, expireDays, path);
              this.cookieService.set('password', this.loginForm.value.UserPassword, expireDays, path);
            } else {
              this.cookieService.delete('rememberMe');
              this.cookieService.delete('emailId');
              this.cookieService.delete('password');
              this.loginForm.reset();
            }

            this.openDialog(uniqueId, emailId, userId, password);
          } else {
            alert('Login failed. Please check your credentials.');
          }
        },
        error: () => {
          this.spinner.hide();
          alert('An error occurred. Please try again later.');
        }
      });
    }
  }

  openDialog(uniqueId: string, emailId: string, userId: number, password: string) {
    const dialogRef = this.dialog.open(VerificationDilog, {
      width: '400px', 
      data: { uniqueId, emailId, userId, password } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate["/dashboard"];
      }
    });
  }

}
