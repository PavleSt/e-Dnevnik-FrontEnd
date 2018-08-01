import { Component, OnInit } from '@angular/core';
import { MarkService } from '../../services/mark.service';
import { MarkEntity } from '../../models/MarkEntity';
import { StudentEntity } from '../../models/StudentEntity';
import { StudentService } from '../../services/student.service';
import { LectureEntity } from '../../models/LectureEntity';
import { LectureService } from '../../services/lecture.service';
import { SubjectService } from '../../services/subject.service';
import { SubjectEntity } from '../../models/SubjectEntity';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mark-admin',
  templateUrl: './mark-admin.component.html',
  styleUrls: ['./mark-admin.component.css']
})
export class MarkAdminComponent implements OnInit {
  allmarkslist: MarkEntity[];
  addingMark: boolean;
  model: any = {};
  examinationTypes: any[];
  allstudentlist: StudentEntity[];
  alllecturelist: LectureEntity[];
  allsubjectList: SubjectEntity[];
  constructor(
    private markService: MarkService,
    private studentService: StudentService,
    private lectureService: LectureService,
    private subjectService: SubjectService,
    private authService: AuthService) { }

  ngOnInit() {
    this.addingMark = false;
    this.getMarks();
    this.SetExaminationTypes();
    this.getStudents();
    this.getLectures();
    this.getSubjects();
  }

  addMarkEntity() {
    const newMark = new MarkEntity();
    newMark.mark = this.model.mark;
    newMark.examination = this.model.examination;
    newMark.studentId = this.model.studentId;
    newMark.lectureId = this.model.lectureId;
    newMark.teacher_username = this.model.teacher_username;
    this.markService
    .addMark(newMark)
    .subscribe(res => this.getMarks());
  }

  getMarks(): void {
    if (this.authService.role === 'ROLE_TEACHER' )  {
      this.markService.getTeacherMarks().subscribe(
        marks1 => this.allmarkslist = marks1);

    } else  {
    this.markService.getMarks().subscribe(
      marks1 => this.allmarkslist = marks1
    );
    /*dodati ifove za ostale role,
    npr Student treba da dobije marks preko motode koja kraca samo ocene za ulogovanog studenta
    this.markService.getStudentMarks().subscribe(*/
  }
  }

  SetExaminationTypes(): void {
    this.examinationTypes = [
      {
      id: 0,
      display: 'TEST'
    },
    {
      id: 1,
      display: 'WRITTEN_EXAM'
    },
    {
      id: 2,
      display: 'ORAl_EXEM'
    },
    {
      id: 3,
      display: 'MIDTERM_MARK'
    },
    {
      id: 4,
      display: 'FINAL_MARK'
    },
  ];
  }
  getStudents(): void {
    this.studentService.getStudentsByTeacher().subscribe(
      students1 => this.allstudentlist = students1
    );
  }

  getSubject(subject: SubjectEntity): string {
    return subject.subject_name;
  }

  getLectures(): any {
    this.lectureService.getLecturesByTeacher().subscribe(
      result => this.alllecturelist = result
    );
  }

  getSubjects(): any {
    this.subjectService.getAllSubjects().subscribe(
      result => this.allsubjectList = result
    );
  }
}

