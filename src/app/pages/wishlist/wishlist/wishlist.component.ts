import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
private readonly wishlistService=inject(WishlistService);
  private readonly cartService=inject(CartService)
  constructor(private toastr: ToastrService) {}
  empty:boolean=true;
wishlist:IProduct[]=[];
ngOnInit(): void {
  this.getWishlistProducts()
}
getWishlistProducts()
{
  this.wishlistService.getWishlistItems().subscribe({
    next:(res) => {
      this.wishlist=res.data
      this.empty = this.wishlist.length === 0;
    }
  })
}
deleteFromWishlist(id:string)
{
  this.wishlistService.removeProductFromWishlist(id).subscribe({
    next:(res) => {
  this.wishlist= this.wishlist.filter(product => product.id !== id)
  this.empty = this.wishlist.length === 0;
      this.toastr.warning('Product removed successfully from your wishlist',"Fresh Cart")
    }
  })
}
addToCart(id:string)
{
  this.cartService.addProductToCart(id).subscribe({
    next:(res) => {
      this.toastr.success(res.message,"Fresh Cart")
    }
  })
}
}
