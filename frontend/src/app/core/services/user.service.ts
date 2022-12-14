import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../models';
import { JwtService } from './jwt.service';

const URL_BASE = 'http://localhost:3001/api/user'
const URL_Settings = 'http://localhost:3001/api/settings'

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private jwtService: JwtService,
        private http: HttpClient
    ) { }

    populate(): void {
        if (this.jwtService.getToken()) {
            this.http.get<User>(URL_BASE).subscribe({
                next: data => this.setAuth(data),
                error: e => { console.error(e); this.purgeAuth() }
            });
        } else {
            this.purgeAuth();
        }
    }

    setAuth(user: User) {
        this.jwtService.saveToken(user.token);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }//setAuth

    purgeAuth() {
        this.jwtService.destroyToken();
        this.currentUserSubject.next({} as User);
        this.isAuthenticatedSubject.next(false);
    }//purgeAuth

    register(data: any): Observable<any> {
        return this.http.post<any>(`${URL_BASE}`, data);
    }//register

    login(data: any): Observable<User> {
        return this.http.post<User>(`${URL_BASE + '/login'}`, data)
            .pipe(map(
                user => {
                    this.setAuth(user);
                    return user;
                }
            ));
    }//login

    settings_user(data: any): Observable<any> {
        return this.http.put<any>(`${URL_Settings}`, data);
    }//settings_user
}//class
