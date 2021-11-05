import { Module } from "@nestjs/common";
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Avatar } from "./avatar.model";
import { FilesModule } from "../files/files.module";


@Module({
  imports: [
    SequelizeModule.forFeature([User, Avatar]),
    FilesModule
  ],
  providers: [AvatarService],
  controllers: [AvatarController]
})
export class AvatarModule {}
