import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { School } from "./school.model";
import { SchoolCreateDto } from "./dto/school-create.dto";
import { BranchService } from "../branch/branch.service";



@Injectable()
export class SchoolsService {
  constructor(@InjectModel(School) private schoolRepo: typeof School,
             private branchService: BranchService) {
  }

  async createSchool(schoolDto: SchoolCreateDto): Promise<School> {
   const school = await this.schoolRepo.create(schoolDto);
     if (!!schoolDto.branch.length) {
        schoolDto.branch.forEach((branch: any) => {
          this.branchService.createBranch({address: branch.address, schoolId: school.id});
        })
     }
     return school;
  }

  async getAllSchools(): Promise<School[]> {
    return await this.schoolRepo.findAll({include: {all: true}});
  }

  async getSchoolById(id: string): Promise<School> {
    return await this.schoolRepo.findOne({where: {id}, include: {all: true}})
  }
}
