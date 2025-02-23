import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink], 
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private readonly cartService=inject(CartService)
  private readonly toastr=inject(ToastrService)
  cartDetails:ICart={} as ICart
  empty:boolean=true;
  ngOnInit(): void {
   this.getCartDetails()
    
  }
  getCartDetails()
  {
    this.cartService.getCartItems().subscribe({
      next:(res) => {
        this.cartDetails=res.data
        this.empty = this.cartDetails.products?.length === 0;
      }
    }) 
  }

  deleteCartItem(id:string)
  {
    this.cartService.removeItem(id).subscribe({
      next:(res) => {
        this.toastr.warning('Product removed successfully from your wishlist',"Fresh Cart")
        this.cartDetails=res.data
        this.cartService.cartNumber.next(res.numOfCartItems)
      }
    })
  }
  updataCartItem(id:string,count:number)
  {
    this.cartService.updataCartProductQuantity(id,count).subscribe({
      next:(res) => {
        this.cartDetails=res.data
        this.cartService.cartNumber.next(res.numOfCartItems)
      }
    })
  }
  clearCart()
  {
    this.cartService.clearCart().subscribe({
      next:(res) => {
        if(res.message === "success")
          {
                    this.cartDetails={} as ICart;
                    this.toastr.warning('The Cart Cleard successfully',"Fresh Cart")
                    this.cartService.cartNumber.next(0)
          }
      }
    })
  }
}
