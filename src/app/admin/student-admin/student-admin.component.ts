import { Component, OnInit } from '@angular/core';
import { StudentEntity } from '../../models/StudentEntity';
import { StudentService } from '../../services/student.service';
import { ParentService } from '../../services/parent.service';
import { ParentEntity } from '../../models/ParentEntity';

@Component({
  selector: 'app-student-admin',
  templateUrl: './student-admin.component.html',
  styleUrls: ['./student-admin.component.css']
})
export class StudentAdminComponent implements OnInit {
  allstudentslist: StudentEntity[];
  addingStudent: boolean;
  model: any = {};
  allParentlist: ParentEntity[];

  constructor(private studentService: StudentService, private parentService: ParentService) { }

  ngOnInit() {
    this.addingStudent = false;
    this.getStudents();
    this.getParents();
  }

  addStudentEntity() {
    const newStudent = new StudentEntity();
    newStudent.first_name = this.model.firstName;
    newStudent.last_name = this.model.lastName;
    newStudent.date_of_birth = this.model.dob;
    newStudent.username = this.model.username;
    newStudent.password = this.model.password;
    newStudent.confirm_password = this.model.confirmPassword;
    this.studentService
    .addStudent(newStudent)
    .subscribe(res => this.allstudentslist.push(newStudent));
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(
      students1 => this.allstudentslist = students1
    );
  }

    getParents(): void {
      this.parentService.getParents().subscribe(
        parentsRes => this.allParentlist = parentsRes
      );
    }
}


