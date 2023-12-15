import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/response/user.response.model';
import { Observable } from 'rxjs';
import { Response } from '../models/response/response.model';
import { Logiciel } from '../models/logiciel.model';
import { Version } from '../models/version.model';

@Injectable({
  providedIn: 'root',
})
export class LogicielService {
  constructor(private httpClient: HttpClient) { }

  create(object: Logiciel): Observable<Response<Logiciel>> {
    return this.httpClient.post<Response<Logiciel>>(
      environment.baseUrl + '/logiciels',
      object
    );
  }

  read(): Observable<Response<Logiciel[]>> {
    return this.httpClient.get<Response<Logiciel[]>>(environment.baseUrl + '/logiciels');
  }
  getLogiciels(): Observable<Response<Logiciel[]>> {
    return this.httpClient.get<Response<Logiciel[]>>(environment.baseUrl + '/logiciels');
  }

  update(object: Logiciel): Observable<Response<Logiciel>> {
    return this.httpClient.put<Response<Logiciel>>(
      environment.baseUrl + '/logiciels/' + object.id,
      object
    );
  }

  delete(object_id: string): Observable<any> {
    return this.httpClient.delete<any>(
      environment.baseUrl + '/logiciels/delete/' + object_id
    );
  }
  /*
    getLogicielDownload(logiciel_id: string): Observable<any> {
      return (this.httpClient.get<any>(environment.baseUrl + ('/logiciels/download/' + logiciel_id)));
    }*/


  /////////////// other logiciel related models

  createVersion(object: Version): Observable<Response<Version>> {
    return this.httpClient.post<Response<Version>>(
      environment.baseUrl + '/logiciels' + object.logicielId + '/versions',
      object
    );
  }

  readVersion(object: Logiciel): Observable<Response<Logiciel[]>> {
    return this.httpClient.get<Response<Logiciel[]>>(environment.baseUrl + '/logiciels/' + object.id + '/versions');
  }
}
