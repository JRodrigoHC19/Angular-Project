import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Message } from 'src/@models/message.model';
import { Product } from 'src/@models/product.model';

const URL_MESSAGES = "http://localhost:8080/messages/"

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
    const URL_MSG_BY_ID = `http://localhost:8080/messages/${id}`;
    return this.http.get<Message[]>(URL_MSG_BY_ID).pipe(
      catchError(this.handleError)
    );
  }

  getProduct_All(): Observable<Product[]> {
    const URL_JSON_LOCAL = "./././assets/db.json"
    return this.http.get<Product[]>(URL_JSON_LOCAL).pipe(
      catchError(this.handleError)
    )
  }

  addMessage(data: Message) {
    return this.http.post(URL_MESSAGES, data).pipe(
      catchError(this.handleError)
    );
  }

}
