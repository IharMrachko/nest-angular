import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { Roles } from "../auth/role-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {
  }

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 200, type: User})
  @Post()
  createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({summary: 'Получение всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('SUPER_ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUser();
  }

  @ApiOperation({summary: 'Получение всех пользователей по ID школы'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('SUPER_ADMIN', 'ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @Get('/schoolId')
  getUserBySchoolId(@Query() query) {
    return this.userService.getAllUserBySchoolId(query.schoolId);
  }

  @ApiOperation({summary: 'Получение всех пользователей по ID школы'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('SUPER_ADMIN', 'ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @Get('/userId')
  getUserById(@Query() query) {
    return this.userService.getUserById(query.userId);
  }

  @ApiOperation({summary: 'Обновление данных пользователя'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('SUPER_ADMIN', 'ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @Put('update/:userId')
  updateUserById(@Param() param, @Body() userUpdate: UpdateUserDto) {
    return this.userService.updateUserById(param.userId, userUpdate);
  }

  @ApiOperation({summary: 'Выдать роль'})
  @ApiResponse({status: 200})
  @Roles('SUPER_ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  setRole(@Body() roleDto: AddRoleDto) {
    return this.userService.setRole(roleDto);
  }

  @ApiOperation({summary: 'Забанить пользователя'})
  @ApiResponse({status: 200})
  @Roles('SUPER_ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() banUserDto: BanUserDto) {
    return this.userService.banUser(banUserDto);
  }
}
