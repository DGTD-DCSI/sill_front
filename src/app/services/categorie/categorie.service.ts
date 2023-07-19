import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorie, GetAllCategorieResponse } from 'src/app/models/categorie';

import { Compatibilite_os, GetAllCompatibiliteOSResponse } from 'src/app/models/compatibiliteOS';

const resourceUrl = environment.categorieResource;

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }

  getAll(event?: LazyLoadEvent): Observable<GetAllCategorieResponse> {
    return this.http.get(resourceUrl+'/niveau1', { observe: 'response' })
    .pipe(map(response => {
        let categoriesResponse: GetAllCategorieResponse = {
          categories: response.body as Categorie[]
        };
        return categoriesResponse;
      }));
  }



  create(request: Categorie): Observable<Categorie> {
    return this.http.post(resourceUrl, request);
  }



  update(categorie: Categorie): Observable<Categorie> {
    return this.http.put(resourceUrl+'/update', categorie);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl+'/delete'}/${id}`);
  }
}
