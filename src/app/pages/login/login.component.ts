import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading:boolean=false;
  showError:string="";
  success:string="";
    private readonly authService=inject(AuthService)
    private readonly router=inject(Router);
  login:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)])
  })
  submitForm():void
  {
    if (this.login.valid) {
      this.isLoading=true;
    this.authService.signIn(this.login.value).subscribe({
      next:(res) => {
        if(res.message === "success")
        {
          setTimeout(() => {   
            localStorage.setItem('token',res.token)
            this.authService.getUserToken();
             this.router.navigate(['/home'])
          }, 500);
                   this.success=res.message;
        }
        this.isLoading=false;
      },
      error:(err:HttpErrorResponse) => {
       this.showError= err.error.message;
       this.isLoading=false;
      }
    })  
  }
  else{
    this.login.markAllAsTouched();
  }
  }
}
