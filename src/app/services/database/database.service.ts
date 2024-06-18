import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Message } from 'src/@models/message.model';
import { Product } from 'src/@models/product.model';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  currentMessagesData: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);


  constructor(private http: HttpClient) { }


  getChat_All(): Observable<Message[]> {
    return this.http.get<Message[]>("http://localhost:8080/messages/").pipe(
      tap((data: Message[]) => {
        this.currentMessagesData.next(data);
      }),
      catchError(this.handleError)
    );
  }

  getChat_One(id: number): Observable<Message[]> {
    return this.http.get<Message[]>(`http://localhost:8080/messages/${id}`).pipe(
      tap((data: Message[]) => {
        this.currentMessagesData.next(data);
      }),
      catchError(this.handleError)
    );
  }

  getProduct_All(): Observable<Product[]> {
    return this.http.get<Product[]>("./././assets/db.json").pipe(
      catchError(this.handleError)
    )
  }

  addMessage(data: Message) {
    return this.http.post("http://localhost:8080/messages/", data).pipe(
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
