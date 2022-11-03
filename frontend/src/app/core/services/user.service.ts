import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../models';
import { JwtService } from './jwt.service';
import { environment } from 'src/environments/environment.prod';
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
            this.http.get<User>(environment.USER_BASE).subscribe({
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
        return this.http.post<any>(`${environment.USER_BASE}`, data);
    }//register

    login(data: any): Observable<User> {
        return this.http.post<User>(`${environment.USER_BASE + '/login'}`, data)
            .pipe(map(
                user => {
                    this.setAuth(user);
                    return user;
                }
            ));
    }//login

    settings_user(data: any): Observable<any> {
        return this.http.put<any>(`${environment.SETTINGS_BASE}`, data);
    }//settings_user
}//class
