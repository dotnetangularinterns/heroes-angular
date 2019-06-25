import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorHandler } from './HttpErrorHandler';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(public errorHandler: HttpErrorHandler) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {}, (res: any) => {
            if (res instanceof HttpErrorResponse) {
              this.errorHandler.handleError(res);
            } else {
              console.log(res);
            }
          }));
    }
}
