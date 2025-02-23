import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink,FormsModule,SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
    private readonly productsService=inject(ProductsService);
     private readonly cartService =inject(CartService)
     constructor(private toastr: ToastrService) {}
     wishlistState: { [productId: string]: boolean } = {};
    productResponse:IProduct[]=[];
    cartNumber:number=0;
    ngOnInit(): void {
        this.getAllProducts()
        this.wishlistService.wishlistState.subscribe((state) => {
          this.wishlistState = state;
        }); 
        this.wishlistService.getWishlistItems().subscribe();
    }
    pages:string='1';
    inputValue:string="";
  getAllProducts()
  {
    this.productsService.getProducts(this.pages).subscribe({
      next:(res) => {
        this.productResponse=res.data;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
  addToCart(id:string)
{
  this.cartService.addProductToCart(id).subscribe({
    next:(res) => {
      this.toastr.success(res.message,"Fresh Cart")
      this.cartService.cartNumber.next(res.numOfCartItems)
    }
  })
}
private readonly wishlistService=inject(WishlistService)
toggleWishlist(id: string) {
  if (this.wishlistState[id]) {
    this.deleteFromWishlist(id);
  } else {
    this.AddToWishlist(id);
  }
}
AddToWishlist(id:string)
{
  this.wishlistService.addProductToWishlist(id).subscribe({
    next:(res) => {
      this.wishlistState[id] = true;
      this.toastr.success(res.message,"Fresh Cart")
    }
  })
}
deleteFromWishlist(id:string)
{
  this.wishlistService.removeProductFromWishlist(id).subscribe({
    next:(res) => {
      this.wishlistState[id] = false;
      this.toastr.warning('Product removed successfully from your wishlist',"Fresh Cart")
    }
  })
}
  page1(){
  this.pages='1';
    this.getAllProducts();
  }
  page2(){
  this.pages='2';
    this.getAllProducts();
  }
  isActive(buttonId: string): boolean {
    return this.pages === buttonId;
  }
}
