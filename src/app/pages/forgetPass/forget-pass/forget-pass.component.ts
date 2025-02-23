import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.scss'
})
export class ForgetPassComponent {
step:number =1;
isLoading:boolean=false;
private readonly authService=inject(AuthService)
private readonly router=inject(Router)
verifyEmail:FormGroup=new FormGroup({
  email: new FormControl(null,[Validators.required,Validators.email])
})
verifyCode:FormGroup=new FormGroup({
  resetCode: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
})
resetPassword:FormGroup=new FormGroup({
  email :new FormControl(null,[Validators.required,Validators.email]),
  newPassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)])
})
verify_Email()
{
  if (this.verifyEmail.valid) {
  let getEmail= this.verifyEmail.get('email')?.value;
  this.resetPassword.get('email')?.patchValue(getEmail);
  this.isLoading=true;
  this.authService.verifyEmail(this.verifyEmail.value).subscribe({
    next:(res) => {      
      if (res.statusMsg ==="success") {
              this.step=2;
      }
      this.isLoading=false;
    }
  })
}
else{
  this.verifyEmail.markAllAsTouched()
}
}
verify_code()
{
  if (this.verifyCode.valid) {
  this.isLoading=true;
  this.authService.verifyCode(this.verifyCode.value).subscribe({
    next:(res) => {
      if (res.status === "Success") {
      this.step=3;
      }
      this.isLoading=false;
    }
  })  
}
else{
  this.verifyCode.markAllAsTouched();
}
}
newPassword()
{
  if (this.resetPassword.valid) {

  this.isLoading=true;
  this.authService.resetPassword(this.resetPassword.value).subscribe({
    next:(res) => {
      this.isLoading=false;
       localStorage.setItem("token",res.token)
       this.authService.getUserToken();
       this.router.navigate(['/home'])
    }
  })  
}
else
{
  this.resetPassword.markAllAsTouched();
}
}
}
