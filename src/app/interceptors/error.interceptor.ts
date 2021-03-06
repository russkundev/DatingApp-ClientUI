import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        switch (error.status) {
          case 500:
            const navigationExtras: NavigationExtras = { state: {error: error.error} };
            this.router.navigateByUrl("/server-error", navigationExtras);
            break;
          case 404:
            this.router.navigateByUrl("/not-found");
            break;
          case 401:
            this.toastr.error("Unauthorized", error.status);
            break;
          case 400:
            if(error.error.errors) {
              const modalStateErrors = [];
              for(const key in error.error.errors) {
                if(error.error.errors[key])
                  modalStateErrors.push(error.error.errors[key]);
              }
              throw modalStateErrors.flat();
            } else {
              this.toastr.error(error.statusText, error.status);
            }
            break;
          default:
            this.toastr.error("Something went wrong!");
            console.log(error);
            break;
        }

        return throwError(error);
      })
    );
  }
}
