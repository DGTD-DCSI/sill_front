import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/response/user.response.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>( environment.baseUrl + '/utilisateurs' );
  }

  saveUser(user: User): Observable<User> {
    return this.httpClient.post<User>(
      environment.baseUrl + '/utilisateurs',
      user
    );
  }

  deleteUser(user_id: string): Observable<any> {
    return this.httpClient.delete<any>(
      environment.baseUrl + '/utilisateurs/delete/' + user_id
    );
  }
}
