import { Body, Controller, Post } from "@nestjs/common";
import { KindService } from "./kind.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Directory } from "../directory/directory.model";
import { KindCreateDto } from "./dto/kind-create.dto";

@Controller('kind')
export class KindController {
  constructor(private kindService: KindService) {
  }

  @ApiOperation({summary: 'Добавить значение справочника'})
  @ApiResponse({status: 200, type: Directory})
  @Post()
  createKind(@Body() kindDto: KindCreateDto) {
    return this.kindService.createKind(kindDto);
  }
}
