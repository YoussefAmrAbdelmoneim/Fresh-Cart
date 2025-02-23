import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading:boolean=false;
  showError:string="";
  success:string="";
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router);
register:FormGroup = new FormGroup({
  name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null ,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
},{validators:this.rePassword})

rePassword(group:AbstractControl){
  const password =group.get('password')?.value;
  const rePassword =group.get('rePassword')?.value;
  return password === rePassword ? null :{mismatch:true};
}

submitForm():void
{
  if (this.register.valid) {
    this.isLoading=true;
  this.authService.signUp(this.register.value).subscribe({
    next:(res) => {
      if(res.message === "success")
      {
 
        setTimeout(() => {   
          localStorage.setItem('token',res.token)
          this.authService.getUserToken();
           this.router.navigate(["/login"])
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
  this.register.markAllAsTouched();
}
}
}
