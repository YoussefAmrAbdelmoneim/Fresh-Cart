import { Component, inject, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment/payment.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
private readonly paymentService=inject(PaymentService)
private readonly activatedRoute=inject(ActivatedRoute)
id:string='';
isLoading:boolean=false;
checkOutForm=new FormGroup({
  details:new FormControl(null,[Validators.required,Validators.minLength(5)]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city:new FormControl(null,[Validators.required,Validators.minLength(3)])
})
ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((param) => {
    this.id = param.get('id') !
  })
}
submitForm()
{
  if(this.checkOutForm.valid)
  {
      this.isLoading=true;
  this.paymentService.createCashOrder(this.id,this.checkOutForm.value).subscribe({
    next:(res) => {
      this.isLoading=false; 
      if(res.status==='success')
      {
        open(res.session.url,'_self')
      }
    }
  })
  }
  else
  {
    this.checkOutForm.markAllAsTouched();
  }
}
}
