import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";
import { Avatar } from "../avatar/avatar.model";
import { GroupSpecialization } from "../group-specialization/group-specialization.model";
import { GroupSpecializationService } from "../group-specialization/group-specialization.service";
import { UserGroupSpecialization } from "./user-group-specialization.model";
import { Student } from "../students/student.model";
import { StudentParent } from "../students/student-parent.model";
import { StudentsModule } from "../students/students.module";
import { Schedule } from "../schedule/schedule.model";
import { ScheduleModule } from "../schedule/schedule.module";
import { ElectronicJournal } from "../electronic-journal/electronic-journal.model";


@Module({
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([
      User,
      Role,
      UserRoles,
      Avatar,
      GroupSpecialization,
      Student,
      StudentParent,
      Schedule,
      ElectronicJournal,
      UserGroupSpecialization]),
    RolesModule,
    ScheduleModule,
    StudentsModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    GroupSpecializationService,
    ],
  exports: [
    UsersService,
    ]
})
export class UsersModule {}
