import { forwardRef, Module } from "@nestjs/common";
import { KindController } from './kind.controller';
import { KindService } from './kind.service';
import { AuthModule } from "../auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Directory } from "../directory/directory.model";
import { Kind } from "./kind.model";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Directory, Kind]),
  ],
  controllers: [KindController],
  providers: [KindService]
})
export class KindModule {}
