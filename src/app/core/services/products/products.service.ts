import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }

  getProducts(p:string):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products?page=${p}`)
  }
  getDetails(id:String |null):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
}
