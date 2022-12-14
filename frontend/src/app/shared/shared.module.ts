import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ListCategoryComponent } from "./list-category/list-category.component";
import { ListProductsComponent } from './list-products/list-products.component';
import { CardProductsComponent } from './card-products/card-products.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemsComponent } from './carousel-items/carousel-items.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchComponent } from './search/search.component';
import { FiltersComponent } from './filters/filters.component';
import { ButtonLikeComponent, ButtonFollowComponent } from './buttons';
import { CardCommentComponent } from './card-comment/card-comment.component';
import { CommentsComponent } from './comments/comments.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        InfiniteScrollModule,
        FontAwesomeModule
    ],
    declarations: [
        ListCategoryComponent,
        ListProductsComponent,
        CardProductsComponent,
        CarouselComponent,
        CarouselItemsComponent,
        SearchComponent,
        FiltersComponent,
        ButtonLikeComponent,
        ButtonFollowComponent,
        CardCommentComponent,
        CommentsComponent
    ],
    exports: [
        ListCategoryComponent,
        ListProductsComponent,
        CardProductsComponent,
        CarouselComponent,
        CarouselItemsComponent,
        SearchComponent,
        ButtonLikeComponent,
        ButtonFollowComponent,
        CardCommentComponent,
        CommentsComponent,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class SharedModule { }