import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenStorageService } from './pages/shared/service/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private tokenStorageService: TokenStorageService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const token = this.tokenStorageService.getToken();
    if( token != null ) {
      authReq = this.addTokenHeader(authReq, token);
    }
    
    return next.handle( authReq ).pipe(catchError( error => {
      if( error instanceof HttpErrorResponse && authReq.url.includes('auth/login') && (error.status === 401 || error.status === 403 ) ){
        this.tokenStorageService.clearStorage();
      }
      return throwError(error)
    } ) );
    return next.handle(authReq);
  }

  addTokenHeader(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({ headers: request.headers.set( 'Authorization', 'Bearer ' + token )})
  }
}
