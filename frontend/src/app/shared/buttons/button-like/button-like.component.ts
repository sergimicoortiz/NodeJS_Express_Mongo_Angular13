import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product, UserService, ProductService } from 'src/app/core';

@Component({
  selector: 'app-button-like',
  templateUrl: './button-like.component.html',
  styleUrls: ['./button-like.component.css']
})
export class ButtonLikeComponent implements OnInit {

  @Input() product: Product = {} as Product;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  isLoged: Boolean = false;

  constructor(
    private UserService: UserService,
    private ProductService: ProductService,
    private Router: Router,
    private ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  toggleFavorite() {
    this.isSubmitting = true;
    this.UserService.isAuthenticated.subscribe({
      next: data => this.isLoged = data,
      error: error => console.error(error)
    });

    if (!this.isLoged) {
      this.ToastrService.error('You must be loged. You eill be redirect to the login page');
      setTimeout(() => { this.Router.navigate(['/auth/login']); }, 600);
    }

    if (!this.product.haveLike) {
      this.ProductService.like(this.product.slug).subscribe({
        next: data => {
          if (data.type = "success") {
            this.product.haveLike = true;
            this.isSubmitting = false;
            this.toggle.emit(true);
          }
        },
        error: error => console.error(error)
      });
    } else {
      this.ProductService.unlike(this.product.slug).subscribe({
        next: data => {
          if (data.type = "success") {
            this.product.haveLike = false;
            this.isSubmitting = false;
            this.toggle.emit(false);
          }
        },
        error: error => console.error(error)
      });
    }

  }//toggleFavorite
}//class
