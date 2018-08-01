import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { MarkEntity } from '../models/MarkEntity';

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  private controlerUrl = environment.apiBaseUrl + '/marks';

  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    private messageService: MessageService) {  }

    getMarks(): Observable<MarkEntity[]> {
    return this.httpClient
      .get<MarkEntity[]>(this.controlerUrl  + '/', {headers: this.authService.getHeaders()})
      .pipe(
        tap(a => this.log(`Marks loaded`)),
        catchError(this.handleError<MarkEntity[]>('gettAllTeachersActive')));
}


getTeacherMarks(): Observable<MarkEntity[]> {
  return this.httpClient
    .get<MarkEntity[]>(this.controlerUrl  + '/by-teacher', {headers: this.authService.getHeaders()})
    .pipe(
      tap(a => this.log(`Marks loaded`)),
      catchError(this.handleError<MarkEntity[]>('gettAllTeachersMarks')));
}

addMark(mark: MarkEntity) {
  return this.httpClient
  .post<MarkEntity>(this.controlerUrl + '/add-mark/', mark, {headers: this.authService.getHeaders()})
  .pipe(
    tap(a => this.log(`Mark added`)),
    catchError(this.handleError<MarkEntity>('')));
}

private log(message: string) {
  this.messageService.add('MarkService: ' + message);
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}
}
