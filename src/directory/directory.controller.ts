import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { DirectoryService } from "./directory.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DirectoryCreateDto } from "./dto/directory-create.dto";
import { Directory } from "./directory.model";

@ApiTags('Справочники')
@Controller('directory')
export class DirectoryController {
  constructor(private directoryService: DirectoryService) {
  }

  @ApiOperation({summary: 'Создание справочника'})
  @ApiResponse({status: 200, type: Directory})
  @Post()
  createDirectory(@Body() directoryDto: DirectoryCreateDto) {
    return this.directoryService.createDirectory(directoryDto);
  }

  @ApiOperation({summary: 'Получение всех справочников'})
  @ApiResponse({status: 200, type: [Directory]})
  @Get('')
  getAllDirectory() {
    return this.directoryService.getAllDirectory();
  }

  @ApiOperation({summary: 'Получение всех справочников по типу'})
  @ApiResponse({status: 200, type: [Directory]})
  @Get('/code')
  getDirectoryByCode(@Query() query) {
    return this.directoryService.getDirectoryByCode(query.code);
  }
}
