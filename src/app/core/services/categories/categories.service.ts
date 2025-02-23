import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient:HttpClient) { }
  getCategories():Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }
  getSpecificCategory(id:string):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`)
  }
  getSubCategories(id:string):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}/subcategories`)
  }
}
