import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient) { }
  createCashOrder(id:string,data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders//checkout-session/${id}?url=http://localhost:4200`,    {
      "shippingAddress" : data
    }) 
  }
}
