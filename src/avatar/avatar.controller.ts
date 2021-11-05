import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AvatarDto } from "./dto/avatar.dto";
import { AvatarService } from "./avatar.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "../utils/upload.utils";

@Controller('avatar')
export class AvatarController {

  constructor(private avatarService: AvatarService) {
  }

  @Get('photo/:userId')
  getAvatarByUserId(@Param() param) {
    return this.avatarService.getAvatarByUserId(param.userId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@Body() avatarDto: AvatarDto, @UploadedFile() file) {
    const fileName = '/avatar/' + file.filename;
    return this.avatarService.createAvatar(avatarDto, fileName);
  }

  @Get(':fileName')
  seeUploadedFile(@Param() image, @Res() res) {
    return res.sendFile(image.fileName, { root: './uploads' });
  }
}
