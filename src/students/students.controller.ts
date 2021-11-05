import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StudentsService } from "./students.service";
import { Student } from "./student.model";
import { StudentCreateDto } from "./dto/student-create.dto";


@ApiTags('Студенты')
@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) { }

  @ApiOperation({summary: 'Создание студента'})
  @ApiResponse({status: 200, type: Student})
  @Post()
  createStudent(@Body() studentDto: StudentCreateDto) {
    return this.studentService.createStudent(studentDto);
  }

  @ApiOperation({summary: 'Получение всех студентов'})
  @ApiResponse({status: 200, type: [Student]})
  @Get()
  getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @ApiOperation({summary: 'Получит ученика по ID'})
  @ApiResponse({status: 200, type: [Student]})
  @Get('/:id')
  getStudentById(@Param() param) {
    return this.studentService.getStudentById(param.id);
  }

  @ApiOperation({summary: 'Обновить ученика по ID'})
  @ApiResponse({status: 200, type: [Student]})
  @Patch('/:id')
  updateStudentById(@Param() param, @Body() body: StudentCreateDto) {
    return this.studentService.updateStudentById(param.id, body);
  }
}
