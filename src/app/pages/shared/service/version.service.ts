import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Version } from '../models/version.model';
import { Response } from '../models/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private httpClient: HttpClient) { }

  read(): Observable<Response<Version[]>> {
    return this.httpClient.get<Response<Version[]>>( environment.baseUrl + '/versions' );
  }

  create(object: Version): Observable<Version> {
    return this.httpClient.post<Version>(
      environment.baseUrl + '/versions',
      object
    );
  }

  update(object: Version): Observable<Version> {
    return this.httpClient.put<Version>(
      environment.baseUrl + '/versions',
      object
    );
  }

  delete(object_id: string): Observable<any> {
    return this.httpClient.delete<any>(
      environment.baseUrl + '/versions/delete/' + object_id
    );
  }
}
