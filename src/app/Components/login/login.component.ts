import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorizationService } from '../../Services/authorization.service';
import { Router } from '@angular/router';
import { IReturnedToken } from '../../Models/ireturned-token';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  formGroup :FormGroup =new FormGroup({}) ;
  tokenn:IReturnedToken={token:'' , message:''};
  valueLog:boolean=true;
constructor(private _authonticationService:AuthorizationService , private router:Router){
  
}
  ngOnInit() {
    this.formGroup = new FormGroup({
      email:new FormControl('' , [Validators.required]) ,
      password:new FormControl('' , [Validators.required]) 
    });
  }
  
login()
{  
  this._authonticationService.Login(this.formGroup.value).subscribe({
    next:(response:IReturnedToken)=>{      
        localStorage.setItem('token' , response.token)
       this.router.navigateByUrl('/Home');
       this._authonticationService.isLoggedStatus.next(true);

    } , 
    error:(err)=>{
       console.log(err);

    }
  });
}


}
