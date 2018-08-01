import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { SubjectEntity } from '../models/SubjectEntity';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private controlerUrl = environment.apiBaseUrl + '/subjects';

  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    private messageService: MessageService) {  }

getAllSubjects(): Observable<SubjectEntity[]> {
  return this.httpClient
    .get<SubjectEntity[]>(this.controlerUrl  + '/', {headers: this.authService.getHeaders()})
    .pipe(
      tap(a => this.log(`Lectures loaded`)),
      catchError(this.handleError<SubjectEntity[]>('by-teacher')));
}


private log(message: string) {
  this.messageService.add('LectureService: ' + message);
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}
}
