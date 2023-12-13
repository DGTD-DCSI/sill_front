import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private httpClient:HttpClient) {}

  getCategories(): Observable<Response<Categorie[]>> {
    return this.httpClient.get<Response<Categorie[]>>( environment.baseUrl + '/categories' );
  }
  

  saveCategorie(categorie: Categorie): Observable<Response<Categorie>> {
    return this.httpClient.post<Response<Categorie>>(
      environment.baseUrl + '/categories',
      categorie
    );
  }

  updateCategorie(categorie: Categorie): Observable<Response<Categorie>> {
    return this.httpClient.put<Response<Categorie>>(
      environment.baseUrl + '/categories/' + categorie.id,
      categorie
    );
  }
  


  deleteCategorie(categorie_id: string): Observable<any> {
    return this.httpClient.delete<any>(
      environment.baseUrl + '/categories/delete/' + categorie_id
    );
  }


}
