import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/response/user.response.model';
import { Observable } from 'rxjs';
import { GroupeThematiqueResponse } from '../models/response/groupeThematique.response.model';

@Injectable({
  providedIn: 'root',
})
export class GroupeThematiqueService {
  constructor(private httpClient: HttpClient) {}

  getGroupeThematiques(): Observable<GroupeThematiqueResponse> {
    return this.httpClient.get<GroupeThematiqueResponse>( environment.baseUrl + '/groupe-thematiques' );
  }
}
