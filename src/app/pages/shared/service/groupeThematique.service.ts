import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/response/user.response.model';
import { Observable } from 'rxjs';
import { GroupeThematiqueResponse } from '../models/response/groupeThematique.response.model';
import { GroupeThematique } from '../models/groupeThematique.model';

@Injectable({
  providedIn: 'root',
})
export class GroupeThematiqueService {
  constructor(private httpClient: HttpClient) {}

  getGroupeThematiques(): Observable<GroupeThematique[]> {
    return this.httpClient.get<GroupeThematique[]>( environment.baseUrl + '/groupe-thematiques' );
  }

  saveGroupeThematique(groupeThematique: GroupeThematique): Observable<GroupeThematique> {
    return this.httpClient.post<GroupeThematique>(
      environment.baseUrl + '/groupe-thematiques',
      groupeThematique
    );
  }

  deleteGroupeThematique(groupeThematique_id: string): Observable<any> {
    return this.httpClient.delete<any>(
      environment.baseUrl + '/groupe-thematiques/delete/' + groupeThematique_id
    );
  }
}
