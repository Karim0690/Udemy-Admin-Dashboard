import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../Models/ilogin';
import { BehaviorSubject, Observable } from 'rxjs';
import { IReturnedToken } from '../Models/ireturned-token';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  isLoggedStatus:BehaviorSubject<boolean>;

  apiUrl = environment.apiUrl;

  constructor(private httpclient:HttpClient) {
    this.isLoggedStatus=new BehaviorSubject<boolean>(this.isLoggedIn());
    this.getLoggedStatus()

  }

  Login(newLogin: ILogin): Observable<IReturnedToken> {
    return this.httpclient.post<IReturnedToken>(`${this.apiUrl}Account/Login`, newLogin);

  }

  Logout(value: boolean): Observable<IReturnedToken> {
    this.isLoggedStatus.next(false);
    return this.httpclient.post<IReturnedToken>(`${this.apiUrl}Account/Logout`, value);
  }

  isLoggedIn():boolean {
  return localStorage.getItem('token') ?true :false;
  }

  getLoggedStatus():BehaviorSubject<boolean>
  {
    return this.isLoggedStatus;
  }
}
