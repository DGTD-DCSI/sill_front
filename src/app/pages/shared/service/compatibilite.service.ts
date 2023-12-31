import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/response/user.response.model';
import { Observable } from 'rxjs';
import { Response } from '../models/response/response.model';
import { Compatibilite } from '../models/compatibilite.model';

@Injectable({
  providedIn: 'root'
})
export class CompatibiliteService {

  constructor(private httpClient: HttpClient) { }
  getCompatibilite(id: number): Observable<Response<Compatibilite[]>> {
    return this.httpClient.get<Response<Compatibilite[]>>(`${environment.baseUrl + '/compatibiliteOS'}/${id}`);
  }

  getAllCompatibilites(): Observable<Compatibilite[]> {
    return this.httpClient.get<Compatibilite[]>(environment.baseUrl + '/compatibiliteOS');
  }

  
  createOrUpdateCompatibilite(compatibilite: Compatibilite): Observable<Compatibilite> {
    return this.httpClient.post<Compatibilite>(environment.baseUrl + '/compatibiliteOS', compatibilite );
  }

UpdateCompatibilite(compatibilite: Compatibilite): Observable<Compatibilite> {
  return this.httpClient.put<Compatibilite>(
    environment.baseUrl + '/compatibiliteOS/update', 
    compatibilite
  );
}


  deleteCompatibilite(id: string): Observable<Response<Compatibilite[]>> {

    return this.httpClient.delete<Response<Compatibilite[]>>(
      environment.baseUrl + '/compatibiliteOS/delete/' + id    );
  }
//   getCompatibiliteActives(): Observable<Response<Compatibilite[]>> {
//     return this.httpClient.get<Response<Compatibilite[]>>(environment.baseUrl + "/compatibiliteOS/active");
//   }



}


