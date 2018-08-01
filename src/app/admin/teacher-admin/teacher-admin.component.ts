import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { TeacherEntity } from '../../models/TeacherEntity';
import { Observable } from 'rxjs';
import { TeacherService } from '../../services/teacher.service';


@Component({
  selector: 'app-teacher-admin',
  templateUrl: './teacher-admin.component.html',
  styleUrls: ['./teacher-admin.component.css']
})
export class TeacherAdminComponent implements OnInit {
  allteacherslist: TeacherEntity[];
  addingTeacher: boolean;
  model: any = {};

  constructor(private teacherService: TeacherService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.addingTeacher = false;
    this.getTeachers();
  }


  addTeacherEntity() {
    const newTeacher = new TeacherEntity();
    newTeacher.first_name = this.model.firstName;
    newTeacher.last_name = this.model.lastName;
    newTeacher.date_of_birth = this.model.dob;
    newTeacher.email = this.model.email;
    newTeacher.username = this.model.username;
    newTeacher.password = this.model.password;
    newTeacher.confirm_password = this.model.confirmPassword;
    this.teacherService
    .addTeacher(newTeacher)
    .subscribe(res => this.getTeachers());
  }

  getTeachers(): void {
    this.teacherService.getTeachers().subscribe(
      teachers1 => this.allteacherslist = teachers1
    );
  }

}
