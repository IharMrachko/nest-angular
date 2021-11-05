import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegistrationComponent } from "./auth/registration/registration.component";
import { ListStudentsComponent } from "./admin/list-students/list-students.component";
import { SchoolComponent } from "./admin/add-school/school.component";
import { AdminLayoutComponent } from "./admin/admin-layout/admin-layout.component";
import { AuthGuard } from "../shared/auth.guard";
import { Roles } from "../shared/roles.enum";
import { ListSchoolsComponent } from "./admin/list-schools/list-schools.component";
import { AddStudentComponent } from "./admin/add-student/add-student.component";
import { AddTeacherComponent } from "./admin/add-teacher/add-teacher.component";
import { AddStudentAdminComponent } from "./admin/add-student-admin/add-student-admin.component";
import { AddStudentSuperAdminComponent } from "./admin/add-student-super-admin/add-student-super-admin.component";
import { StudentPageComponent } from "./admin/student-page/student-page.component";
import { ListStudentsSuperAdminComponent } from "./admin/list-students-super-admin/list-students-super-admin.component";
import { ListTeachersComponent } from "./admin/list-teachers/list-teachers.component";
import { AddScheduleComponent } from "./admin/add-schedule/add-schedule.component";
import { TeacherPageComponent } from "./admin/teacher-page/teacher-page.component";
import { TeacherPageEditComponent } from "./admin/teacher-page-edit/teacher-page-edit.component";
import { AddCabinetsComponent } from "./admin/add-cabinets/add-cabinets.component";
import { AddEventComponent } from "./admin/add-event/add-event.component";
import { ListEventsComponent } from "./admin/list-events/list-events.component";
import { StatisticsComponent } from "./admin/statistics/statistics.component";
import { EditStudentComponent } from "./admin/edit-student/edit-student.component";
import { ElectronicJournalComponent } from "./admin/electronic-journal/electronic-journal.component";
import { BellTimesComponent } from "./admin/bell-times/bell-times.component";
import { ChatComponent } from "../shared/chat/chat.component";


const routes: Routes = [
  // redirectTo: '', pathMatch: 'full'
  {path: '', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: {roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.USER]},
    children: [
      {path: 'list-students', component: ListStudentsComponent},
      {path: 'list-students-sa',
        component: ListStudentsSuperAdminComponent,
        canActivate: [AuthGuard],
        data: {roles: [Roles.SUPER_ADMIN]},
      },
      {path: 'list-teachers',
        component: ListTeachersComponent,
        canActivate: [AuthGuard],
        data: {roles: [Roles.USER, Roles.ADMIN]},
      },
      {path: 'list-schools',
        component: ListSchoolsComponent,
        canActivate: [AuthGuard],
        data: {roles: [Roles.SUPER_ADMIN]},
      },
      {path: 'list-events',
        component: ListEventsComponent,
        canActivate: [AuthGuard],
        data: {roles: [Roles.ADMIN, Roles.USER]},
      },
      {path: 'add-add-school',
        component: SchoolComponent,
        canActivate: [AuthGuard],
        data: {roles: [Roles.SUPER_ADMIN]},
      },
      {path: 'add-student',
        component: AddStudentComponent,
        canActivate: [AuthGuard],
        data: {roles: [Roles.USER]},
      },
      {path: 'add-schedule',
        component: AddScheduleComponent,
        canActivate: [AuthGuard],
        data: {roles: [Roles.USER]},
      },
      {path: 'add-student-admin',
        component: AddStudentAdminComponent,
        canActivate: [AuthGuard],
        data: {roles: [Roles.ADMIN]},
      },
      {path: 'add-student-super-admin',
        component: AddStudentSuperAdminComponent,
        canActivate: [AuthGuard],
        data: {roles: [Roles.SUPER_ADMIN]},
      },
      {path: 'add-teacher',
        component: AddTeacherComponent,
        canActivate: [AuthGuard],
        data: {roles: [Roles.SUPER_ADMIN, Roles.ADMIN]},
      },
      {path: 'bell-times',
        component:  BellTimesComponent,
        canActivate: [AuthGuard],
        data: {roles: [Roles.SUPER_ADMIN, Roles.ADMIN]},
      },
      {path: 'add-cabinets',
        component: AddCabinetsComponent,
        canActivate: [AuthGuard],
        data: {roles: [Roles.SUPER_ADMIN, Roles.ADMIN]},
      },
      {path: 'add-event',
        component: AddEventComponent,
        canActivate: [AuthGuard],
        data: {roles: [Roles.SUPER_ADMIN, Roles.ADMIN]},
      },
      {path: 'student/:id',
        canActivate: [AuthGuard],
        component: StudentPageComponent,
        data: {roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.USER]},
      },
      {path: 'teacher/:id',
        canActivate: [AuthGuard],
        component: TeacherPageComponent,
        data: {roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.USER]},
      },
      {path: 'edit-teacher/:id',
        canActivate: [AuthGuard],
        component: TeacherPageEditComponent,
        data: {roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.USER]},
      },
      {path: 'edit-student/:id',
        canActivate: [AuthGuard],
        component: EditStudentComponent,
        data: {roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.USER]},
      },
      {path: 'electronic-journal',
        canActivate: [AuthGuard],
        component: ElectronicJournalComponent,
        data: {roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.USER]},
      },
      {path: 'statistics',
        canActivate: [AuthGuard],
        component: StatisticsComponent,
        data: {roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.USER]},
      },
      {path: 'chat',
        canActivate: [AuthGuard],
        component: ChatComponent,
        data: {roles: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.USER]},
      },
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
