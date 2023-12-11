import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable()
export class UserService {
  configUrl = 'assets/mockdata/user/user.json';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<User>( this.configUrl ).pipe(
      retry(3), 
      catchError(this.handleError) 
    );
  }

  getUserResponse(): Observable<HttpResponse<User>> {
    return this.http.get<User>( this.configUrl, { observe: 'response' } ).pipe(
      retry(3), 
      catchError(this.handleError) 
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.configUrl, user, this.httpOptions)
      .pipe(
        retry(3), 
        catchError( this.handleError )
      );
  }

  deleteUser(id: number): Observable<unknown> {
    const url = `${this.configUrl}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        retry(3), 
        catchError( this.handleError )
      );
  }

  updateUser(user: User): Observable<User> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.put<User>(this.configUrl, user, this.httpOptions)
      .pipe(
        retry(3), 
        catchError( this.handleError )
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}