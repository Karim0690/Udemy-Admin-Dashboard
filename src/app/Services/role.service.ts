import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRole } from '../Models/irole';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }
  

  GetAllRole(): Observable<IRole[]> {
    return this.httpClient.get<IRole[]>(`${this.apiUrl}Role/GetAllRoles`);
  }

 
}
