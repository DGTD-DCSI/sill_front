import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logiciel } from '../models/logiciel';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LogicielService {

    constructor(private http: HttpClient) { }

    getLogiciels() {
        return this.http.get<Logiciel[]>(environment.baseUrl + ('/logiciels'));
    }

}