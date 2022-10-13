import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NoAuthGuard } from '../core/guard';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers: [NoAuthGuard]
})
export class AuthModule { }
