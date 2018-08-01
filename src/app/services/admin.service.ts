import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private teacherUrl = 'http://localhost:8090/api/v1/final-project/teachers/';

  constructor(private http: HttpClient) {}

  }

