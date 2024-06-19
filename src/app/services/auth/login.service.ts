import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { Credentials, NewCredentials, NewPassword } from 'src/@models/credentials.model';
import { LoginResponse } from 'src/@models/login_response.model';
import { User } from 'src/@models/user.model';


const URL_LOGIN = "http://localhost:8000/api/user/login/";
const URL_REGISTER = "http://localhost:8000/api/user/register/";
const URL_PROFILE = "http://localhost:8000/api/user/profile/";
const URL_CHANGE_PWD = "http://localhost:8000/api/user/changepassword/";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>(UserVoid);
  // currentIdToken: BehaviorSubject<string> = new BehaviorSubject<string>("");
  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private router: Router
  ) { }

  private handleError(err: HttpErrorResponse){
    if(err.status === 0){
      console.error('Se ha producido un error');
    } else {
      console.error('El Backend ha retornado en codigo de estado:', err.status);
    }
    return throwError(() => Error('Algo ha fallado. Please, intente nuevamente.'));
  }


  logout() {
    this.cookies.delete('IdToken');
    this.router.navigateByUrl("/");
  }

  isLoggedIn(): boolean{
    return this.cookies.get('IdToken').trim().length ? true : false;
  }


  login(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(URL_LOGIN, credentials).pipe(
      tap(tokens => {
        this.cookies.set('IdToken', tokens.token.access);
      }),
      catchError(this.handleError)
    );
  }

  createAccount(credentials: NewCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(URL_REGISTER, credentials).pipe(
      tap(tokens => {
        this.cookies.set('IdToken', tokens.token.access);
      }),
      catchError(this.handleError)
    );
  }

  changePassword(credenciales: NewPassword): Observable<any> {
    let idToken = this.cookies.get("IdToken");

    const headers = new HttpHeaders().set('Authorization', `Bearer ${idToken}`);
    return this.http.post<any>(URL_CHANGE_PWD, credenciales, { headers }).pipe(
      catchError(this.handleError)
    )
  }

  UserRequest(): Observable<User> {
    let idToken = this.cookies.get("IdToken");

    const headers = new HttpHeaders().set('Authorization', `Bearer ${idToken}`);
    return this.http.get<User>(URL_PROFILE, { headers }).pipe(
      // tap((userData: User) => { this.currentUserData.next(userData) }),
      catchError(this.handleError)
    );
  }

}
