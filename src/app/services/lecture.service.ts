import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { LectureEntity } from '../models/LectureEntity';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  private controlerUrl = environment.apiBaseUrl + '/lectures';

  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    private messageService: MessageService) {  }

    getLectures(): Observable<LectureEntity[]> {
    return this.httpClient
      .get<LectureEntity[]>(this.controlerUrl  + '/', {headers: this.authService.getHeaders()})
      .pipe(
        tap(a => this.log(`Lectures loaded`)),
        catchError(this.handleError<LectureEntity[]>('gettAllLectures')));
}

getLecturesByTeacher(): Observable<LectureEntity[]> {
  return this.httpClient
    .get<LectureEntity[]>(this.controlerUrl  + '/by-teacher/', {headers: this.authService.getHeaders()})
    .pipe(
      tap(a => this.log(`Lectures loaded`)),
      catchError(this.handleError<LectureEntity[]>('by-teacher')));
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
