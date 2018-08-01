import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { TeacherAdminComponent } from './admin/teacher-admin/teacher-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentAdminComponent } from './admin/student-admin/student-admin.component';
import { ParentAdminComponent } from './admin/parent-admin/parent-admin.component';
import { MessageService } from './services/message.service';
import { TeacherService } from './services/teacher.service';
import { MarkAdminComponent } from './admin/mark-admin/mark-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    TeacherAdminComponent,
    StudentAdminComponent,
    ParentAdminComponent,
    MarkAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [MessageService, TeacherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
