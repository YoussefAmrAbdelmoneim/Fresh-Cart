import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../shared/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistState: BehaviorSubject<{ [key: string]: boolean }> = new BehaviorSubject({});

  constructor(private httpClient: HttpClient) {}

  getWishlistItems(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`).pipe(
      tap((wishlist: any) => {
        const updatedState: { [key: string]: boolean } = {};
        wishlist.data.forEach((product: any) => {
          updatedState[product.id] = true;
        });
        this.wishlistState.next(updatedState);
      })
    );
  }

  addProductToWishlist(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, { productId: id }).pipe(
      tap(() => {
        const updatedState = { ...this.wishlistState.value, [id]: true };
        this.wishlistState.next(updatedState);
      })
    );
  }

  removeProductFromWishlist(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`).pipe(
      tap(() => {
        const updatedState = { ...this.wishlistState.value };
        delete updatedState[id];
        this.wishlistState.next(updatedState);
      })
    );
  }
}