import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUserCreate } from '../../Models/iuser-create';
import { UserService } from '../../Services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { cloudEnvironment } from '../../../environment';

@Component({
  selector: 'app-create-user-account',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './create-user-account.component.html',
  styleUrls: ['./create-user-account.component.css'],
})
export class CreateUserAccountComponent implements OnInit {
  newAccount: IUserCreate = {
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    password: '',
    photo: null,
    role: [],
  };
  availableRoles: string[] = ['admin', 'instructor', 'student'];
  formSubmitted: boolean = false;

  loading: boolean = false;

  constructor(
    private _userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onRoleChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.newAccount.role.push(checkbox.value);
    } else {
      const index = this.newAccount.role.indexOf(checkbox.value);
      if (index !== -1) {
        this.newAccount.role.splice(index, 1);
      }
    }
  }

  addNewAccount() {
    this.formSubmitted = true; // Track if the form was submitted
    if (this.newAccount.role.length === 0) {
      alert('At least one role must be selected.'); // Validate role selection
      return;
    }

    console.log(this.newAccount);
    // Submit the user account data
    this._userService.CreateUserAccount(this.newAccount).subscribe({
      next: (response) => {
        console.log('User account created successfully:', response);
        this.router.navigateByUrl('/Users');
      },
      error: (error) => {
        console.error('Error creating account:', error);
        alert('Oops! Please try again!');
      },
    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    if (file) {
      this.uploadImage(file);
    }
  }

  uploadImage(file: File) {
    const uploadData = new FormData(); // New instance for image upload
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'mjk3zr3x'); // Set your upload preset

    const url = `https://api.cloudinary.com/v1_1/${cloudEnvironment.cloudinary.cloudName}/upload`;
    this.loading = true; // Start loading

    this.http.post(url, uploadData).subscribe({
      next: (response: any) => {
        console.log('Upload successful:', response);
        this.newAccount.photo = response.secure_url; // Save the uploaded image URL
        this.loading = false; // Stop loading
      },
      error: (error) => {
        console.error('Upload failed:', error);
        alert('Image upload failed. Please try again.');
        this.loading = false; // Stop loading
      },
    });
  }
}
