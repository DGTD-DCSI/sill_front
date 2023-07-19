import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Editeur, GetAllEditeurResponse } from 'src/app/models/editeur';
const resourceUrl = environment.editeurResource;


@Injectable({
  providedIn: 'root'
})
export class EditeurService {

  constructor(private http: HttpClient) { }

  getAll(event?: LazyLoadEvent): Observable<GetAllEditeurResponse> {
    return this.http.get(resourceUrl, { observe: 'response' })
    .pipe(map(response => {
        let editeursResponse: GetAllEditeurResponse = {
          editeurs: response.body as Editeur[]
        };
        return editeursResponse;
     }));
  }

  create(request: Editeur): Observable<Editeur> {
    return this.http.post(resourceUrl, request);
  }

  update(editeur: Editeur): Observable<Editeur> {
    return this.http.put(resourceUrl+'/update', editeur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl+'/delete'}/${id}`);
  }
}
