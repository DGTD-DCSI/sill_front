import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/response/user.response.model';
import { Observable } from 'rxjs';
import { Response } from '../models/response/response.model';
import { Editeur } from '../models/editeur.model';

@Injectable({
  providedIn: 'root'
})
export class EditeurService {

  constructor(private httpClient: HttpClient) { }
  getEditeur(id: number): Observable<Response<Editeur[]>> {
    return this.httpClient.get<Response<Editeur[]>>(`${environment.baseUrl + '/editeurs'}/${id}`);
  }

  getAllEditeurs(): Observable<Response<Editeur[]>> {
    return this.httpClient.get<Response<Editeur[]>>(environment.baseUrl + "/editeurs");
  }

  // createOrUpdateEditeur(request: Editeur): Observable<Response<Editeur[]>> {
  //   return this.httpClient.post<Response<Editeur[]>>(environment.baseUrl, request);
  // }

  // createOrUpdateEditeur(): Observable<Response<Editeur[]>> {
  //   return this.httpClient.post<Response<Editeur[]>>(environment.baseUrl + "/editeurs");
  // }


  // createOrUpdateEditeur(editeur: Editeur): Observable<Response<Editeur[]>> {
  //   return this.httpClient.post<Response<Editeur[]>>(environment.baseUrl + "/editeurs", editeur);
  // }

  // createOrUpdateEditeur(editeur: Editeur): Observable<HttpResponse<Editeur[]>> {
  //   return this.httpClient.post<Editeur[]>(environment.baseUrl + "/editeurs", editeur, { observe: 'response' });
  // }
  
  createOrUpdateEditeur(editeur: Editeur): Observable<Response<Editeur>> {
    return this.httpClient.post<Response<Editeur>>(environment.baseUrl + '/editeurs', editeur );
  }

  UpdateEditeur(editeur: Editeur): Observable<Response<Editeur>> {
    return this.httpClient.post<Response<Editeur>>(environment.baseUrl + '/editeurs', editeur );
  }

  deleteEditeur(id: number): Observable<Response<Editeur[]>> {
    return this.httpClient.get<Response<Editeur[]>>(`${environment.baseUrl + '/editeurs/delete'}/${id}`);
  }
  getEditeursActives(): Observable<Response<Editeur[]>> {
    return this.httpClient.get<Response<Editeur[]>>(environment.baseUrl + "/editeurs/active");
  }

  // saveUser(user: User): Observable<User> {
  //   return this.httpClient.post<User>(
  //     environment.baseUrl + '/utilisateurs',
  //     user
  //   );
  // }

}
