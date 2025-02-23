import { Component, inject, OnInit } from '@angular/core';
import { OwlOptions ,CarouselModule } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [CarouselModule ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  productDetails:IProduct | null = null;
private readonly activatedRoute=inject(ActivatedRoute);
private readonly productsService=inject(ProductsService);
     private readonly cartService =inject(CartService)
       private readonly toastr=inject(ToastrService)

ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(param) => {
        let productId=param.get('id')
        this.productsService.getDetails(productId).subscribe({
          next:(res) => {
            this.productDetails = res.data;
          }
        })
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
customOptions: OwlOptions = {
  loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
}
}
