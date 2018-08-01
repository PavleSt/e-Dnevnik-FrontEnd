import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AdminComponent } from '../admin/admin.component';
import { TeacherAdminComponent } from '../admin/teacher-admin/teacher-admin.component';
import { StudentAdminComponent } from '../admin/student-admin/student-admin.component';
import { ParentAdminComponent } from '../admin/parent-admin/parent-admin.component';
import { MarkAdminComponent } from '../admin/mark-admin/mark-admin.component';

const routes: Routes = [
 { path: 'login', component: LoginComponent },
 { path: 'admin', component: AdminComponent, children: [
   {path: 'admin-teacher', component: TeacherAdminComponent},
   {path: 'admin-student', component: StudentAdminComponent},
   {path: 'admin-parent', component: ParentAdminComponent},
   {path: 'admin-mark', component: MarkAdminComponent}
 ] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
