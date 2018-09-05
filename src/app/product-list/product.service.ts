import { Injectable } from '@angular/core';
import { IProduct } from '../model/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'resources/products/products-data.json';
  
  constructor(private http: HttpClient) { }
  
  getProducts() : Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url).pipe(
      tap(data => console.log()),
      catchError(this.handleError)
    );
  }
 
  private handleError(httpError: HttpErrorResponse) {
    let errorMessage = '';
    if(httpError.error instanceof ErrorEvent){
      errorMessage= `Error in getProducts: ${httpError.error.message} `;
    } else {
      errorMessage = `Error in getProducts with Code ${httpError.status}, error message is: ${httpError.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
