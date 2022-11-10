import { Component, OnInit } from '@angular/core';
import { ProductService, Product, Comment, CommentService, UserService } from '../core';
import { ActivatedRoute } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  product?: Product;
  picture_product: String[] = [];
  faShoppingCart = faShoppingCart;
  comments: Comment[] = [];
  currentUsername: String = '';

  constructor(
    private ProductService: ProductService,
    private CommentService: CommentService,
    private UserService: UserService,
    private ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.getComments();
    this.UserService.currentUser.subscribe({
      next: data => this.currentUsername = data.username,
      error: e => console.error(e)
    });//check current user
  }

  getProduct() {
    const slug: any = this.ActivatedRoute.snapshot.paramMap.get('slug');
    if (this.ProductService.product.slug === slug) {
      this.product = this.ProductService.product;
    } else {
      this.ProductService.get_product(slug).subscribe({
        next: data => this.ProductService.product = data,
        error: e => console.error(e)
      });
    }

    this.ProductService.product$.subscribe({
      next: data => { this.product = data, this.picture_product = data.picture },
      error: e => console.error(e)
    })
  }
  redirectOwner() {
    this.Router.navigate([`/profile/${this.product?.owner.username}`]);
  }

  getComments() {
    const slug: any = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.CommentService.getAll(slug).subscribe({
      next: data => this.comments = data,
      error: e => console.error(e)
    });
  }//getComments

  deleteComment(id: String): void {
    this.CommentService.delete(id).subscribe({
      next: data => {
        if (data.type == 'success') {
          this.ToastrService.success("Comment deleted");
          this.comments = this.comments.filter(c => c.id !== id);
        }
      },
      error: e => console.error(e)
    })
  }//deleteComment

  createComment(data_form: any): void {
    const slug: any = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.CommentService.create(slug, data_form).subscribe({
      next: data => {
        if (data.type == 'success') {
          this.ToastrService.success('Comment added');
          this.comments.push(data.data);
        }
      },
      error: e => console.error(e)
    });
  }//createComment

}//class
