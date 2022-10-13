import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from '../core/models/profile.model';
import { ProfilesService } from '../core/services/profile.service';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<Profile> {
  constructor(
    private profilesService: ProfilesService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Profile> {
    /* this.profilesService.get(route.params['username']).subscribe(console.log);
    const username = typeof route.params['username'];
    console.log(username == null); */
    return this.profilesService.get(route.params['username']);

  }
}
