import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/login.request.model';
import { LoginResponse } from '../models/response/login.response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor( private httpClient: HttpClient ) {}
 
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      environment.baseUrl + '/auth/login',
      loginRequest
    );
  }
}
