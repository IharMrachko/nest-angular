import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { SchoolComponent } from './admin/add-school/school.component';
import { ListStudentsComponent } from './admin/list-students/list-students.component';
import { ListSchoolsComponent } from './admin/list-schools/list-schools.component';
import { TokenInterceptor } from "../shared/token.interceptor";
import { AddStudentComponent } from './admin/add-student/add-student.component';
import { AddTeacherComponent } from './admin/add-teacher/add-teacher.component';
import { SharedModule } from "../shared/shared.module";
import { AddStudentSuperAdminComponent } from './admin/add-student-super-admin/add-student-super-admin.component';
import { AddStudentAdminComponent } from './admin/add-student-admin/add-student-admin.component';
import { StudentPageComponent } from './admin/student-page/student-page.component';
import { ListStudentsSuperAdminComponent } from './admin/list-students-super-admin/list-students-super-admin.component';
import { ListTeachersComponent } from './admin/list-teachers/list-teachers.component';
import { AddScheduleComponent } from './admin/add-schedule/add-schedule.component';
import { TeacherPageComponent } from './admin/teacher-page/teacher-page.component';
import { TeacherPageEditComponent } from './admin/teacher-page-edit/teacher-page-edit.component';
import { AddCabinetsComponent } from './admin/add-cabinets/add-cabinets.component';
import { AddEventComponent } from './admin/add-event/add-event.component';
import { ListEventsComponent } from './admin/list-events/list-events.component';
import { StatisticsComponent } from './admin/statistics/statistics.component';
import { EditStudentComponent } from './admin/edit-student/edit-student.component';
import { ElectronicJournalComponent } from './admin/electronic-journal/electronic-journal.component';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from "@angular/common";
import { QuarterComponent } from './admin/electronic-journal/components/quarter/quarter.component';
import { QuarterFilterPipe } from './admin/electronic-journal/pipes/quarter-filter.pipe';
import { FinalGradeComponent } from './admin/electronic-journal/components/final-grade/final-grade.component';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { SetClassesInputDirective } from './admin/electronic-journal/directives/set-classes-input.directive';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BellTimesComponent } from './admin/bell-times/bell-times.component';
import { SocketIoModule } from "ngx-socket-io";
import { AngularSvgIconModule } from "angular-svg-icon";

registerLocaleData(localeRu);


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AdminLayoutComponent,
    SchoolComponent,
    ListStudentsComponent,
    ListSchoolsComponent,
    AddStudentComponent,
    AddTeacherComponent,
    AddStudentSuperAdminComponent,
    AddStudentAdminComponent,
    StudentPageComponent,
    ListStudentsSuperAdminComponent,
    ListTeachersComponent,
    AddScheduleComponent,
    TeacherPageComponent,
    TeacherPageEditComponent,
    AddCabinetsComponent,
    AddEventComponent,
    ListEventsComponent,
    StatisticsComponent,
    EditStudentComponent,
    ElectronicJournalComponent,
    QuarterComponent,
    QuarterFilterPipe,
    FinalGradeComponent,
    SetClassesInputDirective,
    BellTimesComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
