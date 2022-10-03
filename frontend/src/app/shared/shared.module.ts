import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ListCategoryComponent } from "./list-category/list-category.component";
import { ListProductsComponent } from './list-products/list-products.component';
import { CardProductsComponent } from './card-products/card-products.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemsComponent } from './carousel-items/carousel-items.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchComponent } from './search/search.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        InfiniteScrollModule,
    ],
    declarations: [
        ListCategoryComponent,
        ListProductsComponent,
        CardProductsComponent,
        CarouselComponent,
        CarouselItemsComponent,
        SearchComponent,
    ],
    exports: [
        ListCategoryComponent,
        ListProductsComponent,
        CardProductsComponent,
        CarouselComponent,
        CarouselItemsComponent,
        SearchComponent
    ],
})
export class SharedModule { }