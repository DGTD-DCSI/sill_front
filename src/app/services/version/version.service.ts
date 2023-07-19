
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Version,GetAllVersionResponse} from 'src/app/models/version';
const resourceUrl = environment.versionResource;

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllVersionResponse> {
    return this.http.get(resourceUrl, { observe: 'response' })
    .pipe(map(response => {
        let versionsResponse: GetAllVersionResponse = {
          versions: response.body as Version[]
        };
        return versionsResponse;
     }));
  }

  create(request: Version): Observable<Version> {
    return this.http.post(resourceUrl, request);
  }

  update(version: Version): Observable<Version> {
    return this.http.put(resourceUrl+'/update', version);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl+'/delete'}/${id}`);
  }
}

