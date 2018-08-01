import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { StudentEntity } from '../models/StudentEntity';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private controlerUrl = environment.apiBaseUrl + '/students';

  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    private messageService: MessageService) {  }

    getStudents(): Observable<StudentEntity[]> {
    return this.httpClient
      .get<StudentEntity[]>(this.controlerUrl  + '/active/', {headers: this.authService.getHeaders()})
      .pipe(
        tap(a => this.log(`Students loaded`)),
        catchError(this.handleError<StudentEntity[]>('gettAllStudentsActive')));
}

getStudentsByTeacher(): Observable<StudentEntity[]> {
  return this.httpClient
    .get<StudentEntity[]>(this.controlerUrl  + '/by-teacher/', {headers: this.authService.getHeaders()})
    .pipe(
      tap(a => this.log(`Students loaded`)),
      catchError(this.handleError<StudentEntity[]>('by-teacher')));
}

addStudent(student: StudentEntity) {
  return this.httpClient
  .post<StudentEntity>(this.controlerUrl + '/add-student', {headers: this.authService.getHeaders()})
  .pipe(
    tap(a => this.log(`Student added`)),
    catchError(this.handleError<StudentEntity>('')));
}

private log(message: string) {
  this.messageService.add('StudentService: ' + message);
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}
}
