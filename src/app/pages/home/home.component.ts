import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsService } from '../../core/services/products/products.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { AuthService } from '../../core/services/auth/auth.service';
@Component({
  selector: 'app-home',
  imports: [CarouselModule ,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService=inject(ProductsService);
  private readonly categoriesService=inject(CategoriesService);
  private readonly authService=inject(AuthService);
  constructor(private toastr: ToastrService) {}
  productResponse:IProduct[]=[];
  categoriesResponse:ICategory[]=[];
  username: string = '';
  cartNumber:number=0;
  wishlistState: { [productId: string]: boolean } = {};
  getAllProducts()
  {
    this.productsService.getProducts('1').subscribe({
      next:(res) => {
        this.productResponse=res.data;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
  getAllCategories()
  {
    this.categoriesService.getCategories().subscribe({
      next:(res) => {
        this.categoriesResponse=res.data;
      },
      error:(err) => {
        console.log(err);
        
      }
    })
  }
  private readonly cartService =inject(CartService)
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
  ngOnInit(): void {
    this.authService.getUserToken();
    if (this.authService.userToken) {
      this.username = this.authService.userToken.name;
    }
      this.getAllProducts();
      this.getAllCategories();
      this.wishlistService.wishlistState.subscribe((state) => {
        this.wishlistState = state;
      }); 
      this.wishlistService.getWishlistItems().subscribe();
  }
  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 900,
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
    nav: false
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:7000,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 900,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
}
