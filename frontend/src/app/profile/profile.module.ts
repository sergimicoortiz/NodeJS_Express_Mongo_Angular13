import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileLikesComponent } from './profile-likes/profile-likes.component';
import { ProfileProductsComponent } from './profile-products/profile-products.component';


@NgModule({
  declarations: [ProfileComponent, ProfileLikesComponent, ProfileProductsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
