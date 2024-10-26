import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUserCreate } from '../../Models/iuser-create';
import { UserService } from '../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RoleService } from '../../Services/role.service';
import { Router } from '@angular/router';
import { IRole } from '../../Models/irole';

@Component({
  selector: 'app-create-user-account',
  standalone: true,
  imports: [FormsModule , CommonModule, HttpClientModule],
  templateUrl: './create-user-account.component.html',
  styleUrl: './create-user-account.component.css'
})
export class CreateUserAccountComponent  implements OnInit{
  newAccount: IUserCreate = {
    Id: '',
    FirstName: '',
    LastName: '',
    UserName: '',
    PhoneNumber: '',
    Email: '',
    Address: '',
    Password: '',
    Image:null, 

};
  roles:IRole[] =[];
  RoleName:string=''
  formData = new FormData();
  constructor(private _userService:UserService , private _roleService:RoleService , private router:Router){

}

ngOnInit(): void {
this._roleService.GetAllRole().subscribe({
next:(respone)=>
{
  this.roles=respone;
} ,
error:(error)=>
{
console.log(error);

}
});

}
addNewAccount(){
  if (this.newAccount.FirstName) {
    this.formData.append('FirstName', this.newAccount.FirstName);
  }
  if (this.newAccount.LastName) {
    this.formData.append('LastName', this.newAccount.LastName);
  }
  if (this.newAccount.UserName) {
    this.formData.append('UserName', this.newAccount.UserName);
  }
  if (this.newAccount.PhoneNumber) {
    this.formData.append('PhoneNumber', this.newAccount.PhoneNumber);
  }
  if (this.newAccount.Email) {
    this.formData.append('Email', this.newAccount.Email);
  }
  if (this.newAccount.Address) {
    this.formData.append('Address', this.newAccount.Address);
  }
  if (this.newAccount.Password) {
    this.formData.append('Password', this.newAccount.Password);
  }
  if (this.newAccount.Image) {
    this.formData.append('Image', this.newAccount.Image , this.newAccount.Image.name);
  }
 


  this._userService.CreateUserAccount(this.formData , this.RoleName).subscribe({
  next:(response)=>{
    this.newAccount=response

    this.router.navigateByUrl('/Users')
  } , 

  error:(error)=>{
  console.log ('Opps! please try again !')
  }
  });
}
onImageSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0] ?? null;
  if (file) {
    this.newAccount.Image = file;
  }
}
}
