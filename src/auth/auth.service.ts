import { Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { UserDto } from "../users/dto/user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { User } from "../users/users.model";
import { AuthUserDto } from "../users/dto/auth-user.dto";


@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }
  async login(userDto: AuthUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);

  }

  async registration(userDto: UserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('Пользователь с таким email уже существует!', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({...userDto, password: hashPassword});
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const fullName = user.lastName + ' ' + user.firstName + ' ' + user.thridName;
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
      fullName, schoolId:
      user.schoolId,
      teacherId: user.id,
      individual_specializationId: user.individual_specializationId}
    return {
      token: this.jwtService.sign(payload)
    };
  }

  private async validateUser(userDto: AuthUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user) {
      const passwordEquals = await bcrypt.compare(userDto.password, user.password);
      if (user && passwordEquals) {
        return user;
      }
    }
    throw new HttpException({message: 'Некорректный email или пароль'}, HttpStatus.FORBIDDEN);
   }
}
