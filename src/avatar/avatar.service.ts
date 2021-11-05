import { Injectable } from '@nestjs/common';
import { AvatarDto } from "./dto/avatar.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Avatar } from "./avatar.model";
import { FilesService } from "../files/files.service";

@Injectable()
export class AvatarService {

  constructor(@InjectModel(Avatar) private avatarRepo: typeof Avatar,
              private fileService: FilesService
              ) {
  }

  async createAvatar(avatarDto: AvatarDto, fileName) {
    const userId = avatarDto.userId;
   await this.avatarRepo.destroy({where: {userId}})
   // const fileName = await this.fileService.createFile(image);
   return await this.avatarRepo.create({...avatarDto, image: fileName});
  }

  async getAvatarByUserId(userId: number) {
    return await this.avatarRepo.findOne({where: {userId}});
  }
}
