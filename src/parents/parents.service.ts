import { Injectable } from '@nestjs/common';
import { ParentCreateDto } from "./dto/parent-create.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Parent } from "./parent.model";

@Injectable()
export class ParentsService {
  constructor(@InjectModel(Parent) private parentRepo: typeof Parent) {
  }

  async create(parentDto: ParentCreateDto): Promise<Parent> {
     return await this.parentRepo.create(parentDto);
  }

}
