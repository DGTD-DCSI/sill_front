import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Editeur } from '../models/editeur.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../models/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class EditeurService {

  constructor(private httpClient: HttpClient) { }

  read(): Observable<Response<Editeur[]>> {
    return this.httpClient.get<Response<Editeur[]>>( environment.baseUrl + '/editeurs' );
  }
}
