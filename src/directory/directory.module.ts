import { forwardRef, Module } from "@nestjs/common";
import { DirectoryService } from './directory.service';
import { DirectoryController } from './directory.controller';
import { AuthModule } from "../auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Directory } from "./directory.model";
import { Kind } from "../kind/kind.model";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Directory, Kind]),
  ],
  providers: [DirectoryService],
  controllers: [DirectoryController]
})
export class DirectoryModule {}
