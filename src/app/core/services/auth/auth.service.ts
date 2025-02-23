import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { environment } from '../../../shared/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient ,private router:Router) { }
  userToken:any=null

  signUp(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }
  signIn(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }

  getUserToken():void
  {
    if(localStorage.getItem("token") !==null)
    {
      this.userToken= jwtDecode(localStorage.getItem("token") !)
    }
  }
  logOut()
  {
    localStorage.removeItem("token");
    this.userToken=null;
    this.router.navigate(["/login"]);
  }
  verifyEmail(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }
  verifyCode(data:object):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }
  resetPassword(data:object):Observable<any>
  {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}

