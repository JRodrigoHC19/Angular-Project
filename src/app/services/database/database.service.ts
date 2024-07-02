import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Message } from 'src/@models/message.model';
import { Product } from 'src/@models/product.model';
import { User, User_Channel } from 'src/@models/user.model';


const URL_JSON_LOCAL = "./././assets/db.json"
const URL_MESSAGES = "http://64.176.3.20:8080/messages/"
const URL_USER_LIST = "http://64.176.3.20:8080/users/";
const URL_POST_CHANNEL ="http://64.176.3.20:8080/channels/";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  // currentMessagesData: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) { }


  private handleError(err: HttpErrorResponse){
    if(err.status === 0){
      console.error('Se ha producido un error');
    } else {
      console.error('El Backend ha retornado en codigo de estado:', err.status);
    }
    return throwError(() => Error('Algo ha fallado. Please, intente nuevamente.'));
  }

  getChat_All(): Observable<Message[]> {
    return this.http.get<Message[]>(URL_MESSAGES).pipe(
      catchError(this.handleError)
    );
  }

  getChat_One(id: number): Observable<Message[]> {
    const URL_MSG_BY_ID = `http://64.176.3.20:8080/messages/${id}`;
    return this.http.get<Message[]>(URL_MSG_BY_ID).pipe(
      catchError(this.handleError)
    );
  }

  getProduct_All(): Observable<Product[]> {
    return this.http.get<Product[]>(URL_JSON_LOCAL).pipe(
      catchError(this.handleError)
    )
  }

  addMessage(data: Message) {
    return this.http.post(URL_MESSAGES, data).pipe(
      catchError(this.handleError)
    );
  }

  getUser_All(): Observable<User[]> {
    return this.http.get<User[]>(URL_USER_LIST).pipe(
      // tap(() => {}),
      catchError(this.handleError)
    )
  }

  getUser_One(id: number): Observable<User[]> {
    const URL_ONE_USER = `http://64.176.3.20:8080/users/search/${id}`;
    return this.http.get<User[]>(URL_ONE_USER).pipe(
      catchError(this.handleError)
    )
  }

  getQRCode_One(id: number): Observable<User_Channel[]> {
    const URL_GET_CHANNEL = `http://64.176.3.20:8080/channels/search/${id}`;
    return this.http.get<User_Channel[]>(URL_GET_CHANNEL).pipe(
      catchError(this.handleError)
    )
  }

  postQRCode_One(data: User_Channel): Observable<User_Channel>{
    return this.http.post<User_Channel>(URL_POST_CHANNEL, data).pipe(
      catchError(this.handleError)
    )
  }

}
