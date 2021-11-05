import { forwardRef, Module } from "@nestjs/common";
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { AuthModule } from "../auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Student } from "./student.model";
import { Parent } from "../parents/parent.model";
import { StudentParent } from "./student-parent.model";
import { ParentsService } from "../parents/parents.service";
import { SchoolsService } from "../schools/schools.service";
import { School } from "../schools/school.model";
import { BranchModule } from "../branch/branch.module";

@Module({
 imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Student, Parent, StudentParent, School]),
    BranchModule
  ],
  providers: [StudentsService, ParentsService, SchoolsService],
  controllers: [StudentsController],
  exports: [StudentsService]
})
export class StudentsModule {}
