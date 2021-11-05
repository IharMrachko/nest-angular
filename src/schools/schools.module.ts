import { forwardRef, Module } from "@nestjs/common";
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { AuthModule } from "../auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { School } from "./school.model";
import { Student } from "../students/student.model";
import { BranchModule } from "../branch/branch.module";
import { Branch } from "../branch/branch.model";
import { ClassRoom } from "../class-room/class-room.model";
import { Events } from "../events/events.model";



@Module({
  imports: [
    BranchModule,
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([School, Student, Branch, ClassRoom, Events]),
  ],
  controllers: [SchoolsController],
  providers: [SchoolsService],
})
export class SchoolsModule {}
