import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TeacherEntity } from '../models/TeacherEntity';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private controlerUrl = environment.apiBaseUrl + '/teachers';

  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    private messageService: MessageService) {  }

    getTeachers(): Observable<TeacherEntity[]> {
    return this.httpClient
      .get<TeacherEntity[]>(this.controlerUrl  + '/active/', {headers: this.authService.getHeaders()})
      .pipe(
        tap(a => this.log(`Teachers loaded`)),
        catchError(this.handleError<TeacherEntity[]>('gettAllTeachersActive')));
}

addTeacher(teacher: TeacherEntity) {
  return this.httpClient
  .post<TeacherEntity>(this.controlerUrl + '/add-teacher/', teacher, {headers: this.authService.getHeaders()})
  .pipe(
    tap(a => this.log(`Teacher added`)),
    catchError(this.handleError<TeacherEntity>('')));
}

private log(message: string) {
  this.messageService.add('TeacherService: ' + message);
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}
}
