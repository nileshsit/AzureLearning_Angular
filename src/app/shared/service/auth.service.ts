import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StorageService, StorageKey } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
    private route: Router
  ) { }

  isTokenExpired(): boolean {
    let expireDate = this.storageService.getValue(StorageKey.expireDate);
    return new Date().getTime() > new Date(expireDate).getTime();
  }
  
  isLoggedIn(): boolean {
    let token = this.storageService.getValue(StorageKey.accessToken);
    if (token)
      return true;
    else
      return false;
  }

  getAccessToken(): any {
    let token = this.storageService.getValue(StorageKey.accessToken);
    return token ? token : null;
  }

  setAccessToken(token: string) {
    this.storageService.setValue(StorageKey.accessToken,token);
  }

  refreshToken() {
    return this.http.post(
      environment.baseUrl + 'account/refresh-token',
      {},
      { withCredentials: true } 
    );
  }

  logout() {
    this.storageService.clearStorage();
    this.route.navigate(["/login"]);
    // window.location.href = '/login';
  }

  getUserId(): any {
    let id = JSON.parse(this.storageService.getValue(StorageKey.currentUser)).id;
    return id ? id : null;
  }

  getUserName(): any {
    let name = JSON.parse(this.storageService.getValue(StorageKey.currentUser)).userName;
    return name ? name : null;
  }

  getUserFullName(): any {
    let name = JSON.parse(this.storageService.getValue(StorageKey.currentUser)).userFullName;
    return name ? name : null;
  }
}