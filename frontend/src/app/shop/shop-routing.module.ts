import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopComponent } from './shop.component';

const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: ':filter', component: ShopComponent },
  /*  { path: 'category/:slug', component: ShopComponent },
   { path: 'category/:slug/:filter', component: ShopComponent },
   { path: 'filter/:filter', component: ShopComponent } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
