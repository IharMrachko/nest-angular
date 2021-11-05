import { forwardRef, Module } from "@nestjs/common";
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { AuthModule } from "../auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Student } from "../students/student.model";
import { Parent } from "./parent.model";
import { StudentParent } from "../students/student-parent.model";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Student, Parent, StudentParent]),
  ],
  providers: [ParentsService],
  controllers: [ParentsController]
})
export class ParentsModule {}
