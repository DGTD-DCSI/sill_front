import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Logiciel, GetAllLogicielResponse } from 'src/app/models/logiciel';

const resourceUrl = environment.logicielResource;


@Injectable({
  providedIn: 'root'
})
export class LogicielService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  getAll(event?: LazyLoadEvent): Observable<GetAllLogicielResponse> {
    return this.http.get(resourceUrl, { observe: 'response' })
    .pipe(map(response => {
        let logicielsResponse: GetAllLogicielResponse = {
          logiciels: response.body as Logiciel[]
        };
        return logicielsResponse;
      }));
  }



  create(request: Logiciel): Observable<Logiciel> {
    return this.http.post(resourceUrl, request);
  }



  update(logiciel: Logiciel): Observable<Logiciel> {
    return this.http.put(resourceUrl, logiciel);
  }

  delete(id_log: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl}/${id_log}`);
  }

  rechercherParCategorie(id: number): Observable<Logiciel[]> {
    return this.http.get <Logiciel[]>(`${resourceUrl}/${id}`);
  } 

  rechercherParNom(libelleLog: string):Observable< Logiciel[]> {
    return this.http.get <Logiciel[]>(`${resourceUrl}/${libelleLog}`);
    }

}
