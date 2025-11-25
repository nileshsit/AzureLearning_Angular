import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, interval } from 'rxjs';
import { ApiUrlHelper } from '../../../shared/helpers/api-url-helper';
import { CommonService } from '../../../shared/service/common.service';
import { StorageService, StorageKey } from '../../../shared/service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-dilog',
  standalone: false,
  templateUrl: './verification-dilog.html',
  styleUrl: './verification-dilog.scss',
})
export class VerificationDilog {
  verificationForm: FormGroup;
  otp: string = '';
  submitted = false;
  uniqueId: string;
  emailId: string;
  userId: number;
  password: string;
  counter = 301;
  isResendDisabled = true;
  private subscription: Subscription = new Subscription();
  minutes = '05';
  seconds = '00';
  userDetails: any;
  
  @Output() closeDialog = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api: ApiUrlHelper,
    private commonService: CommonService,
    private storageService: StorageService,
    private readonly dialogRef: MatDialogRef<VerificationDilog>,
    private readonly router: Router
  ) {
    this.uniqueId = data.uniqueId;
    this.userId = data.userId;
    this.emailId = data.emailId;
    this.password = data.password;
  }

  ngOnInit(): void {
    this.verificationForm = this.fb.group({
      verificationCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.resetTimer();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get f() { return this.verificationForm.controls; }

  onOtpChange(event: any): void {
    this.otp = event.target.value;
  }

  verifyCode() {
    this.submitted = true;
    if (this.otp === '') {
      this.submitted = false;
      alert('Authentication code is required.');
      return;
    }

    const obj = {
      OTP: this.otp,
      UserId: this.userId,
      UniqueId: this.uniqueId
    };

    const apiUrl = this.api.apiUrl.account.verify_otp;
    this.commonService.doPost(apiUrl, obj).subscribe({
      next: (response) => {
        if (response.success) {
          const jwtToken = response.data?.AccessToken;
          const loginTokenId = response.data?.LoginTokenId;
          this.userDetails = this.commonService.decodeJwt(jwtToken);
          const tokenData = JSON.parse(this.userDetails.unique_name);

          // this.cookieService.set(StorageKey.refreshToken,response.data?.RefreshToken)

          this.storageService.setValue(StorageKey.loginTokenId, this.commonService.Encrypt(loginTokenId));
          this.dialogRef.close(true);
          const currentDate = new Date().toISOString();
          if (tokenData.IsFirstTimeLoggedIn) {
            this.router.navigate([`/reset-password/${this.commonService.Encrypt(tokenData.UserId)}/${this.commonService.Encrypt(currentDate)}`]);
            // this.toastr.success('Authentication code verified successfully.');
            this.storageService.setValue(StorageKey.isFirstLogin, this.commonService.Encrypt(tokenData.IsFirstTimeLoggedIn));
            this.storageService.setValue(StorageKey.token, jwtToken);
          }
          else {
            this.storageService.setValue(StorageKey.accessToken, jwtToken);
            // this.toastr.success('Login successfully.');
            this.router.navigate(['dashboard']);
          }
        } else {
          alert(response.message);
          this.otp = '';
          this.submitted = false;
        }
      },
      error: (err) => {
        alert('Error verifying the OTP.');
        this.submitted = false;
      }
    });
  }

  ResendOTP() {
    if (this.isResendDisabled) return;

    this.isResendDisabled = true;
    this.startTimer();  // Restart the countdown timer
    this.loadTimer();

    const apiUrl = this.api.apiUrl.account.login;
    const obj = {
      Email: this.emailId,
      Password: this.password
    };

    this.commonService.doPost(apiUrl, obj).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Verification code sent again.');
        } else {
          alert('Failed to resend verification code.');
        }
      },
      error: (err) => {
        alert('Error resending OTP.');
      }
    });
  }

  loadTimer() {
    const storedEndTime =  this.storageService.getValue(StorageKey.otpEndTime);
    if (storedEndTime) {
      const endTime = new Date(storedEndTime).getTime();
      const currentTime = new Date().getTime();
      const remainingTime = Math.floor((endTime - currentTime) / 1000);
      if (remainingTime > 0) {
        this.counter = remainingTime;
        this.startTimer();
      } else {
        this.handleTimerEnd();
      }
    } else {
      this.resetTimer();
    }
  }

  startTimer() {
    this.subscription.unsubscribe();
    const endTime = new Date().getTime() + this.counter * 1000;
    this.subscription = interval(1000).subscribe(() => {
      const remainingTime = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      if (remainingTime <= 0) {
        this.subscription.unsubscribe();
        this.counter = 0;
        this.minutes = '00';
        this.seconds = '00';
        this.isResendDisabled = false;
      } else {
        this.counter = remainingTime;
        this.minutes = Math.floor(this.counter / 60).toString().padStart(2, '0');
        this.seconds = (this.counter % 60).toString().padStart(2, '0');
      }
    });
  }

  handleTimerEnd() {
    this.subscription.unsubscribe();
    this.verificationForm.disable();
    this.submitted = true;
    this.isResendDisabled = false;
    this.storageService.removeValue(StorageKey.otpEndTime);
  }

  resetTimer() {
    this.counter = 301;
    this.startTimer();
  }

  close() {
     
  }
}
