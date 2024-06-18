import { BehaviorSubject, Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { LoginResponse } from 'src/@models/login_response.model';
import { User } from 'src/@models/user.model';
import { Credentials, NewCredentials } from 'src/@models/credentials.model';


const UserVoid: User = { id: -1, name: "", is_admin: 0, "email": "" };


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>(UserVoid);
  currentIdToken: BehaviorSubject<string> = new BehaviorSubject<string>("");


  constructor(private http: HttpClient, private cookies: CookieService, private router: Router) { }


  login(credentials: Credentials): Observable<LoginResponse> {
    let response =  this.http.post<LoginResponse>("http://localhost:8000/api/user/login/", credentials).pipe(
      tap(tokens => {
        this.currentIdToken.next(tokens.token.access);
        this.cookies.set('IdToken', tokens.token.access);
      }),
      catchError(this.handleError)
    );

    return response;
  }

  createAccount(credentials: NewCredentials): Observable<LoginResponse> {
    let response =  this.http.post<LoginResponse>("http://localhost:8000/api/user/register/", credentials).pipe(
      tap(tokens => {
        this.currentIdToken.next(tokens.token.access);
        this.cookies.set('IdToken', tokens.token.access);
      }),
      catchError(this.handleError)
    );

    return response;
  }

  logout(): void{
    this.currentUserData.next(UserVoid);
    this.currentIdToken.next("");
    this.cookies.delete('IdToken');
    this.router.navigateByUrl("/login");
  }

  isLoggedIn(): boolean{
    return this.cookies.get('IdToken').trim().length ? true : false
  }


  UserRequest(): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookies.get("IdToken")}`);
    return this.http.get<User>("http://localhost:8000/api/user/profile/", { headers }).pipe(
      tap((userData: User) => {
        this.currentUserData.next(userData);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    if(err.status === 0){
      console.error('Se ha producido un error');
    } else {
      console.error('El Backend ha retornado en codigo de estado:', err.status);
    }
    return throwError(() => Error('Algo ha fallado. Please, intente nuevamente.'));
  }
}
