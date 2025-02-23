import { CartService } from './../../core/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { Component, input, Renderer2, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
isLogin= input<boolean>(true)
isDarkMode: boolean = false;
cartNumber:number=0;
constructor(private renderer: Renderer2, public authService:AuthService,private cartService:CartService) {}
private platformId=inject(PLATFORM_ID)
ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    if (this.isDarkMode) {
      this.renderer.addClass(document.documentElement, 'dark');
    }
  }
  this.cartService.cartNumber.subscribe({
    next:(data) => {
      this.cartNumber=data
    }
  })
  this.cartService.getCartItems().subscribe({
    next:(res) => {
      this.cartNumber=res.numOfCartItems
    }
  })
}

toggleDarkMode() {
  if (isPlatformBrowser(this.platformId)) {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.documentElement, 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
ngAfterViewInit()
{
  initFlowbite()
}
}
