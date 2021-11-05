import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Student } from "./student.model";
import { StudentCreateDto } from "./dto/student-create.dto";
import { ParentsService } from "../parents/parents.service";
import { StudentParent } from "./student-parent.model";
import { Sequelize } from "sequelize-typescript";
import { Parent } from "../parents/parent.model";

@Injectable()
export class StudentsService {

  constructor(@InjectModel(Student) private studentRepo: typeof Student,
              @InjectModel(StudentParent) private studentParentRepo: typeof StudentParent,
              @InjectModel(Parent) private parentRepo: typeof Parent,
              private parentService: ParentsService,
              private sequelize: Sequelize,
             ) {
  }

  async createStudent(studentDto: StudentCreateDto): Promise<Student> {
    try {
      return await this.sequelize.transaction(async (t) => {
        const student = await this.studentRepo.create(studentDto, { transaction: t });
        for (const parentVal of studentDto.parents) {
          const parent = await this.parentRepo.create({ ...parentVal, studentId: student.id}, { transaction: t });
          await this.studentParentRepo.create({ studentId: student.id, parentId: parent.id }, { transaction: t })
        }
        return student;
      })
  } catch (e) {
      throw new Error(e);
    }

  }

  async updateStudentById(id: number, studentDto: StudentCreateDto) {
    try {
      return await this.sequelize.transaction(async (t) => {
        let studentId  = id;
        await this.studentParentRepo.destroy({where: {studentId}, transaction: t});
        await this.studentRepo.destroy({where: {id}, transaction: t});
        await this.parentRepo.destroy({where: {studentId}, transaction: t });
        const student = await this.studentRepo.create(studentDto, { transaction: t });
        for (const parentVal of studentDto.parents) {
          const parent = await this.parentRepo.create({ ...parentVal, studentId: student.id}, { transaction: t });
          await this.studentParentRepo.create({ studentId: student.id, parentId: parent.id }, { transaction: t })
        }
        return student;
      })
    } catch (e) {
      throw new Error(e);
    }

  }

  async getAllStudents(): Promise<Student[]> {
    return await this.studentRepo.findAll({include: {all: true}});
  }

  async getAllStudentsByTeacherId(teacherId): Promise<Student[]> {
    return await this.studentRepo.findAll({where: {teacherId}});
  }

  async getStudentById(id: string): Promise<Student> {
    return await this.studentRepo.findOne({where: {id}, include: {all: true}});
  }
}
