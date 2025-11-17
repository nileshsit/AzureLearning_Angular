import { HttpInterceptor, HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, throwError, switchMap, filter, take, of, tap } from "rxjs";
import { SpinnerService } from "../service/spinner.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private readonly http: HttpClient, 
    private readonly spinner: SpinnerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = this.authService.getAccessToken();
    const token = ''
    let authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
    return next.handle(authReq).pipe(
      switchMap(event => {
        return of(event);
      }),
      catchError(error => {

          this.spinner.hide();
          this.isRefreshing = false;
          // this.authService.logout();
          return throwError(() => error);
      })
    );
  }

}
