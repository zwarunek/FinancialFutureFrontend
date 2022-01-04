import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    Accept: '*/*',
  }),
  observe: 'response'
};
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {
  }


  register(user: any) {
    return this.http.post<any>(`http://localhost:4200/api/register`, user).pipe(map(response => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      return response;
    }));
  }

  changeAccountDetails(user: any, id: string) {

    return this.http.put<any>(`http://localhost:4200/api/accounts/` + id, user).pipe(map(response => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      return response;
    }));
  }

  sendPasswordResetTokenToEmail(username: string): any {
    // @ts-ignore
    return this.http.post(`http://localhost:4200/api/passwordreset`, {username}, httpOptions);
  }

  resetPassword(password: string, token: string): any {
    // @ts-ignore
    return this.http.post(`http://localhost:4200/api/passwordreset/reset?token=` + token, {password}, httpOptions);
  }

  getAccountDetailsFromPasswordResetToken(token: string): any {
    // @ts-ignore
    return this.http.get(`http://localhost:4200/api/passwordreset?token=` + token, httpOptions);
  }
}
