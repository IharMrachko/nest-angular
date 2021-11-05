import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { SchoolsService } from "./schools.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SchoolCreateDto } from "./dto/school-create.dto";
import { School } from "./school.model";
import { Roles } from "../auth/role-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";

@ApiTags('Школы')
@Controller('schools')
export class SchoolsController {

  constructor(private schoolService: SchoolsService) { }

  @ApiOperation({summary: 'Создание школы'})
  @ApiResponse({status: 200, type: School})
  @Roles('SUPER_ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  createSchool(@Body() schoolDto: SchoolCreateDto) {
    return this.schoolService.createSchool(schoolDto);
  }

  @ApiOperation({summary: 'Получить все школы'})
  @Roles('SUPER_ADMIN')
  @UseGuards(RolesGuard)
  @ApiResponse({status: 200, type: School})
  @Get()
  getAllSchools() {
    return this.schoolService.getAllSchools();
  }

  @ApiOperation({summary: 'Получить школу по ID'})
  @ApiResponse({status: 200, type: School})
  @Get('/:id')
  getSchoolById(@Param() param) {
    return this.schoolService.getSchoolById(param.id);
  }
}
