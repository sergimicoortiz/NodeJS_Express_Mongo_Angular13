import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile.model';

const URL_BASE = 'http://localhost:3001/api/profile'

@Injectable({
    providedIn: 'root'
})
export class ProfilesService {
    constructor(
        private http: HttpClient
    ) { }

    get(username: string): Observable<Profile> {
        return this.http.get<Profile>(`${URL_BASE}/${username}`);
    }//get

    follow(username: string): Observable<any> {
        return this.http.post<any>(`${URL_BASE}/${username}/follow`, {});
    }//follow

    unfollow(username: string): Observable<any> {
        return this.http.delete<any>(`${URL_BASE}/${username}/unfollow`);
    }//unfollow
}
