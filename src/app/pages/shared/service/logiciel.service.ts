import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/response/user.response.model';
import { Observable } from 'rxjs';
import { Response } from '../models/response/response.model';
import { Logiciel } from '../models/logiciel.model';
import { O } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root',
})
export class LogicielService {
  constructor(private httpClient: HttpClient) { }

  getLogiciels(): Observable<Response<Logiciel[]>> {
    return this.httpClient.get<Response<Logiciel[]>>(environment.baseUrl + '/logiciels');
  }

  getLogicielDownload(logiciel_id: string): Observable<any> {
    /*console.log(this.httpClient.get<Response<string>>(environment.baseUrl + ('/logiciels/download/' + logiciel_id)));
    console.log(this.httpClient.get<string>(environment.baseUrl + ('/logiciels/download/' + logiciel_id)));
    console.log(this.httpClient.get<string>(environment.baseUrl + ('/logiciels/download/' + logiciel_id)).subscribe(data => data));*/
    return (this.httpClient.get<any>(environment.baseUrl + ('/logiciels/download/' + logiciel_id)));
  }
}
