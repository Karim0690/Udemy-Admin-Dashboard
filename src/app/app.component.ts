import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { HeaderComponent } from './Components/header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthorizationService } from './Services/authorization.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , SidebarComponent , HeaderComponent ,FormsModule , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TechStoreAdmin';

  isLoggedin:boolean=false;
  valueLog:boolean=true;
constructor(private _authonticationService:AuthorizationService , private router:Router){
}
  ngOnInit() {
    this._authonticationService.getLoggedStatus().subscribe((status)=>{
      this.isLoggedin=status
    })
  }
}
