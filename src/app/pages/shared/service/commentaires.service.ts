import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/response/user.response.model';
import { Observable } from 'rxjs';
import { Response } from '../models/response/response.model';
import { Commentaire } from '../models/commentaire.model';
import { Logiciel } from '../models/logiciel.model';
import { Version } from '../models/version.model';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  constructor(private httpClient: HttpClient) { }

  create(object: Commentaire, logiciel: Logiciel): Observable<Response<Commentaire>> {
    return this.httpClient.post<Response<Commentaire>>(
      environment.baseUrl +'/logiciels/' + logiciel.id +'/commentaires',
      object
    );
  }

  read(): Observable<Response<Commentaire[]>> {
    return this.httpClient.get<Response<Commentaire[]>>( environment.baseUrl + '/commentaires' );
  }
  getCommentaires(logiciel: Logiciel): Observable<Response<Commentaire[]>> {
    return this.httpClient.get<Response<Commentaire[]>>(environment.baseUrl +'/logiciels/' + logiciel.id  + '/commentaires');
  }

  update(object: Commentaire): Observable<Response<Commentaire>> {
    return this.httpClient.put<Response<Commentaire>>(
      environment.baseUrl + '/commentaires/' + object.id,
      object
    );
  }

  delete(object_id: string): Observable<any> {
    return this.httpClient.delete<any>(
      environment.baseUrl + '/commentaires/delete/' + object_id
    );
  }

}
