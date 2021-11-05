import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Kind } from "./kind.model";
import { KindCreateDto } from "./dto/kind-create.dto";

@Injectable()
export class KindService {
  constructor(@InjectModel(Kind) private kindRepo: typeof Kind) {
  }

  async createKind(kindDto: KindCreateDto): Promise<Kind>{
    return await this.kindRepo.create(kindDto);
  }
}
