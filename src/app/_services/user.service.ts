import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }


  register(user: any) {
    return this.http.post<any>(`http://localhost:4200/api/register`, user).pipe(map(response => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      return response;
    }));
  }

  changeAccountDetails(user: any, id: string){

    return this.http.put<any>(`http://localhost:4200/api/accounts/` + id, user).pipe(map(response => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      return response;
    }));
  }
}
