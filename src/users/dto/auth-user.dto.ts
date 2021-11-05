import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class AuthUserDto {
  @ApiProperty({example: 'email@email.com', description: 'Email'})
  @IsString()
  @IsEmail({}, {message: 'Некорректный email'})
  readonly email: string;

  @ApiProperty({example: '123456', description: 'Пароль'})
  @IsString({message: 'Должен быть строкой'})
  @Length(4, 10, {message: 'Не менее 4 и не более 10 символов'})
  readonly password: string

}
