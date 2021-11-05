import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {
  }

  @Post()
  createRole(@Body() roleDto: CreateRoleDto) {
    return this.roleService.createRole(roleDto);
  }

  @Get('/:role')
  getRoleByValue(@Param('role') roleValue: string) {
    return this.roleService.getRoleByValue(roleValue);
  }

  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }
}
