import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  getValue(key: string): any {
    return localStorage.getItem(key);
  }

  setValue(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeValue(key: string): void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
export class StorageKey {
  public static readonly userId = 'userId'
  public static readonly emailId = 'emailId'
  public static readonly currentUser = 'currentUser';
  public static readonly fullName = 'fullName';
  public static readonly accessToken = 'accessToken';
  public static readonly refreshToken = 'refreshToken';
  public static readonly expireDate: 'expireDate';
  public static readonly currentUserId = 'currentUserId';
  public static readonly profilePicture = 'profilePicture';
  public static readonly otpEndTimeForChangePassword = 'otpEndTimeForChangePassword';
  public static readonly isFirstLogin = 'isFirstLogin';
  public static readonly token = 'token';
  public static readonly otpEndTime = 'otpEndTime';
  public static readonly loginTokenId = 'loginTokenId';
  public static readonly isPrimaryUser = 'isPrimaryUser';
  public static readonly uniqueId = 'uniqueId';
}