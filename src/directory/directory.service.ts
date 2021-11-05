import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Directory } from "./directory.model";
import { DirectoryCreateDto } from "./dto/directory-create.dto";

@Injectable()
export class DirectoryService {
  constructor(@InjectModel(Directory) private directoryRepo: typeof Directory) {
  }

  async createDirectory(directoryDto: DirectoryCreateDto): Promise<Directory> {
    return await this.directoryRepo.create(directoryDto)
  }

  async getAllDirectory(): Promise<Directory[]> {
    return await this.directoryRepo.findAll({include: {all: true}});
  }

  async getDirectoryByCode(code: string): Promise<Directory> {
    return await this.directoryRepo.findOne({where: {code}, include: {all: true}});
  }
}
