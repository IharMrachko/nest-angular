import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { AvatarModule } from './avatar/avatar.module';
import { Avatar} from "./avatar/avatar.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { StudentsModule } from './students/students.module';
import { ParentsModule } from './parents/parents.module';
import { SchoolsModule } from './schools/schools.module';
import * as path from "path";
import { Student } from "./students/student.model";
import { Parent } from "./parents/parent.model";
import { StudentParent } from "./students/student-parent.model";
import { School } from "./schools/school.model";
import { DirectoryModule } from './directory/directory.module';
import { Directory } from "./directory/directory.model";
import { KindModule } from './kind/kind.module';
import { Kind } from "./kind/kind.model";
import { GroupSpecializationModule } from './group-specialization/group-specialization.module';
import { GroupSpecialization } from "./group-specialization/group-specialization.model";
import { UserGroupSpecialization } from "./users/user-group-specialization.model";
import { ScheduleModule } from './schedule/schedule.module';
import { Schedule } from "./schedule/schedule.model";
import { BranchModule } from './branch/branch.module';
import { Branch } from "./branch/branch.model";
import { ClassRoomModule } from './class-room/class-room.module';
import { ClassRoom } from "./class-room/class-room.model";
import { EventsModule } from './events/events.module';
import { Events } from "./events/events.model";
import { MulterModule } from "@nestjs/platform-express";
import { ElectronicJournalModule } from './electronic-journal/electronic-journal.module';
import { ElectronicJournal } from "./electronic-journal/electronic-journal.model";
import { UploadModule } from './upload/upload.module';
import { Upload } from "./upload/upload.model";


@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mama2223',
      database: 'nest-course',
      models: [
        User,
        Role,
        UserRoles,
        Avatar,
        Student,
        Parent,
        StudentParent,
        School,
        Directory,
        Kind,
        Branch,
        Schedule,
        ClassRoom,
        GroupSpecialization,
        Events,
        ElectronicJournal,
        UserGroupSpecialization,
        Upload
      ],
      autoLoadModels: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    AvatarModule,
    FilesModule,
    StudentsModule,
    ParentsModule,
    SchoolsModule,
    DirectoryModule,
    KindModule,
    GroupSpecializationModule,
    ScheduleModule,
    BranchModule,
    ClassRoomModule,
    EventsModule,
    ElectronicJournalModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
