import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Freelancer } from 'src/app/common/freelancer';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  freelancers: Freelancer[];
  currentCategoryId: number;
  currentCategoryDescription: string;
  searchMode: boolean;

  constructor(private productService: ProductService,
    private route: ActivatedRoute, private cartService : CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listEmployees();
    });

  }



  listEmployees() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchEmployees();
    } else {
      this.handleListEmployees();
    }

  }

  handleListEmployees() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('category');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('category');
      this.currentCategoryDescription = this.route.snapshot.paramMap.get('description');
    } else {
      this.currentCategoryId = 1;
      this.currentCategoryDescription = 'Technical';
    }

    this.productService.getFreelancersByCategory(this.currentCategoryId).subscribe(
      data => {
        this.freelancers = data;
      }
    );
  }

  handleSearchEmployees() {
    const theKeyword : string = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchFreelancers(theKeyword).subscribe(
      data =>{
        this.freelancers = data;
      }
    );
  }

  addToCart( freelancer : Freelancer ){
    
    console.log("Adding to cart: "+ freelancer.name + freelancer.charge + freelancer.description);

    const cartItem : CartItem = new CartItem(freelancer);

    this.cartService.addToCart(cartItem);

  }

}
