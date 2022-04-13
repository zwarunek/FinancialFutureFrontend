import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@core/services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // @ts-ignore
    return next.handle(request).pipe(catchError((err: any) => {
      console.log('here')
      if (err.status === 401 && !request.url.endsWith('authenticate')) {
        // auto logout if 401 response returned from api
        this.authenticationService.signOut();
        location.reload();
      }
    }));
  }
}
