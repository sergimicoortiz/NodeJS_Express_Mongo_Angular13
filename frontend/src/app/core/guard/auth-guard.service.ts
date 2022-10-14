import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {

        this.userService.isAuthenticated.pipe(take(1)).subscribe({
            next: data => {
                if (data == false) {
                    this.router.navigate(['/home']);
                }
            },
            error: e => console.error(e),
        })

        return this.userService.isAuthenticated.pipe(take(1));

    }
}
