import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, catchError, tap, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/commonModel';
import { ErrorMessageConstants,TokenConstants } from '../constants/MessageConstants';
import { StorageService } from './storage.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  IsError:boolean;

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private spinner: SpinnerService
  ) { }

  doGet(apiUrl: string): Observable<ApiResponse> {
    const url = `${environment.baseUrl}${apiUrl}`;
    return this.http.get<ApiResponse>(url).pipe(
      tap(() => this.log(`doGet success`)),
      catchError((error: HttpErrorResponse) => {
        this.checkAuthorize(error);
        return of();
      })
    );
  }

  doPost(apiUrl: string, postData: any): Observable<ApiResponse> {
    const url = `${environment.baseUrl}${apiUrl}`;
    return this.http.post<ApiResponse>(url, postData).pipe(
      tap(() => this.log(`doPost success`)),
      catchError((error: HttpErrorResponse) => {
        this.checkAuthorize(error);
        return of();
      })
    );
  }

  doPostwithCredentials(apiUrl: string, postData: any): Observable<ApiResponse> {
    const url = `${environment.baseUrl}${apiUrl}`;
    return this.http.post<ApiResponse>(url, postData, { withCredentials: true }).pipe(
      tap(() => this.log(`doPost success`)),
      catchError((error: HttpErrorResponse) => {
        this.checkAuthorize(error);
        return of();
      })
    );
  }

  doPut(apiUrl: string, putData: any): Observable<ApiResponse> {
    const url = `${environment.baseUrl}${apiUrl}`;
    return this.http.put<ApiResponse>(url, putData).pipe(
      tap(() => this.log(`doPut success`)),
      catchError((error: HttpErrorResponse) => {
        this.checkAuthorize(error);
        return of();
      })
    );
  }

  doDelete(apiUrl: string): Observable<ApiResponse> {
    const url = `${environment.baseUrl}${apiUrl}`;
    return this.http.delete<ApiResponse>(url).pipe(
      tap(() => this.log(`doDelete success`)),
      catchError((error: HttpErrorResponse) => {
        this.checkAuthorize(error);
        return of();
      })
    );
  }

  doGetBlob(apiUrl: string): Observable<Blob> {
    const url = `${environment.baseUrl}${apiUrl}`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap(() => this.log(`doGetBlob success`)),
      catchError((error: HttpErrorResponse) => {
        this.checkAuthorize(error);
        return of();
      })
    );
  }

  doDownloadPost(apiUrl: string, postData: any) {
    const url = `${environment.baseUrl}${apiUrl}`;
    return this.http.post(url, postData, { observe: "response", responseType: "blob" });
  }

  // Check Authorize Role
  checkAuthorize(error: any) {
    if (error.status == HttpStatusCode.Unauthorized) {
      if (this.IsError == false) {
        this.IsError = true
        // this.toster.error(TokenConstants.Session_Expired);
      }
      this.spinner.hide();
    }
    else if (error.status == HttpStatusCode.Forbidden) {
      if (this.IsError == false) {
        this.IsError = true
        // this.toster.error(TokenConstants.Session_Expired);
        this.storageService.clearStorage();
      }
      this.spinner.hide();
    }
    else if (error.status === HttpStatusCode.InternalServerError) {
      // this.toster.error(ErrorMessageConstants.Message)
      this.spinner.hide();
    }
    else {
      var errorMessage = (error.error.message != null) ? error.error.message : error.message
    }
  }

  private log(message: string) {
    this.IsError = false;
  }

  Encrypt(input: string): string {
    try {
      return btoa(unescape(encodeURIComponent(input)));
    } catch (e) {
      console.error('Encoding failed', e);
      return '';
    }
  }

  Decrypt(encoded: string): string {
    try {
      return decodeURIComponent(escape(atob(encoded)));
    } catch (e) {
      console.error('Decoding failed', e);
      return '';
    }
  }
}