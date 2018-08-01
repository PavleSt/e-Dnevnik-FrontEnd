import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = environment.apiBaseUrl + '/auth/';
  public role: string;

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
    this.role = localStorage.getItem('role');
  }

  login(username: string, password: string): Observable<string> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));

    return this.httpClient.post<any>(this.authUrl + 'login', {}, {headers: httpHeaders} )
      .pipe(
        tap(a => this.log(`Uspesan login`)),
        catchError(this.handleError<any>('login'))
      );
  }

  logout() {
    localStorage.removeItem('credentials');
    localStorage.removeItem('role');
    this.role = null;
  }

  saveCredentials(username: string, password: string, role: string) {
    localStorage.setItem('credentials', btoa(`${username}:${password}`));
    localStorage.setItem('role', role);
    this.role = role;
  }

  getHeaders(): HttpHeaders {
    let httpHeaders = new HttpHeaders();

    const credentials = localStorage.getItem('credentials');
    if (credentials) {
      httpHeaders = httpHeaders.append('Content-Type', 'application/json');
      httpHeaders = httpHeaders.append('Authorization', 'Basic ' + credentials);
    }

    return httpHeaders;
  }

  private log(message: string) {
    this.messageService.add('AuthService: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

