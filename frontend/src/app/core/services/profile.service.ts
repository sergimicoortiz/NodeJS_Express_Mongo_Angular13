import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile.model';
import { environment } from 'src/environments/environment.prod';
@Injectable({
    providedIn: 'root'
})
export class ProfilesService {
    constructor(
        private http: HttpClient
    ) { }

    get(username: string): Observable<Profile> {
        return this.http.get<Profile>(`${environment.PROFILE_BASE}/${username}`);
    }//get

    follow(username: string): Observable<any> {
        return this.http.post<any>(`${environment.PROFILE_BASE}/${username}/follow`, {});
    }//follow

    unfollow(username: string): Observable<any> {
        return this.http.delete<any>(`${environment.PROFILE_BASE}/${username}/unfollow`);
    }//unfollow
}
