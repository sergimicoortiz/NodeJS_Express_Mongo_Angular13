import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile-resolve.service';
import { ProfileLikesComponent } from './profile-likes/profile-likes.component';
import { ProfileProductsComponent } from './profile-products/profile-products.component';


const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: [
      { path: '', component: ProfileProductsComponent },
      { path: 'favorites', component: ProfileLikesComponent }
    ]
  },
  {
    path: '',
    redirectTo: '/home'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
