import { HttpInterceptor, HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, throwError, switchMap, filter, take, of, tap } from "rxjs";
import { SpinnerService } from "../service/spinner.service";
import { AuthService } from "../service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private readonly spinner: SpinnerService,
    private readonly authService: AuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();
    let authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
    return next.handle(authReq).pipe(
      switchMap(event => {
        if (event instanceof HttpResponse) {
          const body = event.body;
          if (body && body?.tokenExpired) {
            // alert('Access token expired.Generating new token....')
            return this.handle401Error(authReq, next);
          }
        }
        return of(event);
      }),
      catchError(error => {
        // if (error.status === 401) {
        //   return this.handle401Error(authReq, next);
        // } else {
          this.spinner.hide();
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => error);
        // }
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((res: any) => {
          if (res.success) {
            this.isRefreshing = false;
            this.authService.setAccessToken(res.data.AccessToken);
            this.refreshTokenSubject.next(res.data.AccessToken);

            // Retry the original request with the new token
            const clonedRequest = request.clone({
              setHeaders: { Authorization: `Bearer ${res.data.AccessToken}` }
            });
            // alert('New access token Generated.')
            return next.handle(clonedRequest);
          }
          else {
            this.spinner.hide();
            this.isRefreshing = false;
            this.authService.logout();
            // window.location.href = '/';
            return of();
          }
        }),
        catchError((err) => {
          this.spinner.hide();
          this.isRefreshing = false;
          this.authService.logout();
          // window.location.href = '/';
          return of();
        })
      );
    } else {
      // Wait until refresh is done and retry
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          const clonedRequest = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
          return next.handle(clonedRequest); // ✅ return retried request
        })
      );
    }
  }
}
