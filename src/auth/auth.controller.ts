import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UserDto } from "../users/dto/user.dto";
import { AuthUserDto } from "../users/dto/auth-user.dto";
import { Roles } from "./role-auth.decorator";
import { RolesGuard } from "./roles.guard";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('/login')
  login(@Body() userDto: AuthUserDto) {
   return this.authService.login(userDto);
  }

  @Post('/registration')
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(RolesGuard)
  registration(@Body() userDto: UserDto) {
    return this.authService.registration(userDto);
  }
}
