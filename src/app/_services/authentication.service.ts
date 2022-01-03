import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({
    Accept: '*/*',
  }),
  observe: 'response'
};

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(username: any, password: any): any {

    return this.http.post(`http://localhost:4200/api/authenticate`, {
      username,
      password
      // @ts-ignore
    }, httpOptions)
  }

  signOut(): void {
    window.sessionStorage.clear();
    localStorage.clear();
  }

  public saveToken(token: string, rememberMe: boolean): void {
    if (rememberMe) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getToken(): string | null {
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token != null) return token;
    else return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any, rememberMe: boolean): void {
    if (rememberMe) {
      localStorage.removeItem(USER_KEY);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public getUser(): any {
    let user = window.sessionStorage.getItem(USER_KEY);
    if (user === null) user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
