import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ListCategoryComponent } from "./list-category/list-category.component";
import { ListProductsComponent } from './list-products/list-products.component';
import { CardProductsComponent } from './card-products/card-products.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
    ],
    declarations: [
        ListCategoryComponent,
        ListProductsComponent,
        CardProductsComponent,
    ],
    exports: [
        ListCategoryComponent,
        ListProductsComponent,
        CardProductsComponent,
    ],
})
export class SharedModule { }