import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { ParentEntity } from '../models/ParentEntity';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private controlerUrl = environment.apiBaseUrl + '/parents';

  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    private messageService: MessageService) {  }

    getParents(): Observable<ParentEntity[]> {
    return this.httpClient
      .get<ParentEntity[]>(this.controlerUrl  + '/active/', {headers: this.authService.getHeaders()})
      .pipe(
        tap(a => this.log(`Učitani profesori`)),
        catchError(this.handleError<ParentEntity[]>('gettAllParentsActive')));
}

addParent(parent: ParentEntity) {
  return this.httpClient
  .post<ParentEntity>(this.controlerUrl + '/add-parent', {headers: this.authService.getHeaders()})
  .pipe(
    tap(a => this.log(`Parent added`)),
    catchError(this.handleError<ParentEntity>('')));
}

private log(message: string) {
  this.messageService.add('ParentService: ' + message);
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}
}
